
import { motion } from 'framer-motion';
import { Sparkles, Crown, HeartHandshake, Zap, Shield, Gift } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    { 
      icon: <Sparkles className="h-8 w-8 text-blue-500" />, 
      title: "Experiência Premium", 
      description: "Jogos em alta resolução com gráficos impressionantes e jogabilidade fluida." 
    },
    { 
      icon: <Crown className="h-8 w-8 text-indigo-500" />, 
      title: "Conteúdo Exclusivo", 
      description: "Acesso antecipado a novos lançamentos e conteúdo exclusivo para membros." 
    },
    { 
      icon: <HeartHandshake className="h-8 w-8 text-pink-500" />, 
      title: "Comunidade Ativa", 
      description: "Participe de eventos, torneios e interaja com outros jogadores da plataforma." 
    },
    { 
      icon: <Zap className="h-8 w-8 text-yellow-500" />, 
      title: "Alto Desempenho", 
      description: "Servidores otimizados para garantir jogabilidade sem lag e interrupções." 
    },
    { 
      icon: <Shield className="h-8 w-8 text-green-500" />, 
      title: "Segurança Garantida", 
      description: "Proteção de dados e sistema anti-trapaça para uma experiência justa." 
    },
    { 
      icon: <Gift className="h-8 w-8 text-purple-500" />, 
      title: "Recompensas Diárias", 
      description: "Ganhe moedas e itens especiais diariamente apenas por jogar na plataforma." 
    }
  ];

  return (
    <section id="features" className="py-20 bg-white bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-gray-800"
          >
            Por que escolher a PlayTec?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Nossa plataforma foi desenvolvida para oferecer a melhor experiência em jogos e entretenimento digital.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 p-3 rounded-lg w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
