"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Check, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}
interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}
export default function RadialOrbitalTimeline({
  timelineData
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };
  const toggleItem = (id: number) => {
    setExpandedItems(prev => {
      const newState = {
        ...prev
      };
      Object.keys(newState).forEach(key => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });
      newState[id] = !prev[id];
      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach(relId => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };
  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;
    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle(prev => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }
    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);
  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex(item => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = nodeIndex / totalNodes * 360;
    setRotationAngle(270 - targetAngle);
  };
  const calculateNodePosition = (index: number, total: number) => {
    const angle = (index / total * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = angle * Math.PI / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return {
      x,
      y,
      angle,
      zIndex,
      opacity
    };
  };
  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find(item => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };
  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };
  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  // Parse features from content
  const parseFeatures = (content: string): string[] => {
    const parts = content.split(" - ");
    if (parts.length > 1) {
      return parts[1].split(", ");
    }
    return [];
  };
  return;
}