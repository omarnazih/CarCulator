import { NextRequest, NextResponse } from 'next/server';
import { updateVehicleSchema } from '@/lib/schemas/vehicle.schema';

interface RouteParams {
    params: {
        id: string;
    };
}

/**
 * GET /api/vehicles/[id]
 * Fetch a single vehicle by ID
 */
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = params;

        // Example: In a real app, you would fetch from a database
        // This is just a mock example
        const vehicle = {
            id,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            licensePlate: 'ABC123',
            fuelType: 'gasoline',
            ownerId: '123e4567-e89b-12d3-a456-426614174001',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Check if vehicle exists
        if (!vehicle) {
            return NextResponse.json(
                { error: 'Vehicle not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: vehicle });
    } catch (error) {
        console.error(`Error fetching vehicle ${params.id}:`, error);
        return NextResponse.json(
            { error: 'Failed to fetch vehicle' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/vehicles/[id]
 * Update a vehicle
 */
export async function PUT(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = params;
        const body = await request.json();

        // Validate with Zod
        const result = updateVehicleSchema.safeParse({ ...body, id });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.format() },
                { status: 400 }
            );
        }

        // Example: In a real app, you would update in a database
        // This is just a mock example
        const updatedVehicle = {
            ...result.data,
            updatedAt: new Date(),
        };

        return NextResponse.json({ data: updatedVehicle });
    } catch (error) {
        console.error(`Error updating vehicle ${params.id}:`, error);
        return NextResponse.json(
            { error: 'Failed to update vehicle' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/vehicles/[id]
 * Delete a vehicle
 */
export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = params;

        // Example: In a real app, you would delete from a database
        // This is just a mock example

        return NextResponse.json(
            { data: { success: true } },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Error deleting vehicle ${params.id}:`, error);
        return NextResponse.json(
            { error: 'Failed to delete vehicle' },
            { status: 500 }
        );
    }
} 