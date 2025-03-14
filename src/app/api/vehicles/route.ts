import { NextRequest, NextResponse } from 'next/server';
import { vehicleSchema, createVehicleSchema } from '@/lib/schemas/vehicle.schema';

/**
 * GET /api/vehicles
 * Fetch all vehicles with optional filtering
 */
export async function GET(request: NextRequest) {
    try {
        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        // Example: In a real app, you would fetch from a database
        const vehicles = [
            {
                id: '123e4567-e89b-12d3-a456-426614174000',
                make: 'Toyota',
                model: 'Camry',
                year: 2020,
                licensePlate: 'ABC123',
                fuelType: 'gasoline',
                ownerId: '123e4567-e89b-12d3-a456-426614174001',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        // Return paginated response
        return NextResponse.json({
            data: vehicles,
            meta: {
                currentPage: page,
                totalPages: 1,
                pageSize: limit,
                totalCount: vehicles.length,
            }
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch vehicles' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/vehicles
 * Create a new vehicle
 */
export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate with Zod
        const result = createVehicleSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.format() },
                { status: 400 }
            );
        }

        // Example: In a real app, you would save to a database
        const newVehicle = {
            ...result.data,
            id: '123e4567-e89b-12d3-a456-426614174002',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return NextResponse.json(
            { data: newVehicle },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating vehicle:', error);
        return NextResponse.json(
            { error: 'Failed to create vehicle' },
            { status: 500 }
        );
    }
} 