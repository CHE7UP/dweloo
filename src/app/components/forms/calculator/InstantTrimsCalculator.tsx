'use client';

import React, { useState, useEffect, useCallback } from 'react';

// Define proper TypeScript interfaces
interface QuoteState {
  subtotal: number;
  materials: number;
  labor: number;
  removal: number;
  total: number;
}

interface FormData {
  trimType?: string | string[]; // Accept both string and string[] to handle both radio and checkbox
  linearFeet?: string;
  roomCount?: string;
  removalNeeded?: string;
  hasMiters?: string;
  cornerCount?: string;
  hasStairs?: string;
  stairCount?: string;
  trimMaterial?: string;
  trimFinish?: string;
  wallType?: string;
  [key: string]: unknown; // For other possible form fields
}

interface TrimsQuoteCalculatorProps {
  formData: FormData;
  onQuoteCalculated?: (total: number) => void;
  showQuote?: boolean;
}

const TrimsQuoteCalculator: React.FC<TrimsQuoteCalculatorProps> = ({
  formData,
  onQuoteCalculated,
  showQuote = false
}) => {
  const [quote, setQuote] = useState<QuoteState>({
    subtotal: 0,
    materials: 0,
    labor: 0,
    removal: 0,
    total: 0
  });

// Memoize the calculate quote function to avoid dependencies issues
const calculateQuote = useCallback(() => {
  // Initialize calculation variables
  let materialsCost = 0;
  let laborCost = 0;
  let removalCost = 0;

  // Get linear footage from form data
  const linearFeet = parseInt(formData.linearFeet || '0') || 0;
  
  // Start with base labor cost regardless of options
  laborCost = 350; // Set base labor cost
  
  // Calculate materials cost based on trim type even if material not yet selected
  if (formData.trimType) {
    // Base rates for different trim types per linear foot
    const trimTypeRates: Record<string, number> = {
      'Baseboards': 2.5,
      'Crown Molding': 3.5,
      'Door Casing': 3,
      'Window Casing': 3,
      'Chair Rail': 2.75,
      'Wainscoting': 8,
    };
    
    // Get the base rate for the selected trim type(s)
    let baseRate = 0;
    const trimType = formData.trimType;
    
    if (Array.isArray(trimType)) {
      // If multiple trim types are selected, calculate total for all types
      trimType.forEach(type => {
        if (type in trimTypeRates) {
          baseRate += trimTypeRates[type];
        }
      });
    } else if (typeof trimType === 'string' && trimType in trimTypeRates) {
      baseRate = trimTypeRates[trimType];
    }
    
    // Start with initial material cost estimate even without material selection
    materialsCost = linearFeet * baseRate;
    
    // Apply material multiplier if available
    if (formData.trimMaterial) {
      const materialMultipliers: Record<string, number> = {
        'MDF (Medium Density Fiberboard)': 1,
        'Pine': 1.25,
        'Oak': 1.8,
        'Poplar': 1.5,
        'PVC/Vinyl': 1.4,
        'Other': 1.5
      };
      
      //apply painting or staining costs
      // id: 'trimFinish',
      // question: 'Do you need the trim to be painted or stained?',
      // type: 'radio',
      // options: [
      //   'Pre-finished trim only (no painting needed)',
      //   'Installation only (I will paint/stain myself)',
      //   'Installation and painting',
      //   'Installation and staining'

      if (formData.trimFinish) {
        const finishOptions: Record<string, number> = {
          'Pre-finished trim only (no painting needed)': 0,
          'Installation only (I will paint/stain myself)': 0,
          'Installation and painting': 1.5,
          'Installation and staining': 2.5
        };
        
        const finish = formData.trimFinish as string;
        if (finish in finishOptions) {
          laborCost += linearFeet * finishOptions[finish];
        }
      }
      
  // Add cost for trim removal
if (formData.removalNeeded === 'Yes') {
  const linearFeet = parseInt(formData.linearFeet || '0') || 0;
  removalCost = (linearFeet * 1.5) + 75; // $1.50 per linear foot plus $75 base fee
}



      const material = formData.trimMaterial as string;
      const multiplier = material in materialMultipliers ? materialMultipliers[material] : 1;
      
      // Update materials cost with multiplier
      materialsCost = linearFeet * baseRate * multiplier;
    }
  }

  // Rest of your calculation logic remains the same...
  
  // Calculate totals - don't reset the labor cost, add to it
  const subtotal = materialsCost + laborCost;
  const total = subtotal + removalCost;

  // Update quote state
  setQuote({
    subtotal,
    materials: materialsCost,
    labor: laborCost,
    removal: removalCost,
    total
  });
}, [formData]);

  // Calculate the quote whenever formData changes
  useEffect(() => {
    calculateQuote();
  }, [calculateQuote]);

  // Call onQuoteCalculated whenever quote changes
  useEffect(() => {
    if (onQuoteCalculated && quote.total) {
      onQuoteCalculated(quote.total);
    }
  }, [quote, onQuoteCalculated]);

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };


  // If showQuote is false, don't render anything
  if (!showQuote) {
    return null;
  }

  return (
    <div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Estimated Total:</span>
          <span className="text-2xl font-bold text-[#1976D2]">{formatCurrency(quote.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default TrimsQuoteCalculator;