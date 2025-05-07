"use client";

import { useState } from "react";
import { FuelTrackingForm } from "@/components/fuel-tracking/fuel-tracking-form";
import { FuelResults } from "@/components/fuel-tracking/fuel-results";
import { GasStationReliability } from "@/components/fuel-tracking/gas-station-reliability";
import * as z from "zod";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FuelTrackingPage() {
  const [consumption, setConsumption] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<any>(null);

  const handleSubmit = (consumption: number, values: z.infer<any>) => {
    setConsumption(consumption);
    setFormValues(values);
  };

  const handleReset = () => {
    setConsumption(null);
    setFormValues(null);
  };

  return (
    <>
      <PageHeader 
        title="Fuel Tracking"
        description="Track and analyze your fuel consumption"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              {consumption === null ? (
                <FuelTrackingForm onSubmit={handleSubmit} />
              ) : (
                <FuelResults
                  consumption={consumption}
                  distance={Number(formValues.secondKm) - Number(formValues.firstKm)}
                  liters={Number(formValues.litersFilled)}
                  onReset={handleReset}
                />
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Average Consumption</p>
                  <p className="text-2xl font-bold">7.2 L/100km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Distance</p>
                  <p className="text-2xl font-bold">1,234 km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Fuel Used</p>
                  <p className="text-2xl font-bold">89 L</p>
                </div>
              </div>
            </Card>

            <GasStationReliability />

            <Card className="p-6">
              <Tabs defaultValue="history">
                <TabsList className="w-full">
                  <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                  <TabsTrigger value="trends" className="flex-1">Trends</TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">No entries yet</p>
                  </div>
                </TabsContent>
                <TabsContent value="trends" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">No data available</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
