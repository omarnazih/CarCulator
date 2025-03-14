import {
    Vehicle,
    CreateVehicleInput,
    UpdateVehicleInput
} from '@/lib/schemas/vehicle.schema';
import { ApiResponse, PaginatedResponse, QueryParams } from '@/lib/types/api.types';

/**
 * Fetch all vehicles with optional filtering
 */
export async function getVehicles(params?: QueryParams): Promise<PaginatedResponse<Vehicle[]>> {
    try {
        const queryString = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
        const url = `/api/vehicles${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return {
            error: 'Failed to fetch vehicles',
            data: []
        };
    }
}

/**
 * Fetch a single vehicle by ID
 */
export async function getVehicle(id: string): Promise<ApiResponse<Vehicle>> {
    try {
        const response = await fetch(`/api/vehicles/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.error || 'Failed to fetch vehicle' };
        }

        return await response.json();
    } catch (error) {
        return { error: 'Failed to fetch vehicle' };
    }
}

/**
 * Create a new vehicle
 */
export async function createVehicle(vehicle: CreateVehicleInput): Promise<ApiResponse<Vehicle>> {
    try {
        const response = await fetch('/api/vehicles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicle),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.error || 'Failed to create vehicle' };
        }

        return await response.json();
    } catch (error) {
        return { error: 'Failed to create vehicle' };
    }
}

/**
 * Update an existing vehicle
 */
export async function updateVehicle(vehicle: UpdateVehicleInput): Promise<ApiResponse<Vehicle>> {
    try {
        const response = await fetch(`/api/vehicles/${vehicle.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicle),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.error || 'Failed to update vehicle' };
        }

        return await response.json();
    } catch (error) {
        return { error: 'Failed to update vehicle' };
    }
}

/**
 * Delete a vehicle
 */
export async function deleteVehicle(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
        const response = await fetch(`/api/vehicles/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.error || 'Failed to delete vehicle' };
        }

        return { data: { success: true } };
    } catch (error) {
        return { error: 'Failed to delete vehicle' };
    }
} 