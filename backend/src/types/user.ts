export interface User {
    id: string;
    email: string;
    name: string | null;
    gender?: string | null;
    age?: number | null;
    dob?: Date | null;
    jobRole?: string | null;
    city?: string | null;
    workDuration?: string | null;
    distance?: number | null;
    jobType?: string | null;
    salary?: number | null;
    company?: string | null;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}

export interface UserIdentity {
    id: string;
    userId: string;
    provider: string;
    providerId: string;
    metadata: Record<string, any> | null;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}