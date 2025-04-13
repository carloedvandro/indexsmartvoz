
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Globe, Mail, Phone, Users, ShoppingBag, Award, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticlesBackground from '@/components/client/products/ParticlesBackground';

export default function ModernSite() {
  const [activeSection, setActiveSection] = useState('home');
  
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
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft size={20} />
              Voltar
            </Button>
          </Link>
          
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            SmartVoz
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'features', 'services', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-500'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-gray-700">
              Menu
            </Button>
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
              Transforme sua presença digital
            </h1>
            <p className="text-xl text-gray-700 mb-10">
              Soluções inovadoras para empresas que buscam se destacar no mundo digital.
              Designs responsivos, experiências personalizadas e tecnologia de ponta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                Iniciar Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Saiba Mais
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Recursos Exclusivos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma oferece recursos avançados para impulsionar seu negócio digital.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Users className="h-8 w-8 text-purple-500" />, 
                title: "Colaboração em Tempo Real", 
                description: "Trabalhe com sua equipe em tempo real, sem conflitos ou atrasos." 
              },
              { 
                icon: <Award className="h-8 w-8 text-indigo-500" />, 
                title: "Designs Premiados", 
                description: "Templates criados por designers renomados para destacar sua marca." 
              },
              { 
                icon: <Lightbulb className="h-8 w-8 text-pink-500" />, 
                title: "Soluções Inovadoras", 
                description: "Tecnologias modernas para criar experiências únicas para seus usuários." 
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
              Oferecemos uma gama completa de serviços para ajudar sua empresa a prosperar no mundo digital.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Desenvolvimento Web",
                description: "Sites responsivos e aplicações web modernas com foco em experiência do usuário e performance.",
                link: "#"
              },
              {
                title: "Marketing Digital",
                description: "Estratégias personalizadas para aumentar a visibilidade da sua marca e atrair mais clientes.",
                link: "#"
              },
              {
                title: "Design UX/UI",
                description: "Interfaces intuitivas e atraentes que melhoram a experiência do usuário e aumentam a conversão.",
                link: "#"
              },
              {
                title: "Consultoria em Tecnologia",
                description: "Orientação especializada para ajudar sua empresa a escolher as melhores soluções tecnológicas.",
                link: "#"
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
                <a 
                  href={service.link} 
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
                >
                  Saiba mais 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
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
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl aspect-video flex items-center justify-center text-white text-4xl font-bold">
                SmartVoz
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">Sobre Nós</h2>
              <p className="text-gray-700 mb-4">
                A SmartVoz nasceu com a missão de transformar o modo como as empresas se conectam com seus clientes no ambiente digital.
              </p>
              <p className="text-gray-700 mb-6">
                Com mais de 10 anos de experiência no mercado, nossa equipe de especialistas combina criatividade e tecnologia para entregar soluções que impulsionam resultados reais.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Conheça Nossa História
              </Button>
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
              Estamos prontos para ajudar. Entre em contato conosco para discutir seu projeto.
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
                    <p className="text-gray-600">(11) 99999-9999</p>
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
    </div>
  );
}
