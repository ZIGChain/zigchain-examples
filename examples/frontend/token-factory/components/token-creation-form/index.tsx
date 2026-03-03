"use client";

import { env } from "@/lib/env";
import { useTx } from "@/lib/hooks/useTx";
import {
  MsgCreateDenom,
  MsgMintAndSendTokens,
  MsgSetDenomMetadata,
} from "@/ts-client/zigchain.factory/module";
import { coins } from "@cosmjs/amino";
import { useChain } from "@cosmos-kit/react";
import {
  Avatar,
  Button,
  Chip,
  Input,
  Switch,
  Textarea,
} from "@nextui-org/react";
import crypto from "crypto";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import Long from "long";
import { Buffer } from "buffer";

interface TokenCreationFormProps {
  onSuccess?: () => void;
}

export default function TokenCreationForm({
  onSuccess,
}: TokenCreationFormProps) {
  const { address } = useChain("zigchain");
  const { tx } = useTx();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ticker, setTicker] = useState("");
  const [precision, setPrecision] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [fixedSupply, setFixedSupply] = useState(true);
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFileToIPFS = async (): Promise<string> => {
    if (!file) {
      throw new Error("File not selected.");
    }
    const data = new FormData();
    data.append("file", file);
    const response = await fetch("/api/files", {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    if (result.IpfsHash) {
      // Ensure the gateway URL has https:// protocol for proper URI validation
      const gatewayUrl = env.pinataPublicGateway.startsWith("http")
        ? env.pinataPublicGateway
        : `https://${env.pinataPublicGateway}`;
      return `${gatewayUrl}/ipfs/${result.IpfsHash}`;
    } else {
      throw new Error("Failed to upload to IPFS.");
    }
  };

  const uploadMetadataToIPFS = async (metadata: string): Promise<string> => {
    const response = await fetch("/api/metadata", {
      method: "POST",
      body: metadata,
    });
    const result = await response.json();
    if (result.IpfsHash) {
      // Ensure the gateway URL has https:// protocol for proper URI validation
      const gatewayUrl = env.pinataPublicGateway.startsWith("http")
        ? env.pinataPublicGateway
        : `https://${env.pinataPublicGateway}`;
      return `${gatewayUrl}/ipfs/${result.IpfsHash}`;
    } else {
      throw new Error("Failed to upload to IPFS.");
    }
  };

  const createToken = async () => {
    if (!address) {
      toast.error(
        "You must connect your wallet to be able to create a new token.",
      );
      return;
    }

    if (
      !name ||
      !description ||
      !ticker ||
      precision < 0 ||
      maxSupply <= 0 ||
      !file
    ) {
      toast.error(
        "Please fill in all required fields: subdenom, description, ticker, max supply, and select an image.",
      );
      return;
    }

    // Validate numeric values
    if (isNaN(maxSupply) || isNaN(precision)) {
      toast.error(
        "Please enter valid numeric values for precision and max supply.",
      );
      return;
    }

    // Validate social media usernames (no @ symbols)
    if (twitter && twitter.includes("@")) {
      toast.error(
        "Twitter username should not include @ symbol. Just enter the username.",
      );
      return;
    }

    if (telegram && telegram.includes("@")) {
      toast.error(
        "Telegram username should not include @ symbol. Just enter the username.",
      );
      return;
    }

    // Validate maxSupply is a positive integer (MintingCap in documentation)
    if (maxSupply <= 0 || !Number.isInteger(maxSupply)) {
      toast.error("Max supply must be a positive integer.");
      return;
    }

    setLoading(true);

    try {
      const iconUrl = await uploadFileToIPFS();

      // Helper function to ensure URL has proper protocol
      const ensureUrlProtocol = (url: string): string => {
        if (!url || url.trim() === "") return "";
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return url;
        }
        return `https://${url}`;
      };

      // Helper function to construct social media URLs from usernames
      const constructSocialUrl = (
        platform: string,
        username: string,
      ): string => {
        if (!username || username.trim() === "") return "";
        // Remove @ symbol if user added it
        const cleanUsername = username.replace(/^@/, "").trim();
        if (!cleanUsername) return "";

        switch (platform.toLowerCase()) {
          case "twitter":
            return `https://twitter.com/${cleanUsername}`;
          case "telegram":
            return `https://t.me/${cleanUsername}`;
          default:
            return "";
        }
      };

      // Create extra data with all social links and icon
      const extraData = {
        name: name,
        description: description,
        icon: iconUrl,
        twitter: constructSocialUrl("twitter", twitter),
        telegram: constructSocialUrl("telegram", telegram),
        website: url ? ensureUrlProtocol(url) : "",
      };

      // Upload extra data to IPFS first
      const extraDataJson = JSON.stringify(extraData);
      const extraDataHash = crypto
        .createHash("sha256")
        .update(extraDataJson)
        .digest("hex");
      const extraDataUri = await uploadMetadataToIPFS(extraDataJson);

      // Create full metadata structure with all required fields
      const fullMetadata = {
        description: description, // Include description in metadata
        denom_units: [
          {
            denom: `coin.${address}.${name}`,
            exponent: 0,
            aliases: [],
          },
        ],
        base: `coin.${address}.${name}`,
        display: `coin.${address}.${name}`,
        name: name, // Use the subdenom as the display name
        symbol: ticker,
        uri: extraDataUri, // Use the extra data URI
        uri_hash: extraDataHash, // Use the extra data hash
        // Include the extraData structure directly in fullMetadata for compatibility
        icon: iconUrl,
        websiteUrl: url ? ensureUrlProtocol(url) : "",
        twitter: constructSocialUrl("twitter", twitter),
        telegram: constructSocialUrl("telegram", telegram),
        fullExtraData: {
          name: name,
          description: description,
          icon: iconUrl,
          twitter: constructSocialUrl("twitter", twitter),
          telegram: constructSocialUrl("telegram", telegram),
          website: url ? ensureUrlProtocol(url) : "",
        },
      };

      // Upload the complete metadata structure for backup/reference
      const metadataJson = JSON.stringify(fullMetadata);
      const hash = crypto
        .createHash("sha256")
        .update(metadataJson)
        .digest("hex");
      const metadataUri = await uploadMetadataToIPFS(metadataJson);

      // Validate subdenom according to ZIGChain documentation
      // Must be 3-44 characters, lowercase letters, numbers, and hyphens only, start with lowercase letter
      const subDenomRegex = /^[a-z][a-z0-9-]{2,43}$/;
      if (!subDenomRegex.test(name)) {
        toast.error(
          "Subdenom must be 3-44 characters, start with lowercase letter, and contain only lowercase letters, numbers, and hyphens.",
        );
        return;
      }

      // Check total length constraint (128 bytes for full token name: coin.{creator}.{subdenom})
      const fullTokenName = `coin.${address}.${name}`;
      if (fullTokenName.length > 128) {
        toast.error(
          `Token name too long. Full name "${fullTokenName}" exceeds 128 characters. Please use a shorter subdenom.`,
        );
        return;
      }

      // Create message object matching ZIGChain documentation parameters
      const createDenomData = {
        creator: address,
        subDenom: name, // This will become the subdenom
        maxSupply: maxSupply.toString(), // Convert to string as per documentation
        canChangeMaxSupply: !fixedSupply,
        URI: metadataUri,
        URIHash: hash,
      };

      // Try using EncodeObject directly to bypass the generated message
      const createDenomMsg = {
        typeUrl: "/zigchain.factory.MsgCreateDenom",
        value: {
          creator: address,
          subDenom: name,
          maxSupply: maxSupply.toString(), // Ensure it's a string
          canChangeMaxSupply: !fixedSupply,
          URI: metadataUri,
          URIHash: hash,
        },
      };

      const setMetadataMsg = {
        typeUrl: "/zigchain.factory.MsgSetDenomMetadata",
        value: MsgSetDenomMetadata.create({
          signer: address,
          metadata: {
            denomUnits: [{ denom: `coin.${address}.${name}`, exponent: 0 }],
            base: `coin.${address}.${name}`,
            name: name, // Use the subdenom as the display name
            symbol: ticker,
            display: `coin.${address}.${name}`,
            description: description, // Include description in the metadata
            uri: metadataUri, // Use the metadata URI (which points to fullMetadata)
            uriHash: hash, // Use the metadata hash
          },
        }),
      };

      const mintAndSendMsg = {
        typeUrl: "/zigchain.factory.MsgMintAndSendTokens",
        value: MsgMintAndSendTokens.create({
          signer: address,
          recipient: address,
          token: {
            denom: `coin.${address}.${name}`,
            amount: maxSupply.toString(),
          },
        }),
      };

      // Execute all three messages in sequence: create, set metadata, and mint
      await tx([createDenomMsg, setMetadataMsg, mintAndSendMsg], {
        fee: {
          amount: coins(200, "uzig"), // Increased fee for multiple messages
          gas: "500000", // Increased gas for multiple messages
        },
        onSuccess: async () => {
          toast.success("Token created successfully with full metadata!");

          // Log the token creation event
          try {
            const logData = {
              logType: "token-creation",
              timestamp: new Date().toISOString(),
              tokenData: {
                denom: `coin.${address}.${name}`,
                creator: address,
                subDenom: name,
                metadata: fullMetadata,
                extraData: extraData,
                maxSupply: maxSupply.toString(),
                canChangeMaxSupply: !fixedSupply,
                precision: precision,
                ticker: ticker,
                description: description,
                websiteUrl: url ? ensureUrlProtocol(url) : "",
                twitter: constructSocialUrl("twitter", twitter),
                telegram: constructSocialUrl("telegram", telegram),
                iconUrl: iconUrl,
              },
            };

            await fetch("/api/log-coins", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(logData),
            });
          } catch (logError) {
            console.error("Failed to log token creation:", logError);
          }

          resetForm();
          onSuccess?.();
        },
      });
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Token creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setTicker("");
    setPrecision(0);
    setMaxSupply(0);
    setFixedSupply(true);
    setTwitter("");
    setTelegram("");
    setUrl("");
    setFile(null);
    setPreviewUrl("");
  };

  if (!address) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <Chip color="danger">Please connect your wallet.</Chip>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div
        className="w-24 h-24 rounded-full flex justify-center items-center overflow-hidden"
        onClick={handleClick}
      >
        <Avatar
          src={previewUrl}
          alt="Token icon preview"
          className="w-full h-full object-cover bg-gray-500 cursor-pointer"
          showFallback
          imgProps={{ className: "bg-cover" }}
          fallback={
            <div className="flex flex-col justify-center items-center gap-3">
              <p className="text-center text-white font-light text-sm">
                Upload icon
              </p>
            </div>
          }
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>
      <Input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        label="Subdenom"
        placeholder="Enter subdenom (3-44 chars, lowercase, numbers, hyphens)"
        description="Must start with lowercase letter, 3-44 characters, lowercase letters, numbers, and hyphens only"
      />
      <Textarea
        label="Description"
        placeholder="Enter token description"
        className="w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        type="text"
        label="Ticker"
        placeholder="Enter token ticker"
      />
      <Input
        value={precision.toString()}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setPrecision(isNaN(value) ? 0 : value);
        }}
        type="number"
        label="Precision"
        placeholder="Enter token precision"
      />
      <Input
        value={maxSupply.toString()}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setMaxSupply(isNaN(value) ? 0 : value);
        }}
        type="number"
        label="Max Supply"
        placeholder="Enter max supply"
      />
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="text"
        label="Website URL (Optional)"
        placeholder="example.com or https://example.com"
        description="Optional: Your token's official website. Examples: 'example.com' or 'https://example.com'"
      />
      <Input
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
        type="text"
        label="Twitter Username (Optional)"
        placeholder="username (without @)"
        description="Optional: Your token's Twitter username (without @ symbol)"
        color={twitter.includes("@") ? "danger" : "default"}
        errorMessage={twitter.includes("@") ? "Remove the @ symbol" : ""}
      />
      <Input
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
        type="text"
        label="Telegram Username (Optional)"
        placeholder="username (without @)"
        description="Optional: Your token's Telegram username (without @ symbol)"
        color={telegram.includes("@") ? "danger" : "default"}
        errorMessage={telegram.includes("@") ? "Remove the @ symbol" : ""}
      />
      <Switch
        checked={fixedSupply}
        onChange={(e) => setFixedSupply(e.target.checked)}
        color="primary"
        size="lg"
        className="self-start"
      >
        Fixed Supply
      </Switch>
      <Button
        isLoading={loading}
        onPress={createToken}
        disabled={loading}
        variant="solid"
        size="lg"
        radius="sm"
      >
        <span className="text-bold uppercase">
          {loading ? "Processing..." : "Create New Token"}
        </span>
      </Button>
    </div>
  );
}
