import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, User, ShoppingCart, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <img
              src="/lovable-uploads/e46806f7-5804-4267-ba9c-f94976275f20.png"
              alt="Logo"
              className="h-8"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Registre-se</Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Líder em Tecnologia
          </h1>
          <h2 className="text-4xl font-bold mb-6">
            Para Marketing Multinível
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Acesse agora a nossa demonstração:
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all">
                <Link to="/backoffice" className="flex flex-col items-center">
                  <Home className="h-8 w-8 mb-4 text-primary" />
                  <span className="text-lg font-medium">
                    Backoffice (Escritório Virtual)
                  </span>
                </Link>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all">
                <Link to="/admin" className="flex flex-col items-center">
                  <User className="h-8 w-8 mb-4 text-primary" />
                  <span className="text-lg font-medium">Administração</span>
                </Link>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all">
                <Link to="/store" className="flex flex-col items-center">
                  <ShoppingCart className="h-8 w-8 mb-4 text-primary" />
                  <span className="text-lg font-medium">Loja Virtual</span>
                </Link>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all">
                <Link to="/distribution" className="flex flex-col items-center">
                  <Database className="h-8 w-8 mb-4 text-primary" />
                  <span className="text-lg font-medium">
                    Centro de Distribuição
                  </span>
                </Link>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <footer className="mt-32 py-8 bg-secondary/5">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;