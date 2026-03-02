import TokenTable from "@/components/token-table";

export default function Home() {
  return (
    <div className="container pt-4">
      <h1 className="text-3xl font-bold text-center mb-4">Tokens</h1>
      <TokenTable />
    </div>
  );
}
