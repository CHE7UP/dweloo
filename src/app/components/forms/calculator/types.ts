// types.ts - Consolidated version
export interface FormData {
  // Painting specific fields
  paintingType?: string[];
  highAreas?: string;
  highAreaDetails?: string;
  furnitureMoving?: string;
  furnitureCount?: string;
  preparationNeeded?: string;
  surfaceCondition?: string[];
  surfaceConditionOther?: string;
  removal?: string; // From calculator component

  // Flooring specific fields
  flooringType?: string[];
  toiletRemoval?: string;
  toiletCount?: string;
  removalNeeded?: string;
  hasStairs?: string;
  stairCount?: string;
  existingFlooringType?: string;

  // Common fields
  squareFeet?: string;
  roomCount?: string;
  timeline?: string;
  motivation?: string;
  decisionStage?: string;
  specialConsiderations?: string[];
  referralSource?: string;
  zipCode?: string;
  contactTime?: string;
  firstName?: string;
  lastName?: string;
  FullName?: string;  // From form data
  phone?: string;
  email?: string;
  additionalComments?: string;
  
  // Allow for additional dynamic properties
  [key: string]: unknown;
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
    value: string | string[];  // Allow both string and string[] for flexibility
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
  preparation: number;
  removal: number;  // Make sure this exists for the calculator
  total: number;
  totalMax: number;
}

// InstantQuoteCalculator props
export interface InstantQuoteCalculatorProps {
  formData: FormData;
  onQuoteCalculated?: (total: number) => void;
  showQuote?: boolean;  // Add our new prop from the calculator update
}

// Firestore hook result interface
export interface FirestoreHookResult {
  addDocument: (data: unknown) => Promise<void>;  // Use unknown instead of any
  error: string | null;
  success: boolean;
}