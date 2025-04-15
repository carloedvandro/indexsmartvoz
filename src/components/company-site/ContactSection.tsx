
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cnpj: '',
    investment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Adicionar lógica de envio aqui
    alert('Formulário enviado com sucesso!');
  };

  return (
    <section id="contact" className="py-20 bg-[#030225] relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Já imaginou o potencial da sua marca com cobertura nacional?
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Alavanque sua Marca: Nossa equipe comercial está ansiosa para entender suas Metas e traçar juntos o caminho para o sucesso!
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#2a1f45] p-8 rounded-lg"
          >
            <h3 className="text-xl font-bold text-white mb-6 uppercase text-center">
              Inscreva-se para expandir sua marca
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Nome</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Nome" 
                    className="bg-white" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-white">Telefone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="Telefone" 
                    className="bg-white" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="E-mail" 
                    className="bg-white" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="cnpj" className="text-white">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    name="cnpj" 
                    placeholder="CNPJ" 
                    className="bg-white" 
                    value={formData.cnpj}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="investment" className="text-white">Seu nível de investimento</Label>
                  <select
                    id="investment"
                    name="investment"
                    className="w-full bg-white rounded-md border border-input px-3 py-2 text-sm ring-offset-background"
                    value={formData.investment}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="40-60">R$ 40 mil a R$ 60 mil</option>
                    <option value="60-80">R$ 60 mil a R$ 80 mil</option>
                    <option value="80-100">R$ 80 mil a R$ 100 mil</option>
                    <option value="100+">Acima de R$ 100 mil</option>
                  </select>
                </div>
                
                <Button type="submit" className="w-full bg-[#ff0066] hover:bg-[#d4004f] text-white">
                  ENVIAR
                </Button>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  Ao enviar, concordo com os Termos de Uso e Política de Privacidade do site e concordo em receber mensagens e e-mails.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
