import { useState, useCallback } from 'react';
import {
    getVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
} from '@/lib/api-client/vehicles';
import {
    Vehicle,
    CreateVehicleInput,
    UpdateVehicleInput
} from '@/lib/schemas/vehicle.schema';
import { QueryParams } from '@/lib/types/api.types';

/**
 * Custom hook for managing vehicles
 */
export function useVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch all vehicles
     */
    const fetchVehicles = useCallback(async (params?: QueryParams) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getVehicles(params);

            if (response.error) {
                setError(typeof response.error === 'string' ? response.error : 'Failed to fetch vehicles');
            } else if (response.data) {
                setVehicles(response.data);
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a single vehicle
     */
    const fetchVehicle = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getVehicle(id);

            if (response.error) {
                setError(typeof response.error === 'string' ? response.error : 'Failed to fetch vehicle');
            } else if (response.data) {
                setCurrentVehicle(response.data);
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Add a new vehicle
     */
    const addVehicle = useCallback(async (data: CreateVehicleInput) => {
        setLoading(true);
        setError(null);

        try {
            const response = await createVehicle(data);

            if (response.error) {
                setError(typeof response.error === 'string' ? response.error : 'Failed to create vehicle');
                return null;
            } else if (response.data) {
                setVehicles(prev => [...prev, response.data as Vehicle]);
                return response.data;
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }

        return null;
    }, []);

    /**
     * Update an existing vehicle
     */
    const editVehicle = useCallback(async (data: UpdateVehicleInput) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateVehicle(data);

            if (response.error) {
                setError(typeof response.error === 'string' ? response.error : 'Failed to update vehicle');
                return false;
            } else if (response.data) {
                setVehicles(prev =>
                    prev.map(vehicle =>
                        vehicle.id === data.id ? response.data as Vehicle : vehicle
                    )
                );

                if (currentVehicle?.id === data.id) {
                    setCurrentVehicle(response.data as Vehicle);
                }

                return true;
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }

        return false;
    }, [currentVehicle]);

    /**
     * Remove a vehicle
     */
    const removeVehicle = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await deleteVehicle(id);

            if (response.error) {
                setError(typeof response.error === 'string' ? response.error : 'Failed to delete vehicle');
                return false;
            } else {
                setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));

                if (currentVehicle?.id === id) {
                    setCurrentVehicle(null);
                }

                return true;
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }

        return false;
    }, [currentVehicle]);

    return {
        vehicles,
        currentVehicle,
        loading,
        error,
        fetchVehicles,
        fetchVehicle,
        addVehicle,
        editVehicle,
        removeVehicle,
    };
} 