import { CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CircularProgress } from "./CircularProgress";
import { expenseData } from "./types";

export const ExpenseDistributionCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1800px] mx-auto space-y-8">
      <h3 className="text-2xl font-black bg-gradient-to-r from-color-1 via-color-2 to-color-3 bg-clip-text text-transparent [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] animate-rainbow bg-[length:200%_auto] leading-none w-full text-left px-4">
        Produção por Nível
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[1800px] mx-auto px-4 pt-6">
        {expenseData.map((item) => (
          <motion.div
            key={item.category}
            className="flex flex-col items-center justify-center space-y-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CircularProgress percentage={item.percentage} color={item.color} />
            <span className="text-sm font-medium text-center">{item.category}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};