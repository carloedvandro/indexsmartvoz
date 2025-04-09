
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function SiteContact() {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-700">
            Tem alguma pergunta ou precisa de ajuda? Entre em contato conosco e teremos prazer em ajudar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Envie-nos uma mensagem</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <Input id="subject" placeholder="Assunto da mensagem" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <Textarea id="message" placeholder="Sua mensagem" className="min-h-[120px]" />
              </div>
              <Button className="w-full bg-purple-800 hover:bg-purple-900 text-white">
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Informações de Contato</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-purple-800 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Endereço</h4>
                  <p className="text-gray-700 mt-1">
                    Av. Paulista, 1000
                    <br />
                    São Paulo, SP - 01310-100
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-purple-800 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Telefone</h4>
                  <p className="text-gray-700 mt-1">(11) 98765-4321</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-purple-800 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-700 mt-1">contato@smartvoz.com.br</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-3">Horário de Atendimento</h4>
              <p className="text-gray-700">
                Segunda a Sexta: 8h - 18h
                <br />
                Sábado: 9h - 13h
                <br />
                Domingo: Fechado
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
