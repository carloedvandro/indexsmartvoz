
import { Card } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { useIsMobile } from "@/hooks/use-mobile";

export function LineStatusCard() {
  // No futuro, esses dados viriam de uma API
  const totalLines = 1;
  const activeLines = 1;
  const inactiveLines = 0;
  const isMobile = useIsMobile();
  
  const imageStyle = { width: '60px', height: '60px' }; // Increased from 40px to 60px

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-medium">Linhas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4">Visualize o total de linhas de sua equipe.</p>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="flex items-center">
          <div className="mr-3"> {/* Increased margin for larger icons */}
            <Image 
              src="/lovable-uploads/aa2bacf8-c5da-4ad5-bfb5-6ec14b524ae7.png" 
              alt="Linhas Totais" 
              className="object-contain"
              width={60} // Increased from 40 to 60
              height={60} // Increased from 40 to 60
              style={imageStyle}
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Totais</p>
            <p className="text-lg font-semibold">{totalLines}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3"> {/* Increased margin for larger icons */}
            <Image 
              src="/lovable-uploads/5cd2c244-1d2c-41d6-9de7-76865f32923d.png" 
              alt="Linhas Ativas" 
              className="object-contain"
              width={60} // Increased from 40 to 60
              height={60} // Increased from 40 to 60
              style={imageStyle}
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Ativas</p>
            <p className="text-lg font-semibold">{activeLines}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-3"> {/* Increased margin for larger icons */}
            <Image 
              src="/lovable-uploads/55a072a8-cbbf-4b4d-8546-448bcacdfd3e.png" 
              alt="Linhas Inativas" 
              className="object-contain"
              width={60} // Increased from 40 to 60
              height={60} // Increased from 40 to 60
              style={imageStyle}
            />
          </div>
          <div>
            <p className="text-xs text-gray-500">Inativas</p>
            <p className="text-lg font-semibold">{inactiveLines}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
