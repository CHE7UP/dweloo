// types/index.ts
export interface WarrantyClaim {
    id?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    invoiceNumber: string;
    serviceDate: string;
    description: string;
    damagePhotoUrl?: string;
    status: 'pending' | 'in-review' | 'approved' | 'declined';
    createdAt?: unknown;
    updatedAt?: unknown;
  }
  
  export interface FormState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
    documentId: string | null;
  }