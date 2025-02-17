"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Tesseract from "tesseract.js";

const formSchema = z.object({
  firstKm: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Must be a valid number",
  }),
  secondKm: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Must be a valid number",
  }),
  litersFilled: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Must be a valid number",
  }),
});

interface FuelTrackingFormProps {
  onSubmit: (consumption: number, values: z.infer<typeof formSchema>) => void;
}

export function FuelTrackingForm({ onSubmit }: FuelTrackingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstKm: "",
      secondKm: "",
      litersFilled: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const km1 = Number(values.firstKm);
    const km2 = Number(values.secondKm);
    const liters = Number(values.litersFilled);
    
    const distance = km2 - km1;
    const consumptionPer100 = (liters / distance) * 100;
    onSubmit(consumptionPer100, values);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "firstKm" | "secondKm"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await Tesseract.recognize(file, "eng");
      const text = result.data.text.trim().replace(/[^\d.]/g, "");
      form.setValue(field, text);
    } catch (error) {
      console.error("OCR Error:", error);
    }
  };

  return (
    <Card className="p-6 mb-4">
      <h1 className="text-2xl font-bold mb-6">Track Fuel Consumption</h1>
      <p className="text-muted-foreground mb-6">
        Enter your odometer readings and fuel details below
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="firstKm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Kilometer Count</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="Enter first kilometer reading" {...field} />
                  </FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    id="km1-camera"
                    onChange={(e) => handleImageUpload(e, "firstKm")}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("km1-camera")?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondKm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Second Kilometer Count</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="Enter second kilometer reading" {...field} />
                  </FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    id="km2-camera"
                    onChange={(e) => handleImageUpload(e, "secondKm")}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("km2-camera")?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="litersFilled"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liters of Gas Filled</FormLabel>
                <FormControl>
                  <Input placeholder="Enter liters filled" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Save Record
            </Button>
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
} 