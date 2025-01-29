import { CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CircularProgress } from "./CircularProgress";
import { expenseData } from "./types";

export const ExpenseDistributionCard = () => {
  return (
    <div className="space-y-8 rounded-lg bg-white p-8 shadow-lg w-full max-w-7xl mx-auto"> {/* Increased width and padding */}
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold">Produção por Nível</CardTitle>
      </CardHeader>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8"> {/* Adjusted grid and gap */}
        {expenseData.map((item) => (
          <motion.div
            key={item.category}
            className="flex flex-col items-center space-y-4" /* Increased spacing */
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CircularProgress percentage={item.percentage} color={item.color} />
            <span className="text-lg font-medium text-center">{item.category}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};