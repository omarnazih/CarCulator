import { useState, useEffect } from "react";
import { GasStation, GasStationFormData } from "@/types/gas-station";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function useGasStations() {
    const [stations, setStations] = useState<GasStation[]>([]);

    // Form state
    const [formData, setFormData] = useState<GasStationFormData>({
        name: "",
        location: "",
        reliability: 3,
        status: "warning",
        issues: []
    });

    // Update station state
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateStationId, setUpdateStationId] = useState<string | null>(null);

    // Filtering and sorting state
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [minReliability, setMinReliability] = useState(1);
    const [sortBy, setSortBy] = useState("date_desc");

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        const { data, error } = await supabase
            .from('gas_stations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
            return;
        }

        setStations(data);
    };

    const addStation = async (stationData: GasStationFormData) => {
        const { error } = await supabase
            .from('gas_stations')
            .insert([{
                ...stationData,
                last_checked: new Date().toISOString()
            }]);

        if (error) {
            toast.error('Failed to add station');
            return false;
        }

        toast.success('Station added successfully');
        resetForm();
        fetchStations();
        return true;
    };

    const updateStation = async (id: string, stationData: GasStationFormData) => {
        const { error } = await supabase
            .from('gas_stations')
            .update({
                ...stationData,
                last_checked: new Date().toISOString()
            })
            .eq('id', id);

        if (error) {
            toast.error('Failed to update station');
            return false;
        }

        toast.success('Station updated successfully');
        return true;
    };

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!updateStationId) return;

        const success = await updateStation(updateStationId, formData);
        if (success) {
            closeUpdateDialog();
            fetchStations();
        }
    };

    const openUpdateDialog = (station: GasStation) => {
        setFormData({
            name: station.name,
            location: station.location,
            reliability: station.reliability,
            status: station.status,
            issues: [...station.issues]
        });
        setUpdateStationId(station.id);
        setIsUpdating(true);
    };

    const closeUpdateDialog = () => {
        setIsUpdating(false);
        setUpdateStationId(null);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            location: "",
            reliability: 3,
            status: "warning",
            issues: []
        });
    };

    const resetFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
        setMinReliability(1);
        setSortBy("date_desc");
    };

    // Filter and sort the stations
    const filteredStations = stations
        .filter(station => {
            // Apply search filter
            const matchesSearch = searchTerm === "" ||
                station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                station.issues.some(issue => issue.toLowerCase().includes(searchTerm.toLowerCase()));

            // Apply status filter
            const matchesStatus = statusFilter === "all" || station.status === statusFilter;

            // Apply reliability filter
            const matchesReliability = station.reliability >= minReliability;

            return matchesSearch && matchesStatus && matchesReliability;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name_asc":
                    return a.name.localeCompare(b.name);
                case "name_desc":
                    return b.name.localeCompare(a.name);
                case "reliability_desc":
                    return b.reliability - a.reliability;
                case "reliability_asc":
                    return a.reliability - b.reliability;
                case "date_desc":
                default:
                    return new Date(b.last_checked).getTime() - new Date(a.last_checked).getTime();
            }
        });

    return {
        stations,
        filteredStations,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        minReliability,
        setMinReliability,
        sortBy,
        setSortBy,
        resetFilters,
        addStation,
        updateStation,
        isUpdating,
        updateStationId,
        handleUpdateSubmit,
        openUpdateDialog,
        closeUpdateDialog,
        formData,
        setFormData,
        resetForm
    };
} 