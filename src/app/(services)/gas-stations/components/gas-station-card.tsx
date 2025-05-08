import { GasStation } from "@/types/gas-station";
import { Button } from "@/components/ui/button";
import { MapPin, Star, X, AlertTriangle, CheckCircle, AlertCircle, History } from "lucide-react";
import { getTimeAgo } from "../utils/date-utils";

interface GasStationCardProps {
    station: GasStation;
    onUpdate: (station: GasStation) => void;
}

export function GasStationCard({ station, onUpdate }: GasStationCardProps) {
    const statusConfig = {
        bad: {
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            textColor: "text-red-700",
            icon: <X className="h-4 w-4 text-red-500" />,
            label: "Bad"
        },
        warning: {
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            textColor: "text-yellow-700",
            icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
            label: "Warning"
        },
        good: {
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-700",
            icon: <CheckCircle className="h-4 w-4 text-green-500" />,
            label: "Good"
        }
    };

    const { bgColor, borderColor, textColor, icon, label } = statusConfig[station.status];

    // Generate reliability stars
    const reliabilityStars = renderReliabilityStars(station.reliability);

    const lastCheckedDate = new Date(station.last_checked);
    const formattedDate = lastCheckedDate.toLocaleDateString();
    const timeAgo = getTimeAgo(lastCheckedDate);

    return (
        <div className={`rounded-lg border ${borderColor} overflow-hidden`}>
            <div className={`px-6 py-4 ${bgColor}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-lg">{station.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            {station.location}
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-0.5">
                            {reliabilityStars}
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-medium ${textColor} px-2 py-1 rounded-full ${bgColor} border ${borderColor}`}>
                            {icon}
                            {label}
                        </div>
                    </div>
                </div>
            </div>

            {station.issues.length > 0 && (
                <div className="px-6 py-3 border-t border-dashed border-red-200 bg-red-50">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs font-medium text-red-700 mb-1">Known issues:</p>
                            <ul className="text-sm text-red-600 space-y-1 list-disc pl-4">
                                {station.issues.map((issue, index) => (
                                    <li key={index}>{issue}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="px-6 py-3 bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                        Last checked: <span title={formattedDate}>{timeAgo}</span>
                    </p>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onUpdate(station)}>
                        <History className="h-3 w-3 mr-1" />
                        Update status
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Utility function to render reliability stars
function renderReliabilityStars(reliability: number) {
    const reliabilityStars = [];
    const fullStars = Math.floor(reliability);
    const hasHalfStar = reliability % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            reliabilityStars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
        } else if (i === fullStars + 1 && hasHalfStar) {
            reliabilityStars.push(
                <div key={i} className="relative">
                    <Star className="h-4 w-4 text-gray-300" />
                    <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                </div>
            );
        } else {
            reliabilityStars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
        }
    }

    return reliabilityStars;
} 