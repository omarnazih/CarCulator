import { GasStation } from "@/types/gas-station";
import { Card } from "@/components/ui/card";
import { GasStationCard } from "./gas-station-card";

interface GasStationsListProps {
    stations: GasStation[];
    onUpdateStation: (station: GasStation) => void;
}

export function GasStationsList({ stations, onUpdateStation }: GasStationsListProps) {
    if (stations.length === 0) {
        return (
            <Card className="p-6 text-center text-muted-foreground">
                No gas stations found with the current filters
            </Card>
        );
    }

    return (
        <div className="grid gap-4">
            {stations.map((station) => (
                <GasStationCard
                    key={station.id}
                    station={station}
                    onUpdate={onUpdateStation}
                />
            ))}
        </div>
    );
} 