import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  value: string;
  subtitle: string;
}

export function StatsCard({ icon: Icon, iconColor, title, value, subtitle }: StatsCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        <div>
          <h3 className="text-2xl font-semibold">{value}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
} 