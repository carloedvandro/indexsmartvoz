
import React, { useRef } from "react";
import { Smartphone } from "lucide-react";
import { TimelineItem, Position } from "./types";
import { ExpandedCard } from "./ExpandedCard";

interface OrbitalNodeProps {
  item: TimelineItem;
  position: Position;
  isExpanded: boolean;
  isPulsing: boolean;
  timelineData: TimelineItem[];
  onToggle: (id: number) => void;
  onRelatedClick: (relatedId: number) => void;
}

export function OrbitalNode({
  item,
  position,
  isExpanded,
  isPulsing,
  timelineData,
  onToggle,
  onRelatedClick
}: OrbitalNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  // Parse features from content
  const parseFeatures = (content: string): string[] => {
    const parts = content.split(" - ");
    if (parts.length > 1) {
      return parts[1].split(", ");
    }
    return [];
  };

  const features = parseFeatures(item.content);

  const nodeStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    zIndex: isExpanded ? 200 : position.zIndex,
    opacity: isExpanded ? 1 : position.opacity,
  };

  return (
    <div
      ref={nodeRef}
      className="absolute transition-all duration-700 cursor-pointer"
      style={nodeStyle}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(item.id);
      }}
    >
      <div
        className={`absolute rounded-full -inset-1 ${
          isPulsing ? "animate-pulse duration-1000" : ""
        }`}
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
          width: `${item.energy * 0.5 + 40}px`,
          height: `${item.energy * 0.5 + 40}px`,
          left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
          top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
        }}
      ></div>

      {/* Círculo branco com ícone smartphone para todos os planos */}
      <div
        className={`
        w-12 h-12 rounded-full flex items-center justify-center
        bg-white text-black
        border-2 border-white
        transition-all duration-300 transform
        ${isExpanded ? "scale-150" : ""}
        ${isPulsing ? "animate-pulse" : ""}
      `}
      >
        <Smartphone size={20} className="text-black" />
      </div>

      {/* Texto do plano em branco embaixo - centralizado */}
      <div
        className={`
        absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap
        text-sm font-semibold tracking-wider text-white text-center w-full
        transition-all duration-300
        ${isExpanded ? "scale-125" : ""}
      `}
      >
        <span className="block w-full text-center">{item.title}</span>
      </div>

      {isExpanded && (
        <ExpandedCard
          item={item}
          features={features}
          timelineData={timelineData}
          onRelatedClick={onRelatedClick}
        />
      )}
    </div>
  );
}
