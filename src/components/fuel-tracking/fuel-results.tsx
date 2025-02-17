import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Fuel, Route } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FuelResultsProps {
  consumption: number;
  distance: number;
  liters: number;
  onReset: () => void;
}

export function FuelResults({ consumption, distance, liters, onReset }: FuelResultsProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Fuel Consumption Results
        </h2>
        <p className="text-sm text-muted-foreground">
          Analysis of your recent fuel tracking entry
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Route className="h-5 w-5 text-green-500" />
            <div className="text-sm text-muted-foreground">Distance Traveled</div>
          </div>
          <div className="text-2xl font-bold">
            {distance.toFixed(2)} km
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Fuel className="h-5 w-5 text-green-500" />
            <div className="text-sm text-muted-foreground">Fuel Used</div>
          </div>
          <div className="text-2xl font-bold">
            {liters} L
          </div>
        </Card>
      </div>

      <Separator className="mb-6" />
      
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-md font-bold">Average Consumption</div>
            <div className="text-xs text-muted-foreground">Liters per 100 kilometers</div>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {consumption.toFixed(1)} <span className="text-sm text-muted-foreground font-normal">L/100km</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg mb-6">
        <div className="h-4 w-4 text-blue-600 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-xs font-bold">i</span>
        </div>
        <span className="text-sm text-blue-600">
          Your consumption is 0.3 L/100km lower than your previous average.
        </span>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1" variant="outline">
          View Detailed Report
        </Button>
        <Button 
          onClick={onReset} 
          className="flex-1"
        >
          Track New Entry
        </Button>
      </div>
    </Card>
  );
} 