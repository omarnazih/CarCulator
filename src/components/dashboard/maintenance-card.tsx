import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WrenchIcon } from "lucide-react";

interface MaintenanceItem {
  title: string;
  dueIn: string;
  iconColor: string;
  bgColor: string;
}

export function MaintenanceCard() {
  const items: MaintenanceItem[] = [
    { title: "Oil Change", dueIn: "2,000 km", iconColor: "text-orange-500", bgColor: "bg-orange-100" },
    { title: "Tire Rotation", dueIn: "5,000 km", iconColor: "text-purple-500", bgColor: "bg-purple-100" },
  ];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Upcoming Maintenance</h2>
        <Button variant="link" className="text-sm">View All</Button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.title} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={`p-2 ${item.bgColor} rounded-lg`}>
                <WrenchIcon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">Due in {item.dueIn}</p>
              </div>
            </div>
            <Button>Schedule</Button>
          </div>
        ))}
      </div>
    </Card>
  );
} 