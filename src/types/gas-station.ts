export type GasStationStatus = 'good' | 'bad' | 'warning';

export interface GasStation {
    id: string;
    name: string;
    location: string;
    reliability: number;
    last_checked: string;
    issues: string[];
    status: GasStationStatus;
    latitude?: number;
    longitude?: number;
    created_at?: string;
    updated_at?: string;
}

export interface GasStationFormData {
    name: string;
    location: string;
    reliability: number;
    status: GasStationStatus;
    issues: string[];
    latitude?: number;
    longitude?: number;
} 