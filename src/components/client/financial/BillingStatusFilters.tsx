
interface BillingStatusFiltersProps {
  // No props needed for now as the filters are static
}

export function BillingStatusFilters() {
  return (
    <div className="flex items-center justify-between mb-6 flex-col md:flex-row lg:flex-row">
      <h2 className="text-xl font-semibold text-gray-800">Situação das cobranças</h2>
    </div>
  );
}
