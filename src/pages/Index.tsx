
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-white p-4">
      <header className="mb-8">
        <div className="flex items-center gap-2">
          <img 
            src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_chip_favicon.png" 
            alt="SmartVoz" 
            className="h-6"
          />
          <span className="font-bold">SmartVoz</span>
        </div>
        <div className="mt-2">
          <Link to="/client/login" className="border border-gray-300 px-2 py-1 mr-2 bg-gray-100">
            Login
          </Link>
          <Link to="/client/register" className="border border-gray-300 px-2 py-1 bg-gray-100">
            Cadastre-se
          </Link>
        </div>
      </header>

      <main>
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Plataforma SmartVoz</h1>
        <p className="mb-8">Escolha uma opção abaixo para continuar</p>

        <div className="space-y-8">
          {/* Site Oficial */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Site Oficial</h2>
            <p className="mb-3">Visite nosso site oficial para conhecer nossos produtos e serviços.</p>
            <Link to="/site" className="border border-gray-300 px-2 py-1 bg-gray-100 inline-block">
              Acessar Site
            </Link>
          </div>

          {/* Área de Cliente */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Área de Cliente</h2>
            <p className="mb-3">Acesse sua conta para gerenciar sua rede e visualizar seus ganhos.</p>
            <Link to="/client/login" className="border border-gray-300 px-2 py-1 bg-gray-100 inline-block">
              Entrar
            </Link>
          </div>

          {/* Área Administrativa */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Área Administrativa</h2>
            <p className="mb-3">Painel de administração para gestores da plataforma.</p>
            <Link to="/admin/login" className="border border-gray-300 px-2 py-1 bg-gray-100 inline-block">
              Admin
            </Link>
          </div>

          {/* Template Moderno */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Template Moderno</h2>
            <p className="mb-3">Exemplo de site com design moderno e responsivo.</p>
            <Link to="/modern-site" className="border border-gray-300 px-2 py-1 bg-gray-100 inline-block">
              Ver Demo
            </Link>
          </div>

          {/* Loja Virtual */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Loja Virtual</h2>
            <p className="mb-3">Acesse nossa loja virtual e conheça nossos produtos.</p>
            <Link to="/client/store" className="border border-gray-300 px-2 py-1 bg-gray-100 inline-block">
              Visitar Loja
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-12 pt-4 border-t text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} SmartVoz. Todos os direitos reservados.
      </footer>
    </div>
  );
}
