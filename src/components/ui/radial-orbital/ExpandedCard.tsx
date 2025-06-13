
import React from "react";
import { ArrowRight, Zap, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimelineItem } from "./types";

interface ExpandedCardProps {
  item: TimelineItem;
  features: string[];
  timelineData: TimelineItem[];
  onRelatedClick: (relatedId: number) => void;
}

export function ExpandedCard({ item, features, timelineData, onRelatedClick }: ExpandedCardProps) {
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

  return (
    <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 h-[420px] bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <Badge
            className={`px-2 text-xs ${getStatusStyles(item.status)}`}
          >
            {item.status === "completed"
              ? "COMPLETE"
              : item.status === "in-progress"
              ? "IN PROGRESS"
              : "PENDING"}
          </Badge>
          <span className="text-xs font-mono text-white/50">
            {item.date}
          </span>
        </div>
        <CardTitle className="text-base mt-2 text-center w-full">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-white/80 h-full text-left">
        {/* Features com ícones de check alinhados à esquerda */}
        <div className="space-y-2 mb-4 text-left">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 text-left">
              <Check size={12} className="text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-left leading-relaxed">{feature.trim()}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-left">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="flex items-center">
              <Zap size={12} className="mr-1" />
              Energy Level
            </span>
            <span className="font-mono">{item.energy}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${item.energy}%` }}
            ></div>
          </div>
        </div>

        {item.relatedIds.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10 text-left">
            <div className="flex flex-wrap gap-2 justify-start">
              {item.relatedIds.map((relatedId) => {
                const relatedItem = timelineData.find(
                  (i) => i.id === relatedId
                );
                return (
                  <Button
                    key={relatedId}
                    variant="outline"
                    size="sm"
                    className="flex items-center h-7 px-3 py-0 text-sm rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRelatedClick(relatedId);
                    }}
                  >
                    {relatedItem?.title}
                    <ArrowRight
                      size={10}
                      className="ml-1 text-white/60"
                    />
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
