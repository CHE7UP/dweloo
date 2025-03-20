'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FormData, QuoteState } from './types';

interface InstantQuoteCalculatorProps {
  formData: FormData;
  onQuoteCalculated?: (total: number) => void;
}

const InstantQuotePaintingCalculator: React.FC<InstantQuoteCalculatorProps> = ({ formData, onQuoteCalculated }) => {
  const [quote, setQuote] = useState<QuoteState>({
    subtotal: 0,
    materials: 0,
    labor: 0,
    preparation: 0,
    removal: 0,
    total: 0
  });
  
  const [showDetails, setShowDetails] = useState(false);

  // Memoize the calculate quote function to avoid dependencies issues
  const calculateQuote = useCallback(() => {
    // Initialize calculation variables
    let materialsCost = 0;
    let laborCost = 0;
    let preparationCost = 0;
    let removalCost = 0;

    // Get square footage from form data - force conversion to number
    const squareFeet = parseInt(String(formData.squareFeet || '0')) || 0;
    console.log("Square feet:", squareFeet);
    
    // Calculate base price based on painting type
    if (Array.isArray(formData.paintingType) && formData.paintingType.length > 0) {
      console.log("Painting types:", formData.paintingType);
      
      // Check if it's interior walls only or multiple types
      if (formData.paintingType.length === 1 && formData.paintingType[0] === 'Interior walls') {
        // Interior walls only: $4 per sqft
        materialsCost = squareFeet * 4;
        console.log("Interior walls only cost:", materialsCost);
      } else {
        // Multiple types (ceiling/outdoor): $5 per sqft
        materialsCost = squareFeet * 5;
        console.log("Multiple types cost:", materialsCost);
      }
      
      // Add additional costs for specific painting types
      if (formData.paintingType.includes('Trim/doors/windows')) {
        laborCost += 350; // Extra for trim/windows
      }
    }

    // Add $50 for each room - force conversion to number
    const roomCount = parseInt(String(formData.roomCount || '0')) || 0;
    laborCost += roomCount * 50;
    console.log("Room cost for", roomCount, "rooms:", roomCount * 50);

    // Add cost for high or difficult areas
    if (formData.highAreas === 'Yes') {
      laborCost += 250; // Extra for high difficulty reach areas
      console.log("Added high areas cost: 250");
    }

    // Add cost for furniture moving
    if (formData.furnitureMoving === 'Yes') {
      laborCost += 150; // Extra for moving furniture, sofas
      console.log("Added furniture moving cost: 150");
    }

    // Add cost for preparation
    if (formData.preparationNeeded === 'Yes') {
      preparationCost = 300; // Extra for preparation of the space
      console.log("Added preparation cost: 300");
    }

    // Calculate totals
    const subtotal = materialsCost + laborCost;
    const total = subtotal + preparationCost + removalCost;
    
    console.log("Final calculation:", {
      subtotal,
      materials: materialsCost,
      labor: laborCost,
      preparation: preparationCost,
      removal: removalCost,
      total
    });

    // Update quote state
    setQuote({
      subtotal,
      materials: materialsCost,
      labor: laborCost,
      preparation: preparationCost,
      removal: removalCost,
      total
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
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Return early with minimal display if no square footage entered yet
  if (!formData.squareFeet) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mt-4 border-l-4 border-[#1976D2]">
        <h3 className="text-lg font-semibold text-gray-800">Instant Quote</h3>
        <p className="text-gray-600">Enter your project details to see your instant quote.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 border-l-4 border-[#1976D2]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Instant Quote</h3>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-[#1976D2] hover:text-[#1565C0] text-sm font-medium"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Estimated Total:</span>
          <span className="text-2xl font-bold text-[#1976D2]">{formatCurrency(quote.total)}</span>
        </div>
        
        {showDetails && (
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Materials & Paint:</span>
              <span className="text-gray-800">{formatCurrency(quote.materials)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Labor & Additional Services:</span>
              <span className="text-gray-800">{formatCurrency(quote.labor)}</span>
            </div>
            {quote.preparation > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Space Preparation:</span>
                <span className="text-gray-800">{formatCurrency(quote.preparation)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
              <span className="text-gray-700 font-medium">Subtotal:</span>
              <span className="text-gray-800 font-medium">{formatCurrency(quote.subtotal)}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>This is an estimate based on the information provided. Your final quote may vary based on additional factors and on-site assessment. Continue filling out the form for a detailed quote.</p>
      </div>
    </div>
  );
};

export default InstantQuotePaintingCalculator;