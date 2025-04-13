
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_chip_favicon.png" 
              alt="SmartVoz" 
              className="h-8 w-8"
            />
            <span className="font-bold text-xl text-purple-700">SmartVoz</span>
          </div>
          <div className="flex gap-4">
            <Link to="/client/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/client/register">
              <Button>Cadastre-se</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Bem-vindo à Plataforma SmartVoz
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha uma opção abaixo para continuar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Site Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-purple-700">Site Oficial</h2>
              <p className="text-gray-600 mb-6">
                Visite nosso site oficial para conhecer nossos produtos e serviços.
              </p>
              <Link to="/site">
                <Button className="w-full">Acessar Site</Button>
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-purple-700">Área de Cliente</h2>
              <p className="text-gray-600 mb-6">
                Acesse sua conta para gerenciar sua rede e visualizar seus ganhos.
              </p>
              <Link to="/client/login">
                <Button className="w-full">Entrar</Button>
              </Link>
            </div>
          </motion.div>

          {/* Admin Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-purple-700">Área Administrativa</h2>
              <p className="text-gray-600 mb-6">
                Painel de administração para gestores da plataforma.
              </p>
              <Link to="/admin/login">
                <Button className="w-full">Admin</Button>
              </Link>
            </div>
          </motion.div>

          {/* Demo Site Templates */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-purple-700">Template Moderno</h2>
              <p className="text-gray-600 mb-6">
                Exemplo de site com design moderno e responsivo.
              </p>
              <Link to="/modern-site">
                <Button className="w-full">Ver Demo</Button>
              </Link>
            </div>
          </motion.div>

          {/* 3D Site Model */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-purple-700">Modelo 3D</h2>
              <p className="text-gray-600 mb-6">
                Visualize um modelo 3D interativo do nosso site.
              </p>
              <Link to="/site-model">
                <Button className="w-full">Explorar 3D</Button>
              </Link>
            </div>
          </motion.div>

          {/* Store Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-purple-700">Loja Virtual</h2>
              <p className="text-gray-600 mb-6">
                Acesse nossa loja virtual e conheça nossos produtos.
              </p>
              <Link to="/client/store">
                <Button className="w-full">Visitar Loja</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} SmartVoz. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
