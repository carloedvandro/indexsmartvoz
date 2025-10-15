
import { motion } from 'framer-motion';

export const NetworkStatsGrid = () => {
  // Show only 4 levels as requested
  const levels = [
    { title: 'Nível 1', value: 1, color: '#FF6B6B', description: 'Indicados Diretos' },
    { title: 'Nível 2', value: 3, color: '#4ADE80', description: 'Indicados Indiretos' },
    { title: 'Nível 3', value: 1, color: '#8B5CF6', description: 'Indicados Indiretos' },
    { title: 'Nível 4', value: 1, color: '#FF9F1C', description: 'Indicados Indiretos' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {levels.map((level, index) => (
        <motion.div 
          key={index}
          className="p-4 rounded-lg text-center"
          style={{ backgroundColor: `${level.color}20` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm font-medium" style={{ color: level.color }}>{level.title}</p>
          <p className="text-2xl font-bold mt-1" style={{ color: level.color }}>{level.value}</p>
          <div className="flex flex-col items-center mt-1">
            <p className="text-xs text-black">{level.value} clientes</p>
            <p className="text-xs text-black">0 cobranças</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
