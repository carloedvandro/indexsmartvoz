
import { motion } from 'framer-motion';

export const NetworkStatsGrid = () => {
  const levels = [
    { title: 'Nível 1', value: 1, color: '#FF6B6B', description: 'Indicados Diretos' },
    { title: 'Nível 2', value: 3, color: '#4ADE80', description: 'Indicados Indiretos' },
    { title: 'Nível 3', value: 1, color: '#8B5CF6', description: 'Indicados Indiretos' },
    { title: 'Nível 4', value: 1, color: '#FF9F1C', description: 'Indicados Indiretos' }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {levels.map((level, index) => (
        <motion.div 
          key={index}
          className="p-6 rounded-lg text-center w-full min-w-[140px]"
          style={{ backgroundColor: `${level.color}20` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm font-medium" style={{ color: level.color }}>{level.title}</p>
          <p className="text-2xl font-bold mt-1" style={{ color: level.color }}>{level.value}</p>
          <p className="text-xs text-gray-600 mt-1">{level.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
