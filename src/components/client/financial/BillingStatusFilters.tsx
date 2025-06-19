interface BillingStatusFiltersProps {
  // No props needed for now as the filters are static
}
export function BillingStatusFilters() {
  return <div className="flex items-center justify-between mb-6 flex-col md:flex-row lg:flex-row">
      <h2 className="text-xl font-semibold text-gray-800">Situação das cobranças</h2>
      <div className="flex gap-2 w-full md:w-[20vw]">
        <button className="gap-2 px-4 py-2 border border-gray-300 w-full rounded-lg hover:bg-gray-50" style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
      }}>
          <span className="text-blue-600">Este mês</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
            <line x1="16" x2="16" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="2" y2="6"></line>
            <line x1="3" x2="21" y1="10" y2="10"></line>
          </svg>
        </button>
        <button style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
      }} className="gap-2 px-4 py-2 border border-gray-300 w-full rounded-lg hover:bg-gray-50">
          <span className="text-blue-600">Filtros</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
    </div>;
}