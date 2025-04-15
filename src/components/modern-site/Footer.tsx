
export function Footer() {
  return (
    <footer className="py-10 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            SmartVoz
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-purple-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SmartVoz. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
