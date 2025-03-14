"use client";

import { useState } from "react";
import { FuelTrackingForm } from "@/components/fuel-tracking/fuel-tracking-form";
import { FuelResults } from "@/components/fuel-tracking/fuel-results";
import * as z from "zod";
import { PageHeader } from "@/components/page-header";

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
      <div className="min-h-screen flex items-start justify-center p-4 pt-16">
        <div className="w-full max-w-2xl">
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
        </div>
      </div>
    </>
  );
}
