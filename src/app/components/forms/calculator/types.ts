// types.ts

// Form data interface
export interface FormData {
    [key: string]: unknown;
    flooringType?: string[];
    squareFeet?: string;
    roomCount?: string;
    toiletRemoval?: string;
    toiletCount?: string;
    removalNeeded?: string;
    hasStairs?: string;
    stairCount?: string;
    existingFlooringType?: string;
    timeline?: string;
    motivation?: string;
    decisionStage?: string;
    specialConsiderations?: string[];
    referralSource?: string;
    zipCode?: string;
    contactTime?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    additionalComments?: string;
  }
  
  // Question interface
  export interface Question {
    id: string;
    question: string;
    type: 'checkbox' | 'radio' | 'text' | 'number' | 'email' | 'tel' | 'textarea';
    options?: string[];
    isRequired: boolean;
    dependsOn?: {
      id: string;
      value: string;
    };
    pattern?: string;
    label?: string;
    min?: number;
    max?: number;
  }
  
  // Quote state interface
  export interface QuoteState {
    subtotal: number;
    materials: number;
    labor: number;
    removal: number;
    total: number;
  }
  
  // InstantQuoteCalculator props
  export interface InstantQuoteCalculatorProps {
    formData: FormData;
    onQuoteCalculated?: (total: number) => void;
  }
  
  // Firestore hook result interface
  export interface FirestoreHookResult {
    addDocument: (data: unknown) => Promise<void>;
    error: string | null;
    success: boolean;
  }

  