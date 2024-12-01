import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Bem-vindo ao NetQuest
          </h1>
          <p className="text-lg text-gray-600">
            Escolha como deseja acessar o sistema
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/client/login">
            <Button className="w-full text-lg py-6" variant="default">
              Área do Cliente
            </Button>
          </Link>
          
          <Link to="/admin/login">
            <Button className="w-full text-lg py-6" variant="secondary">
              Área Administrativa
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}