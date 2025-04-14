import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Globe, Mail, Phone, Users, ShoppingBag, Award, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticlesBackground from '@/components/client/products/ParticlesBackground';
import { LanguageSelector } from '@/components/LanguageSelector';

export default function CompanySite() {
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useTranslation();
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'services', 'about', 'contact'];
      const currentPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (currentPosition >= top && currentPosition <= top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set document title
    document.title = "SmartVoz - Sua plataforma completa de networking";
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <ParticlesBackground style="stars" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_chip_favicon.png" 
              alt="SmartVoz Logo" 
              className="h-8 w-8"
            />
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              SmartVoz
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: 'home', label: t('navigation.home') },
              { id: 'features', label: t('navigation.features') },
              { id: 'services', label: t('navigation.services') },
              { id: 'about', label: t('navigation.about') },
              { id: 'contact', label: t('navigation.contact') }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section.id 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-500'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link to="/client/login">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Login
              </Button>
            </Link>
            <Link to="/client/register">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 hidden md:flex">
                Cadastre-se
              </Button>
            </Link>
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-gray-700">
                Menu
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600">
              Desperte o Potencial da sua Rede
            </h1>
            <p className="text-xl text-gray-700 mb-10">
              A SmartVoz oferece uma plataforma completa de networking, produtos tecnológicos e oportunidades para transformar seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/client/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                >
                  Cadastre-se Agora
                </Button>
              </Link>
              <Link to="/client/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  Acessar Plataforma
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Por que escolher a SmartVoz?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma foi projetada para oferecer as melhores soluções em networking e oportunidades de negócio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Users className="h-8 w-8 text-purple-500" />, 
                title: "Rede de Negócios", 
                description: "Construa e gerencie sua rede de contatos de forma eficiente e lucrativa." 
              },
              { 
                icon: <Award className="h-8 w-8 text-indigo-500" />, 
                title: "Planos Exclusivos", 
                description: "Produtos e serviços com qualidade premium e preços competitivos." 
              },
              { 
                icon: <ShoppingBag className="h-8 w-8 text-pink-500" />, 
                title: "Loja Virtual", 
                description: "Tenha sua própria loja para comercializar produtos e expandir seus negócios." 
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-purple-50 p-3 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça os principais serviços que a SmartVoz oferece para potencializar seu sucesso.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Planos de Telefonia",
                description: "Planos de telefonia móvel com preços acessíveis e excelente cobertura em todo o território nacional.",
                link: "/client/products"
              },
              {
                title: "eSIM Virtual",
                description: "Tecnologia de ponta com chip virtual para facilitar sua comunicação sem a necessidade de chip físico.",
                link: "/client/esim"
              },
              {
                title: "Rede de Negócios",
                description: "Plataforma completa para gerenciar sua rede de contatos e potencializar suas oportunidades de negócio.",
                link: "/client/network"
              },
              {
                title: "Loja Virtual Personalizada",
                description: "Crie sua loja virtual personalizada e comece a vender produtos diretamente para seus clientes.",
                link: "/client/store"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to={service.link} 
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
                >
                  Saiba mais 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-white bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img 
                  src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_parede_ultimate.png" 
                  alt="SmartVoz Team" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">Sobre a SmartVoz</h2>
              <p className="text-gray-700 mb-4">
                A SmartVoz é uma empresa brasileira especializada em soluções de comunicação e networking, criada com a missão de conectar pessoas e expandir oportunidades de negócio.
              </p>
              <p className="text-gray-700 mb-6">
                Com uma equipe de profissionais experientes e dedicados, oferecemos produtos e serviços inovadores que atendem às necessidades de nossos clientes, sempre com qualidade e excelência.
              </p>
              <Link to="/client/register">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Faça Parte da Nossa Rede
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estamos à disposição para atender suas dúvidas e oferecer o suporte necessário.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">contato@smartvoz.com.br</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Telefone</h3>
                    <p className="text-gray-600">(11) 4140-3444</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="bg-white p-8 rounded-xl shadow-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img 
                src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_chip_favicon.png" 
                alt="SmartVoz Logo" 
                className="h-8 w-8"
              />
              <div className="text-2xl font-bold">
                SmartVoz
              </div>
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
    </div>
  );
}
