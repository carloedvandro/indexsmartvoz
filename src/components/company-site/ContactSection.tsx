
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cnpj: '',
    investment: 'R$ 40 mil a R$ 60 mil'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Formulário enviado com sucesso!');
    setFormData({
      name: '',
      phone: '',
      email: '',
      cnpj: '',
      investment: 'R$ 40 mil a R$ 60 mil'
    });
  };

  return (
    <section id="contact" className="py-16 bg-[#0a0a20] relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Já imaginou o potencial da sua marca com cobertura nacional?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Alavanque sua Marca: Nossa equipe comercial está ansiosa para entender suas Metas e traçar juntos o caminho para o sucesso!
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#13133f] p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6 text-center text-white">
                INSCREVA-SE PARA EXPANDIR SUA MARCA
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nome"
                    className="w-full px-4 py-2 rounded bg-white text-gray-900"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-white mb-2">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Telefone"
                    className="w-full px-4 py-2 rounded bg-white text-gray-900"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className="w-full px-4 py-2 rounded bg-white text-gray-900"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cnpj" className="block text-white mb-2">CNPJ</label>
                  <input
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    placeholder="CNPJ"
                    className="w-full px-4 py-2 rounded bg-white text-gray-900"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="investment" className="block text-white mb-2">Seu nível de investimento</label>
                  <select
                    id="investment"
                    name="investment"
                    value={formData.investment}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-white text-gray-900"
                    required
                  >
                    <option value="R$ 40 mil a R$ 60 mil">R$ 40 mil a R$ 60 mil</option>
                    <option value="R$ 60 mil a R$ 80 mil">R$ 60 mil a R$ 80 mil</option>
                    <option value="R$ 80 mil a R$ 100 mil">R$ 80 mil a R$ 100 mil</option>
                    <option value="Acima de R$ 100 mil">Acima de R$ 100 mil</option>
                  </select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#ff1d8e] hover:bg-[#d4157a] text-white py-3 transition-colors"
                >
                  ENVIAR
                </Button>
                
                <p className="text-xs text-gray-400 text-center mt-2">
                  Ao enviar, concordo com os Termos de Uso e Política de Privacidade do site e concordo em receber mensagens e e-mails.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
