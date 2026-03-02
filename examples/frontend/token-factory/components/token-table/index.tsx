"use client";

import { useTokenTableData } from "@/lib/hooks/useTokenTableData";
import { Denom } from "@/ts-client/zigchain.factory/module";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Selection,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { ChevronDown, Copy, Plus, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import TokenCreationForm from "../token-creation-form";
import { useNetworkContext } from "@/context/NetworkContext";
import { useChain } from "@cosmos-kit/react";

const columns = [
  { name: "Token", uid: "icon" },
  { name: "Ticker", uid: "ticker", sortable: true },
  { name: "Supply", uid: "supply", sortable: true },
  { name: "Website", uid: "url" },
  { name: "Socials", uid: "socials" },
];

const INITIAL_VISIBLE_COLUMNS = ["icon", "ticker", "supply", "url", "socials"];

export default function TokenTable() {
  const { address } = useChain("zigchain");
  const { currentNetwork } = useNetworkContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isDescriptionOpen,
    onOpen: onDescriptionOpen,
    onOpenChange: onDescriptionOpenChange,
  } = useDisclosure();
  const [filterValue, setFilterValue] = useState<string>("");
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    () => new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(100);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "ticker",
    direction: "ascending",
  });
  const [page, setPage] = useState<number>(1);
  const [selectedTokenDescription, setSelectedTokenDescription] =
    useState<string>("");
  const [selectedTokenDetails, setSelectedTokenDetails] = useState<any>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showMyTokensOnly, setShowMyTokensOnly] = useState<boolean>(false);

  const { tokensWithMetadata, isLoading, mutateTokens, mutateMetadata } =
    useTokenTableData(`${page}`, `1000`);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column: any) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredTokens = isLoading ? [] : [...(tokensWithMetadata ?? [])];

    if (hasSearchFilter) {
      filteredTokens = filteredTokens.filter((token) => {
        const metadata = (token as any).metadata;
        const extraData = (token as any).extraData;
        const searchLower = filterValue.toLowerCase();

        return (
          token?.denom?.toLowerCase().includes(searchLower) ||
          metadata?.name?.toLowerCase().includes(searchLower) ||
          metadata?.symbol?.toLowerCase().includes(searchLower) ||
          metadata?.description?.toLowerCase().includes(searchLower) ||
          (token as any).creator?.toLowerCase().includes(searchLower)
        );
      });
    }

    if (showMyTokensOnly && address) {
      const addressLower = address.toLowerCase();
      filteredTokens = filteredTokens.filter(
        (token: any) => token?.creator?.toLowerCase() === addressLower
      );
    }

    return filteredTokens;
  }, [
    isLoading,
    tokensWithMetadata,
    hasSearchFilter,
    filterValue,
    showMyTokensOnly,
    address,
  ]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      let first: any;
      let second: any;

      // Handle special cases for sorting
      if (sortDescriptor.column === "ticker") {
        first = (a as any).metadata?.symbol || "";
        second = (b as any).metadata?.symbol || "";
      } else {
        first = a[sortDescriptor.column as keyof Denom];
        second = b[sortDescriptor.column as keyof Denom];
      }

      // Handle string comparison
      if (typeof first === "string" && typeof second === "string") {
        const cmp =
          first.toLowerCase() < second.toLowerCase()
            ? -1
            : first.toLowerCase() > second.toLowerCase()
            ? 1
            : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }

      // Handle number comparison
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = (token: Denom, columnKey: React.Key) => {
    const cellValue = token[columnKey as keyof Denom];
    const metadata = (token as any).metadata;
    const extraData = (token as any).extraData;

    switch (columnKey) {
      case "icon":
        const tokenName = metadata?.name || token.denom;
        const tokenSymbol = metadata?.symbol || "UNKNOWN";
        return (
          <div className="flex items-center gap-3 min-w-0">
            <User
              avatarProps={{
                src: extraData?.icon
                  ? extraData.icon.startsWith("http")
                    ? extraData.icon
                    : `https://${extraData.icon}`
                  : undefined,
                isBordered: true,
                color: "primary",
                imgProps: {
                  className: "bg-cover",
                },
                size: "sm",
              }}
              name=""
              description=""
              classNames={{
                name: "hidden",
                description: "hidden",
              }}
            />
            <div className="flex-1 min-w-0">
              <button
                onClick={() => handleTokenNameClick(token)}
                className="text-left hover:underline cursor-pointer text-primary hover:text-primary/80 text-sm font-medium truncate block w-full"
                title={tokenName}
              >
                {tokenName}
              </button>
              <p className="text-xs text-muted-foreground truncate">
                {tokenSymbol}
              </p>
            </div>
          </div>
        );

      case "ticker":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{metadata.symbol}</p>
          </div>
        );
      case "supply":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {token.supply}/{token.maxSupply}
            </p>
          </div>
        );
      case "url":
        const websiteUrl = extraData?.websiteUrl;
        const hasValidWebsite = websiteUrl && isValidUrl(websiteUrl);
        return hasValidWebsite ? (
          <div className="min-w-0 max-w-full">
            <Link
              isExternal
              href={websiteUrl}
              showAnchorIcon
              className="truncate block max-w-full"
            >
              <span className="truncate block">
                {metadata?.name || metadata?.symbol || "Token"} Website
              </span>
            </Link>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">No website</span>
        );
      case "socials":
        const hasTwitter = isValidUrl(extraData?.twitter);
        const hasTelegram = isValidUrl(extraData?.telegram);

        if (!hasTwitter && !hasTelegram) {
          return (
            <span className="text-muted-foreground text-sm">
              No social links
            </span>
          );
        }

        return (
          <div className="flex flex-row gap-4">
            {hasTwitter && (
              <Button
                as={Link}
                href={extraData.twitter}
                isExternal
                isIconOnly
                color="primary"
                variant="flat"
                className="hover:bg-primary/10"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Button>
            )}
            {hasTelegram && (
              <Button
                as={Link}
                href={extraData.telegram}
                isExternal
                isIconOnly
                color="primary"
                variant="flat"
                className="hover:bg-primary/10"
                aria-label="Telegram"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m12 24c6.629 0 12-5.371 12-12s-5.371-12-12-12-12 5.371-12 12 5.371 12 12 12zm-6.509-12.26 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z" />
                </svg>
              </Button>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  };

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  // Helper function to validate if a URL exists and is valid
  const isValidUrl = (url: string | undefined): boolean => {
    if (!url || url.trim() === "") return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Helper function to handle token name click for description popup
  const handleTokenNameClick = (token: any) => {
    const description =
      token?.extraData?.description || "No description available";
    setSelectedTokenDescription(description);
    setSelectedTokenDetails(token);
    onDescriptionOpen();
  };

  // Helper function to create Range explorer URL
  const createRangeExplorerUrl = (address: string) => {
    // Use current network context to determine the correct network parameter
    const network =
      currentNetwork === "mainnet" ? "zigchain" : "zigchain-testnet";
    return `https://app.range.org/address/${network}/${address}`;
  };

  // Helper function to copy text to clipboard
  const copyToClipboard = async (text: string, itemType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemType);
      // Clear the copied state after 2 seconds
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 -mt-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name, symbol, denom, or creator..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column: any) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button onPress={onOpen} color="primary" endContent={<Plus />}>
              Create New Token
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {address && (
                <Checkbox
                  isSelected={showMyTokensOnly}
                  onValueChange={setShowMyTokensOnly}
                >
                  My tokens only
                </Checkbox>
              )}
              <span className="text-muted-foreground text-small">
                Total {filteredItems.length} tokens
              </span>
            </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-small">
              Rows per page:
            </span>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  size="sm"
                  endContent={<ChevronDown className="text-small" />}
                  className="bg-content2 hover:bg-content3 text-foreground border border-divider"
                >
                  {rowsPerPage}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Rows per page selection"
                selectedKeys={new Set([rowsPerPage.toString()])}
                onAction={(key) => {
                  const selectedValue = key as string;
                  setRowsPerPage(Number(selectedValue));
                  setPage(1);
                }}
                classNames={{
                  base: "bg-content1 border-divider",
                }}
              >
                <DropdownItem
                  key="10"
                  className="text-foreground data-[hover=true]:bg-content2 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                >
                  10
                </DropdownItem>
                <DropdownItem
                  key="20"
                  className="text-foreground data-[hover=true]:bg-content2 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                >
                  20
                </DropdownItem>
                <DropdownItem
                  key="50"
                  className="text-foreground data-[hover=true]:bg-content2 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                >
                  50
                </DropdownItem>
                <DropdownItem
                  key="100"
                  className="text-foreground data-[hover=true]:bg-content2 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                >
                  100
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    onOpen,
    filteredItems.length,
    rowsPerPage,
    onClear,
    address,
    showMyTokensOnly,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-left items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  if (isLoading) {
    return <Spinner color="primary" />;
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new token
              </ModalHeader>
              <ModalBody>
                <TokenCreationForm
                  onSuccess={() => {
                    onClose();
                    mutateTokens();
                    mutateMetadata();
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDescriptionOpen}
        onOpenChange={onDescriptionOpenChange}
        size="2xl"
      >
        <ModalContent className="max-w-4xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-secondary/50 dark:bg-secondary/20">
                <h2 className="text-xl font-bold text-foreground">
                  Token Details
                </h2>
              </ModalHeader>
              <ModalBody className="p-6">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Description
                    </h3>
                    <div className="text-foreground/90 bg-card border border-border p-4 rounded-lg text-base leading-relaxed">
                      {selectedTokenDescription}
                    </div>
                  </div>

                  {/* Token Details */}
                  {selectedTokenDetails && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Token Information
                      </h3>
                      <div className="bg-card border border-border p-4 rounded-lg space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-muted-foreground">
                                Denom:
                              </span>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="h-6 w-6 min-w-6"
                                onPress={() =>
                                  copyToClipboard(
                                    selectedTokenDetails.denom,
                                    "denom"
                                  )
                                }
                              >
                                <Copy
                                  size={14}
                                  className={
                                    copiedItem === "denom"
                                      ? "text-green-500"
                                      : "text-muted-foreground"
                                  }
                                />
                              </Button>
                            </div>
                            <div className="relative">
                              <span className="text-foreground font-mono text-sm break-all bg-muted/50 dark:bg-muted/30 p-2 rounded border border-border block pr-8">
                                {selectedTokenDetails.denom}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-muted-foreground">
                                Creator:
                              </span>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="h-6 w-6 min-w-6"
                                onPress={() =>
                                  copyToClipboard(
                                    selectedTokenDetails.creator,
                                    "creator"
                                  )
                                }
                              >
                                <Copy
                                  size={14}
                                  className={
                                    copiedItem === "creator"
                                      ? "text-green-500"
                                      : "text-muted-foreground"
                                  }
                                />
                              </Button>
                            </div>
                            <div className="relative">
                              <Link
                                isExternal
                                href={createRangeExplorerUrl(
                                  selectedTokenDetails.creator
                                )}
                                className="text-primary hover:text-primary/80 font-mono text-sm break-all bg-muted/50 dark:bg-muted/30 p-2 rounded border border-border block pr-8"
                              >
                                {selectedTokenDetails.creator}
                              </Link>
                            </div>
                          </div>
                          <div>
                            <span className="block text-sm font-medium text-muted-foreground mb-1">
                              Supply:
                            </span>
                            <span className="text-foreground text-base font-medium">
                              {selectedTokenDetails.supply?.toLocaleString()} /{" "}
                              {selectedTokenDetails.maxSupply?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        aria-label="Denom table"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "h-[75vh]",
          th: "bg-secondary dark:bg-secondary sticky top-0 z-10 -mx-4 px-4",
          td: "py-2",
        }}
        selectionMode="none"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={
                column.uid === "actions"
                  ? "center"
                  : column.uid === "icon"
                  ? "center"
                  : "start"
              }
              allowsSorting={column.sortable}
              className={
                column.uid === "icon"
                  ? "w-80 min-w-80 tokentable-token"
                  : column.uid === "ticker"
                  ? "w-32"
                  : column.uid === "supply"
                  ? "w-32"
                  : ""
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={isLoading ? "Loading..." : "No denoms found"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={`${item.denom}-${item.creator}`}>
              {(columnKey) => (
                <TableCell>{renderCell(item as any, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
