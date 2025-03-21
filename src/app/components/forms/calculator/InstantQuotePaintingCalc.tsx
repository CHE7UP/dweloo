'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FormData, QuoteState } from './types';

interface InstantQuoteCalculatorProps {
  formData: FormData;
  onQuoteCalculated?: (total: number) => void;
  showQuote?: boolean; // New prop to control when to display the quote
}

const InstantQuotePaintingCalculator: React.FC<InstantQuoteCalculatorProps> = ({ 
  formData, 
  onQuoteCalculated,
  showQuote = false // Default to not showing the quote
}) => {
  const [quote, setQuote] = useState<QuoteState>({
    subtotal: 0,
    materials: 0,
    labor: 0,
    preparation: 0,
    removal: 0,
    total: 0,
    totalMax: 0
  });

  // Memoize the calculate quote function to avoid dependencies issues
  const calculateQuote = useCallback(() => {
    // Initialize calculation variables
    let materialsCost = 0;
    let laborCost = 0;
    let preparationCost = 0;
    let removalCost = 0;

    // Get square footage from form data - force conversion to number
    const squareFeet = parseInt(String(formData.squareFeet || '0')) || 0;
    
    // Calculate base price based on painting type
    if (Array.isArray(formData.paintingType) && formData.paintingType.length > 0) {
      
      // Check if it's interior walls only or multiple types
      if (formData.paintingType.length === 1 && formData.paintingType[0] === 'Interior walls') {
        // Interior walls only: $4 per sqft
        materialsCost = squareFeet * 4;
      } else {
        // Multiple types (ceiling/outdoor): $5 per sqft
        materialsCost = squareFeet * 5;
      }
      
      // Add additional costs for specific painting types
      if (formData.paintingType.includes('Trim/doors/windows')) {
        laborCost += 350; // Extra for trim/windows
      }
    }

    // Add $50 for each room - force conversion to number
    const roomCount = parseInt(String(formData.roomCount || '0')) || 0;
    laborCost += roomCount * 50;

    // Add cost for high or difficult areas
    if (formData.highAreas === 'Yes') {
      laborCost += 250; // Extra for high difficulty reach areas
    }

    // Add cost for furniture moving
    if (formData.furnitureMoving === 'Yes') {
      laborCost += 150; // Extra for moving furniture, sofas
    }

    // Add cost for preparation
    if (formData.preparationNeeded === 'Yes') {
      preparationCost = 300; // Extra for preparation of the space
    }

    //add cost for removal
    if (formData.removal === 'Yes') {
      removalCost = 150; // Extra for removal and hauling
    }

    // Calculate totals
    const subtotal = materialsCost + laborCost;
    const total = subtotal + preparationCost + removalCost;
    const totalMax = Math.round(total + total/5);
    
    // Update quote state
    setQuote({
      subtotal,
      materials: materialsCost,
      labor: laborCost,
      preparation: preparationCost,
      removal: removalCost,
      total,
      totalMax
    });
  }, [formData]);

  // Calculate the quote whenever formData changes
  useEffect(() => {
    if (formData) {
      calculateQuote();
    }
  }, [calculateQuote, formData]);

  // Call onQuoteCalculated whenever quote changes
  useEffect(() => {
    if (onQuoteCalculated && quote.total > 0) {
      onQuoteCalculated(quote.total);
    }
  }, [quote, onQuoteCalculated]);

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
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
          <span className="text-l font-bold text-[#1976D2]">{formatCurrency(quote.total)} - {formatCurrency(quote.totalMax)}</span>
        </div>
      </div>
    </div>
  );
};

export default InstantQuotePaintingCalculator;