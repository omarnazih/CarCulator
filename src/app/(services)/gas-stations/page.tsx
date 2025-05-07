"use client";

import { useState, useEffect } from "react";
import { GasStation, GasStationFormData } from "@/types/gas-station";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";
import { Plus, MapPin, Star, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function GasStationsPage() {
    const [stations, setStations] = useState<GasStation[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState<GasStationFormData>({
        name: "",
        location: "",
        reliability: 3,
        status: "warning",
        issues: []
    });

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        const { data, error } = await supabase
            .from('gas_stations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Failed to fetch stations');
            return;
        }

        setStations(data || []);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase
            .from('gas_stations')
            .insert([{
                ...formData,
                last_checked: new Date().toISOString()
            }]);

        if (error) {
            toast.error('Failed to add station');
            return;
        }

        toast.success('Station added successfully');
        setIsAdding(false);
        setFormData({
            name: "",
            location: "",
            reliability: 3,
            status: "warning",
            issues: []
        });
        fetchStations();
    };

    return (
        <>
            <PageHeader
                title="Gas Stations"
                description="Manage and track gas station reliability"
            />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Gas Stations</h2>
                    <Button onClick={() => setIsAdding(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Station
                    </Button>
                </div>

                {isAdding && (
                    <Card className="p-6 mb-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Station Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="reliability">Reliability (1-5)</Label>
                                <Input
                                    id="reliability"
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={formData.reliability}
                                    onChange={(e) => setFormData({ ...formData, reliability: Number(e.target.value) })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value: GasStation['status']) => setFormData({ ...formData, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="good">Good</SelectItem>
                                        <SelectItem value="warning">Warning</SelectItem>
                                        <SelectItem value="bad">Bad</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="issues">Issues (one per line)</Label>
                                <Textarea
                                    id="issues"
                                    value={formData.issues.join('\n')}
                                    onChange={(e) => setFormData({ ...formData, issues: e.target.value.split('\n').filter(Boolean) })}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit">Save</Button>
                                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                <div className="grid gap-4">
                    {stations.map((station) => (
                        <Card key={station.id} className={`p-6 ${station.status === 'bad' ? 'border-red-200 bg-red-50' :
                            station.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                                'border-green-200 bg-green-50'
                            }`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">{station.name}</h3>
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
                                Last checked: {new Date(station.last_checked).toLocaleDateString()}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
} 