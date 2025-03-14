import { z } from 'zod';

/**
 * Schema for vehicle data validation
 */
export const vehicleSchema = z.object({
    id: z.string().uuid().optional(),
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    licensePlate: z.string().min(1, "License plate is required"),
    fuelType: z.enum(["gasoline", "diesel", "electric", "hybrid"]),
    ownerId: z.string().uuid(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

/**
 * Type derived from the vehicle schema
 */
export type Vehicle = z.infer<typeof vehicleSchema>;

/**
 * Schema for vehicle creation (without ID)
 */
export const createVehicleSchema = vehicleSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;

/**
 * Schema for vehicle update (all fields optional except ID)
 */
export const updateVehicleSchema = vehicleSchema
    .omit({ id: true, createdAt: true, updatedAt: true })
    .partial()
    .extend({ id: z.string().uuid() });
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>; 