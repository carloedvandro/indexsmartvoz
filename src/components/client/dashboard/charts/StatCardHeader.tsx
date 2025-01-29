import { motion } from 'framer-motion';

interface StatCardHeaderProps {
  title: string;
  value: string;
}

export const StatCardHeader = ({ title, value }: StatCardHeaderProps) => {
  return (
    <>
      <motion.h3 
        className="text-sm font-medium text-gray-600"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-2xl font-bold mt-2 text-gray-900"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {value}
      </motion.p>
    </>
  );
};