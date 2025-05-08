"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { GasStationsList } from "./components/gas-stations-list";
import { GasStationForm } from "./components/gas-station-form";
import { FilterControls } from "./components/filter-controls";
import { useGasStations } from "./hooks/use-gas-stations";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function GasStationsPage() {
    const [isAdding, setIsAdding] = useState(false);

    const {
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
    } = useGasStations();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addStation(formData);
        setIsAdding(false);
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
                        <GasStationForm
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleSubmit}
                            onCancel={() => setIsAdding(false)}
                        />
                    </Card>
                )}

                <FilterControls
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    minReliability={minReliability}
                    setMinReliability={setMinReliability}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    resetFilters={resetFilters}
                />

                <GasStationsList
                    stations={filteredStations}
                    onUpdateStation={openUpdateDialog}
                />
            </div>

            <GasStationForm
                isDialog
                isOpen={isUpdating}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleUpdateSubmit}
                onCancel={closeUpdateDialog}
                isUpdate={true}
            />
        </>
    );
} 