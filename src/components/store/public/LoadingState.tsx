import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardContent className="py-8">
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}