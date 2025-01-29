import { CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CircularProgress } from "./CircularProgress";
import { ExpenseBarChart } from "./ExpenseBarChart";
import { expenseData } from "./types";

export const ExpenseDistributionCard = () => {
  return (
    <div className="space-y-6 rounded-lg bg-white p-8 px-2 shadow-lg w-full max-w-[4000px] mx-auto">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold">Produção por Nível</CardTitle>
      </CardHeader>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
        {expenseData.map((item) => (
          <motion.div
            key={item.category}
            className="flex flex-col items-center space-y-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CircularProgress percentage={item.percentage} color={item.color} />
            <span className="text-sm font-medium text-center">{item.category}</span>
          </motion.div>
        ))}
      </div>

      <ExpenseBarChart data={expenseData} />
    </div>
  );
};