import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, AlertTriangle, MapPin } from "lucide-react";

interface GasStation {
    id: string;
    name: string;
    location: string;
    reliability: number;
    lastChecked: string;
    issues: string[];
    status: 'good' | 'bad' | 'warning';
}

const mockStations: GasStation[] = [
    {
        id: "1",
        name: "Mobil - El-Wahat Road",
        location: "El-Wahat Road near El-Ferdous",
        reliability: 4.5,
        lastChecked: "2024-03-15",
        issues: [],
        status: 'good'
    },
    {
        id: "2",
        name: "Taqa (Energy)",
        location: "Multiple Locations",
        reliability: 4.2,
        lastChecked: "2024-03-15",
        issues: [],
        status: 'good'
    },
    {
        id: "3",
        name: "Emirates Egypt (Emarat Misr)",
        location: "Madinaty",
        reliability: 4.3,
        lastChecked: "2024-03-15",
        issues: [],
        status: 'good'
    },
    {
        id: "4",
        name: "Chill Out/Shell Out",
        location: "Al-Sukhna Road, Al-Mushir Road, Wahat Road",
        reliability: 1.5,
        lastChecked: "2024-03-15",
        issues: [
            "Car stalling issues",
            "Engine jumping problems",
            "Multiple breakdown reports after 5km"
        ],
        status: 'bad'
    },
    {
        id: "5",
        name: "Mobil - Problematic Locations",
        location: "El-Moqattam, October, Fred Semika Street, Salah Salem",
        reliability: 2.0,
        lastChecked: "2024-03-15",
        issues: [
            "Fuel pump failures",
            "Multiple fuel pump replacements reported"
        ],
        status: 'bad'
    },
    {
        id: "6",
        name: "Total",
        location: "Multiple Locations",
        reliability: 2.5,
        lastChecked: "2024-03-15",
        issues: [
            "Multiple complaints reported",
            "Quality consistency issues"
        ],
        status: 'warning'
    },
    {
        id: "7",
        name: "Misr Petroleum",
        location: "El-Tagamoa El-Khames",
        reliability: 2.0,
        lastChecked: "2024-03-15",
        issues: [
            "Specific location issues reported",
            "Quality concerns"
        ],
        status: 'bad'
    },
    {
        id: "8",
        name: "Kargas",
        location: "Multiple Locations",
        reliability: 2.5,
        lastChecked: "2024-03-15",
        issues: [
            "Engine jumping issues reported",
            "Performance problems after refueling"
        ],
        status: 'warning'
    }
];

export function GasStationReliability() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Gas Station Reliability</h3>
                <Badge variant="outline" className="flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Updated Daily
                </Badge>
            </div>

            <div className="space-y-4">
                {mockStations.map((station) => (
                    <div key={station.id} className={`border rounded-lg p-4 ${station.status === 'bad' ? 'border-red-200 bg-red-50' :
                        station.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                            'border-green-200 bg-green-50'
                        }`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium">{station.name}</h4>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <MapPin className="w-3 h-3" />
                                    {station.location}
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className={`w-4 h-4 ${station.reliability >= 4 ? 'fill-yellow-400 text-yellow-400' :
                                    station.reliability >= 3 ? 'fill-orange-400 text-orange-400' :
                                        'fill-red-400 text-red-400'
                                    }`} />
                                <span className="font-medium">{station.reliability}</span>
                            </div>
                        </div>

                        {station.issues.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm text-red-500">
                                    Known issues: {station.issues.join(", ")}
                                </p>
                            </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-2">
                            Last checked: {station.lastChecked}
                        </p>
                    </div>
                ))}
            </div>
        </Card>
    );
} 