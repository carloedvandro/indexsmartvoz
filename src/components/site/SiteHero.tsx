
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function SiteHero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900/30">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-purple-800 dark:text-purple-400">Conecte-se</span> e expanda seu negócio
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              A Smartvoz oferece soluções completas de telefonia e internet para você 
              se conectar com o mundo e expandir seu negócio com a melhor tecnologia do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/">
                <Button className="w-full sm:w-auto bg-purple-800 hover:bg-purple-900 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-8 py-3 rounded-lg">
                  Portal do Cliente
                </Button>
              </Link>
              <a href="#plans">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-3 rounded-lg dark:text-white dark:border-gray-600 dark:hover:bg-gray-800">
                  Ver Planos
                </Button>
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <img
              src="https://maelrohlhrhihntydydh.supabase.co/storage/v1/object/public/images//smartvoz_parede_ultimate.png"
              alt="Smartvoz"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
