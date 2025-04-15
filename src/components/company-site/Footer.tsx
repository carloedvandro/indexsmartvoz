
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="py-10 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/49635a23-d82d-406f-949c-9a8dc02dc345.png" 
              alt="SmartVoz Logo" 
              className="h-8 w-8"
            />
            <div className="text-2xl font-bold">
              SmartVoz
            </div>
          </div>
          
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-[#ff2c78] transition-colors">Facebook</Link>
            <Link to="#" className="hover:text-[#ff2c78] transition-colors">Instagram</Link>
            <Link to="#" className="hover:text-[#ff2c78] transition-colors">Twitter</Link>
            <Link to="#" className="hover:text-[#ff2c78] transition-colors">LinkedIn</Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SmartVoz. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
