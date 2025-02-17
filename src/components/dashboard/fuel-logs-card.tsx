import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TimerIcon } from "lucide-react";

interface FuelLog {
  liters: number;
  cost: number;
  date: string;
  consumption: string;
}

export function FuelLogsCard() {
  const logs: FuelLog[] = [
    { liters: 45.2, cost: 67.80, date: "Yesterday", consumption: "7.1 L/100km" },
    { liters: 42.8, cost: 64.20, date: "3 days ago", consumption: "7.3 L/100km" },
  ];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Recent Fuel Logs</h2>
        <Button variant="link" className="text-sm">View All</Button>
      </div>
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.date} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TimerIcon className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">{log.liters} L • ${log.cost.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{log.date} • {log.consumption}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">→</Button>
          </div>
        ))}
      </div>
    </Card>
  );
} 