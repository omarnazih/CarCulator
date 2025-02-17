import { Card } from "@/components/ui/card";
import { CarIcon } from "lucide-react";

interface VehicleCardProps {
  model: string;
  year: string;
  plate: string;
}

export function VehicleCard({ model, year, plate }: VehicleCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <CarIcon className="w-10 h-10 text-muted-foreground" />
        <div>
          <h2 className="font-medium">{model}</h2>
          <p className="text-sm text-muted-foreground">{year} • {plate}</p>
        </div>
      </div>
    </Card>
  );
} 