
interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredTransactionsCount: number;
}

export function SearchBar({ searchTerm, onSearchChange, filteredTransactionsCount }: SearchBarProps) {
  return (
    <div className="flex flex-row justify-between items-center gap-3 w-full md:w-[680px] mx-auto mb-6">
      <input
        type="text"
        placeholder="Pesquisar"
        className="border rounded-md px-4 h-9 w-full md:w-64"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      <div className="text-gray-600 text-sm">
        Total de {filteredTransactionsCount} registros
      </div>
    </div>
  );
}
