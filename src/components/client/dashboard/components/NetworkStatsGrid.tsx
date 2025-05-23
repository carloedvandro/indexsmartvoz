
import { motion } from 'framer-motion';
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from '@/hooks/useNetworkStats';

export const NetworkStatsGrid = () => {
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);
  
  const levels = [
    { 
      title: 'Nível 1', 
      value: networkStats?.level1Count ?? 0, 
      color: '#FF6B6B', 
      description: 'Indicados Diretos' 
    },
    { 
      title: 'Nível 2', 
      value: networkStats?.level2Count ?? 0, 
      color: '#4ADE80', 
      description: 'Indicados Indiretos' 
    },
    { 
      title: 'Nível 3', 
      value: networkStats?.level3Count ?? 0, 
      color: '#8B5CF6', 
      description: 'Indicados Indiretos' 
    },
    { 
      title: 'Nível 4', 
      value: networkStats?.level4Count ?? 0, 
      color: '#FF9F1C', 
      description: 'Indicados Indiretos' 
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
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
          <p className="text-xs text-gray-600 mt-1">{level.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
