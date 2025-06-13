
export interface TimelineItem {
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

export interface Position {
  x: number;
  y: number;
  angle: number;
  zIndex: number;
  opacity: number;
}
