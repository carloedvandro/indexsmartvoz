
import { useState, useRef } from "react";
import { LogOut, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface LogoutButtonProps {
  onLogout: () => void;
  className?: string;
}

export function LogoutButton({ onLogout, className }: LogoutButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [buttonStyle, setButtonStyle] = useState(0); // 0, 1, or 2 for different styles
  const constraintsRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for beep sound
    audioRef.current = new Audio('/beep.mp3');
    
    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);
  
  const handleDragEnd = () => {
    if (dragProgress > 0.7) {
      // Play beep sound on successful logout
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play error:', err));
      }
      onLogout();
    }
    setIsDragging(false);
    setDragProgress(0);
  };

  const handleDrag = (_: any, info: any) => {
    const progress = Math.min(Math.max(info.offset.x / 148, 0), 1);
    setDragProgress(progress);
    setIsDragging(progress > 0);
  };

  const cycleButtonStyle = () => {
    setButtonStyle((prev) => (prev + 1) % 3);
  };

  // Style 0: Purple gradient (current style)
  const renderStyle0 = () => (
    <div
      ref={constraintsRef}
      className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-full h-12 w-[190px] flex items-center overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
    >
      <motion.div 
        className="absolute left-0 h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-200"
        style={{ width: `${dragProgress * 100}%` }}
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: isDragging ? 1 : 0.8,
          scale: isDragging ? 1.02 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 148 }}
        dragElastic={0.1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="absolute left-0 z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg cursor-grab"
        whileDrag={{ scale: 1.1 }}
        whileHover={{ scale: 1.05 }}
        animate={{ 
          x: isDragging ? dragProgress * 148 : 0,
          boxShadow: isDragging ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <LogOut className={cn(
          "w-5 h-5 transition-colors duration-300",
          dragProgress > 0.5 ? "text-red-500" : "text-purple-500"
        )} />
      </motion.div>
      <span className={cn(
        "ml-14 font-medium transition-all duration-300",
        dragProgress > 0.5 ? "text-white" : "text-purple-700"
      )}>
        {dragProgress > 0.5 ? "Solte para sair" : "Arraste para sair"}
      </span>
    </div>
  );

  // Style 1: Flat clean style with light purple
  const renderStyle1 = () => (
    <div
      ref={constraintsRef}
      className="bg-white border-2 border-purple-300 rounded-full h-12 w-[190px] flex items-center overflow-hidden shadow-sm transition-all duration-300 hover:border-purple-400"
    >
      <motion.div 
        className="absolute left-0 h-full bg-purple-100 rounded-full transition-all duration-200"
        style={{ width: `${dragProgress * 100}%` }}
        initial={{ opacity: 0.6 }}
        animate={{ 
          opacity: isDragging ? 0.8 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 148 }}
        dragElastic={0.1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="absolute left-0 z-10 flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full shadow-md cursor-grab"
        whileDrag={{ scale: 1.05 }}
        whileHover={{ scale: 1.02 }}
        animate={{ 
          x: isDragging ? dragProgress * 148 : 0
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </motion.div>
      <span className={cn(
        "ml-14 font-medium transition-all duration-300",
        dragProgress > 0.5 ? "text-purple-800" : "text-purple-600"
      )}>
        {dragProgress > 0.5 ? "Solte para sair" : "Arraste para sair"}
      </span>
    </div>
  );

  // Style 2: Minimal transparent style
  const renderStyle2 = () => (
    <div
      ref={constraintsRef}
      className="bg-purple-50 bg-opacity-40 backdrop-blur-sm rounded-full h-12 w-[190px] flex items-center overflow-hidden shadow-sm border border-purple-100 transition-all duration-300"
    >
      <motion.div 
        className="absolute left-0 h-full bg-purple-200 bg-opacity-60 rounded-full transition-all duration-200"
        style={{ width: `${dragProgress * 100}%` }}
      />
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 148 }}
        dragElastic={0.1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="absolute left-0 z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-grab border border-purple-200"
        whileDrag={{ rotate: dragProgress * 90 }}
        animate={{ 
          x: isDragging ? dragProgress * 148 : 0
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <LogOut className="w-5 h-5 text-purple-500" />
      </motion.div>
      <span className="ml-14 font-medium text-purple-700">
        {dragProgress > 0.5 ? "Solte para sair" : "Arraste para sair"}
      </span>
    </div>
  );

  return (
    <div className={cn("relative", className)}>
      <div onClick={cycleButtonStyle} className="cursor-pointer">
        {buttonStyle === 0 && renderStyle0()}
        {buttonStyle === 1 && renderStyle1()}
        {buttonStyle === 2 && renderStyle2()}
      </div>
    </div>
  );
}
