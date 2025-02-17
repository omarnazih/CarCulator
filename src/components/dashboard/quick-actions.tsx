import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BellIcon, PlusIcon, TimerIcon, WrenchIcon } from "lucide-react";

export function QuickActions() {
  const actions = [
    { icon: PlusIcon, label: "Add Vehicle" },
    { icon: TimerIcon, label: "Log Fuel" },
    { icon: WrenchIcon, label: "Add Service" },
    { icon: BellIcon, label: "Set Reminder" },
  ];

  return (
    <Card className="p-4">
      <h2 className="font-medium mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map(({ icon: Icon, label }) => (
          <Button key={label} variant="outline" className="h-24 flex flex-col gap-2">
            <Icon className="w-6 h-6" />
            {label}
          </Button>
        ))}
      </div>
    </Card>
  );
} 