
import { useFinancial } from '@/contexts/financial/FinancialContext';

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useFinancial();

  return (
    <input
      type="text"
      placeholder="Pesquisar"
      className="border rounded-md px-4 h-9 w-full md:w-64"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
