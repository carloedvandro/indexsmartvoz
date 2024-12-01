import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t('welcome_to')} NetQuest
          </h1>
          <p className="text-lg text-gray-600">
            {t('choose_access')}
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/client/login">
            <Button className="w-full text-lg py-6" variant="default">
              {t('client_area')}
            </Button>
          </Link>
          
          <Link to="/admin/login">
            <Button className="w-full text-lg py-6" variant="secondary">
              {t('admin_area')}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}