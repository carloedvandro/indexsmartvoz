
import { Card } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { useIsMobile } from "@/hooks/use-mobile";

export function LineStatusCard() {
  // No futuro, esses dados viriam de uma API
  const totalLines = 1;
  const activeLines = 1;
  const inactiveLines = 0;
  const isMobile = useIsMobile();
  
  // Estilo para os ícones
  const imageStyle = { 
    width: '56px', 
    height: '56px',
    minWidth: '56px',
    minHeight: '56px'
  };

  // Estilo para o texto
  const textStyle = {
    marginLeft: '-12px'
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-medium" style={{ marginLeft: '-2px' }}>Linhas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-black mb-4" style={{ marginLeft: '-1px' }}>Visualize o total de linhas de sua equipe.</p>
      
      <div className="grid grid-cols-3 gap-6" style={{ marginLeft: '-15px' }}>
        <div className="flex items-center">
          <div className="mr-3">
            <Image 
              src="/lovable-uploads/11b68cb8-d58d-42ba-a911-7c58f10346ca.png" 
              alt="Linhas Totais" 
              className="object-contain"
              width={56}
              height={56}
              style={imageStyle}
            />
          </div>
          <div style={textStyle}>
            <p className="text-xs text-black">Totais</p>
            <p className="text-lg font-semibold text-black">{totalLines}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3">
            <Image 
              src="/lovable-uploads/11b68cb8-d58d-42ba-a911-7c58f10346ca.png" 
              alt="Linhas Ativas" 
              className="object-contain"
              width={56}
              height={56}
              style={{...imageStyle, marginLeft: '12px'}}
            />
          </div>
          <div style={textStyle}>
            <p className="text-xs text-black">Ativas</p>
            <p className="text-lg font-semibold text-black">{activeLines}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3">
            <Image 
              src="/lovable-uploads/11b68cb8-d58d-42ba-a911-7c58f10346ca.png" 
              alt="Linhas Inativas" 
              className="object-contain"
              width={56}
              height={56}
              style={imageStyle}
            />
          </div>
          <div style={textStyle}>
            <p className="text-xs text-black">Inativas</p>
            <p className="text-lg font-semibold text-black">{inactiveLines}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
