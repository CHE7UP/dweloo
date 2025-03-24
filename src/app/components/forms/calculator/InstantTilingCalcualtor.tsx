'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FormData, QuoteState } from './types';

interface InstantQuoteCalculatorProps {
  formData: FormData;
  onQuoteCalculated?: (total: number) => void;
  showQuote?: boolean; // Prop to control when to display the quote
}

const InstantQuoteTilesCalculator: React.FC<InstantQuoteCalculatorProps> = ({ 
  formData, 
  onQuoteCalculated,
  showQuote = false // Default to not showing the quote
}) => {
  const [quote, setQuote] = useState<QuoteState>({
    subtotal: 400,
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
    const preparationCost = 0;
    let removalCost = 0;

    // Every project starts with $400 base price
    const baseCost = 400;
    // Get square footage from form data - force conversion to number
    const squareFeet = parseInt(String(formData.squareFeet || '0')) || 0;
    
    // Base price per square foot is $10
    let squareFootCost = squareFeet * 15;
    
    // Apply complexity factor based on project type
    let complexityFactor = 1.0;
    
    if (Array.isArray(formData.projectType)) {
      if (formData.projectType.length > 1) {
        complexityFactor = 1.1; // If more than 1 project type selected
      }
      
      // If project includes bathtub/shower enclosure/other, apply 1.3 complexity factor
      if (formData.projectType.includes('Bathtub surround') || 
          formData.projectType.includes('Shower enclosure') || 
          formData.projectType.includes('Other')) {
        complexityFactor = 1.3;
      }
    }
    
    // Apply complexity factor to square foot cost
    squareFootCost *= complexityFactor;
    
    // Add costs for current surface type
    if (Array.isArray(formData.currentSurface)) {
      if (formData.currentSurface.includes('Existing tile') || 
          formData.currentSurface.includes('Hardwood') || 
          formData.currentSurface.includes('Vinyl/linoleum') || 
          formData.currentSurface.includes('Other')) {
        squareFootCost += squareFeet * 2; // $2 per sqft extra for these surfaces
      }
    }
    
    // Add costs for premium tile types
    if (Array.isArray(formData.tileType)) {
      if (formData.tileType.includes('Natural stone (marble, granite, etc.)') || 
          formData.tileType.includes('Meplex')) {
        squareFootCost += squareFeet * 5; // $5 per sqft extra for premium tiles
      }
    }
    
    // Add costs for special features
    if (Array.isArray(formData.specialFeatures)) {
      if (formData.specialFeatures.includes('Heated flooring')) {
        squareFootCost += squareFeet * 4; // $4 per sqft extra for heated flooring
      }
    }
    
    // Add costs for hauling if required
    if (formData.demolition === 'Yes') {
      removalCost = squareFeet * 2; // $2 per sqft for hauling/removal
    }
    
    // Split total cost between materials and labor (50/50 split)
    materialsCost = squareFootCost * 0.5;
    laborCost = squareFootCost * 0.5;
    
    // Calculate totals
    const subtotal = baseCost + materialsCost + laborCost;
    const total = Math.round(subtotal + preparationCost + removalCost);
    const totalMax = Math.round(total * 1.2); // 20% buffer for maximum estimate
    
    // Update quote state
    setQuote({
      subtotal,
      materials: Math.round(materialsCost),
      labor: Math.round(laborCost),
      preparation: Math.round(preparationCost),
      removal: Math.round(removalCost),
      total,
      totalMax
    });
  }, [formData]);

  // Calculate the quote whenever formData changes
  useEffect(() => {
    if (formData) {
      calculateQuote();
    }
    // display quote even if formData is not available
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

export default InstantQuoteTilesCalculator;