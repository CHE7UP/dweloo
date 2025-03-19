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
  flooringType?: string[];
  squareFeet?: string;
  roomCount?: string;
  toiletRemoval?: string;
  toiletCount?: string;
  removalNeeded?: string;
  hasStairs?: string;
  stairCount?: string;
  [key: string]: unknown; // For other possible form fields
}

interface InstantQuoteCalculatorProps {
  formData: FormData;
  onQuoteCalculated?: (total: number) => void;
}

const InstantQuoteCalculator: React.FC<InstantQuoteCalculatorProps> = ({ formData, onQuoteCalculated }) => {
  const [quote, setQuote] = useState<QuoteState>({
    subtotal: 0,
    materials: 0,
    labor: 0,
    removal: 0,
    total: 0
  });
  
  const [showDetails, setShowDetails] = useState(false);

  // Memoize the calculate quote function to avoid dependencies issues
  const calculateQuote = useCallback(() => {
    // Initialize calculation variables
    let materialsCost = 0;
    let laborCost = 0;
    let removalCost = 0;

    // Get square footage from form data
    const squareFeet = parseInt(formData.squareFeet || '0') || 0;
    
    // Calculate materials cost based on flooring type
    if (Array.isArray(formData.flooringType) && formData.flooringType.length > 0) {
      // If multiple flooring types are selected, use the most expensive one
      const rates: Record<string, number> = {
        'Hardwood': 8,
        'Carpet': 4,
        'Laminate': 5,
        'Engineered Wood': 5,
        'Luxury Vinyl Plank/Tile': 5
      };
      
      const selectedRate = Math.max(
        ...formData.flooringType.map(type => (type in rates) ? rates[type] : 0)
      );
      
      materialsCost = squareFeet * selectedRate;
    }

    // Add cost for each room
    const roomCount = parseInt(formData.roomCount || '0') || 0;
    laborCost += roomCount * 100;

    // Add cost for toilet removal
    if (formData.toiletRemoval === 'Yes') {
      const toiletCount = parseInt(formData.toiletCount || '0') || 0;
      laborCost += toiletCount * 150;
    }

    // Add cost for flooring removal
    if (formData.removalNeeded === 'Yes') {
      removalCost = (squareFeet * 2) + 200;
    }

    // Add cost for stairs
    if (formData.hasStairs === 'Yes') {
      const stairCount = parseInt(formData.stairCount || '0') || 0;
      laborCost += stairCount * 125; // Assuming $25 per stair
    }

    // Calculate totals
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
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Return early with minimal display if no square footage entered yet
  if (!formData.squareFeet) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mt-4 border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-800">Instant Quote</h3>
        <p className="text-gray-600">Enter your project details to see your instant quote.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Instant Quote</h3>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Estimated Total:</span>
          <span className="text-2xl font-bold text-blue-700">{formatCurrency(quote.total)}</span>
        </div>
        
        {showDetails && (
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Materials:</span>
              <span className="text-gray-800">{formatCurrency(quote.materials)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Labor:</span>
              <span className="text-gray-800">{formatCurrency(quote.labor)}</span>
            </div>
            {quote.removal > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Removal & Hauling:</span>
                <span className="text-gray-800">{formatCurrency(quote.removal)}</span>
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
        <p>This is an estimate based on the information provided. Your final quote may vary based on additional factors. Continue filling out the form for a detailed quote.</p>
      </div>
    </div>
  );
};

export default InstantQuoteCalculator;