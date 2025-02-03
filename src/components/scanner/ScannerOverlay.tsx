export function ScannerOverlay() {
  return (
    <div className="absolute inset-0 z-10">
      {/* Cantos superiores */}
      <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-white" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white" />
      
      {/* Cantos inferiores */}
      <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-white" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-white" />
      
      {/* Scanner line animation */}
      <div className="absolute left-0 w-full h-0.5 bg-red-500 opacity-50">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 animate-scanner" />
      </div>
    </div>
  );
}