
import React from 'react';
import { Card } from "@/components/ui/card";
import { PhoneOff, PhoneOutgoing } from 'lucide-react';

export function LineStatusCard() {
  return (
    <Card className="p-6 shadow-sm w-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <PhoneOutgoing className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Ativas</p>
              <p className="text-lg font-bold">1</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="bg-red-500 p-2 rounded-lg">
              <PhoneOff className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Inativas</p>
              <p className="text-lg font-bold">0</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
