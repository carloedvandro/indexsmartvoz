
import { motion } from "framer-motion";

interface FinancialCardProps {
  title: string;
  subtitle: string;
  amount: string;
  trend: string;
  isPositive: boolean;
  color: string;
  textColor: string;
  index: number;
}

export const FinancialCard = ({ 
  title, 
  subtitle, 
  amount, 
  trend, 
  isPositive, 
  color, 
  textColor,
  index 
}: FinancialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex flex-col space-y-2">
        <h3 className={`text-lg font-bold ${textColor}`}>
          {title}
        </h3>
        <p className={`text-sm opacity-90 ${textColor}`}>
          {subtitle}
        </p>
        <div className="flex items-center justify-between">
          <span className={`text-2xl font-bold ${textColor}`}>
            {amount}
          </span>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            isPositive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}>
            {trend}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
