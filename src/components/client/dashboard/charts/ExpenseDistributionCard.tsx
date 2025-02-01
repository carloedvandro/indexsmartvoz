import { CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CircularProgress } from "./CircularProgress";
import { expenseData } from "./types";

export const ExpenseDistributionCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1800px] mx-auto space-y-8">
      <CardTitle className="text-2xl font-bold text-center">Produção por Nível</CardTitle>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[1800px] mx-auto px-4">
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