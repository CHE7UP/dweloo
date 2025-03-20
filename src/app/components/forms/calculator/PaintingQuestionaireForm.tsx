'use client';

import React, { useState, useRef } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import { FormData, Question, FirestoreHookResult } from './types';
import InstantQuotePaintingCalculator from './InstantQuotePaintingCalc';

// Validation utilities
const validations = {
  // Validate full name (first and last name)
  fullName: (value: string): boolean => {
    const pattern = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
    return pattern.test(value);
  },
  
  // Validate phone number
  phone: (value: string): boolean => {
    // Accepts formats like: (123) 456-7890, 123-456-7890, 1234567890
    const pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
    return pattern.test(value);
  },
  
  // Validate email
  email: (value: string): boolean => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value);
  },
  
  // Validate zip code
  zipCode: (value: string): boolean => {
    const pattern = /^\d{5}(-\d{4})?$/;
    return pattern.test(value);
  }
};

// Format phone number as user types
const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '');
  
  // Check the length and format accordingly
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
};

const PaintingQuestionnaireForm: React.FC = () => {
  const firestoreHook = useFirestore('instantQuotes');
  const { addDocument, error } = firestoreHook as unknown as FirestoreHookResult;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  // Reference to store the calculated quote amount
  const calculatedQuoteRef = useRef<number | null>(null);

  // Define the questionnaire structure
  const questionnaire: Question[] = [
    {
      id: 'paintingType',
      question: 'What type of painting project are you interested in?',
      type: 'checkbox',
      options: [
        'Interior walls',
        'Exterior walls',
        'Ceilings',
        'Trim/doors/windows',
      ],
      isRequired: true
    },
    {
      id: 'squareFeet',
      question: 'How many square feet does your project cover?',
      type: 'number',
      min: 50,
      max: 20000,
      isRequired: true
    },
    {
      id: 'highAreas',
      question: 'Will the project include any high or difficult-to-reach areas?',
      type: 'radio',
      options: ['Yes', 'No'],
      isRequired: true
    },
    {
      id: 'highAreaDetails',
      question: 'Please specify the type of high or difficult-to-reach areas:',
      type: 'text',
      isRequired: true,
      dependsOn: { id: 'highAreas', value: 'Yes' }
    },
    {
      id: 'furnitureMoving',
      question: 'Do you need furniture or fixtures moved/covered during the project?',
      type: 'radio',
      options: ['Yes', 'No'],
      isRequired: true
    },
    {
      id: 'surfaceCondition',
      question: 'What is the condition of the surfaces to be painted?',
      type: 'checkbox',
      options: [
        'Peeling/cracked paint',
        'Stains or water damage',
        'Wallpaper to remove',
        'Smooth/new drywall',
        'Other'
      ],
      isRequired: true
    },
    {
      id: 'surfaceConditionOther',
      question: 'Please specify the other surface condition:',
      type: 'text',
      isRequired: true,
      dependsOn: { id: 'surfaceCondition', value: ['Other'] }
    },
    {
      id: 'timeline',
      question: 'When would you like to have this project completed?',
      type: 'radio',
      options: [
        'As soon as possible (within 7 days)',
        'Within 30 days',
        'Within 60 days',
        'Just exploring options for now'
      ],
      isRequired: true
    },
    {
      id: 'motivation',
      question: 'What\'s the primary reason for your painting project?',
      type: 'radio',
      options: [
        'Moving into a new home',
        'Renovation/updating my space',
        'Preparing to sell my home',
        'New construction',
        'Covering damage or wear'
      ],
      isRequired: true
    },
    {
      id: 'decisionStage',
      question: 'Where are you in your decision process?',
      type: 'radio',
      options: [
        'Just starting to research',
        'Getting quotes from multiple companies',
        'Ready to choose a provider',
        'Have a firm budget and timeline in place'
      ],
      isRequired: true
    },
    {
      id: 'specialConsiderations',
      question: 'Do any of these apply to your project?',
      type: 'checkbox',
      options: [
        'Pets in the home',
        'Children in the home',
        'Need low-odor or eco-friendly paint',
        'Specific color matching required',
        'Historic home with special requirements'
      ],
      isRequired: false
    },
    {
      id: 'referralSource',
      question: 'How did you hear about us?',
      type: 'radio',
      options: [
        'Friend or family recommendation',
        'Google search',
        'Social media',
        'Previous customer',
        'Advertisement',
        'Other'
      ],
      isRequired: true
    },
    {
      id: 'zipCode',
      question: 'What is your zip code?',
      type: 'text',
      isRequired: true,
      pattern: '[0-9]{5}'
    },
    {
      id: 'contactTime',
      question: 'When is the best time to contact you?',
      type: 'radio',
      options: [
        'Morning (8am-12pm)',
        'Afternoon (12pm-5pm)',
        'Evening (5pm-8pm)'
      ],
      isRequired: true
    },
    {
      id: 'FullName',
      question: 'What is your first and last name?',
      type: 'text',
      isRequired: true
    },
    {
      id: 'phone',
      question: 'What is your phone number?',
      type: 'tel',
      isRequired: true
    },
    {
      id: 'email',
      question: 'What email address should we send your quote to?',
      type: 'email',
      isRequired: true
    },
    {
      id: 'additionalComments',
      question: 'Is there anything else we should know about your project?',
      type: 'textarea',
      isRequired: false
    }
  ];

  // Helper function to provide placeholders for specific fields
  const getPlaceholder = (id: string): string => {
    switch (id) {
      case 'FullName':
        return 'First and Last Name';
      case 'phone':
        return '(123) 456-7890';
      case 'email':
        return 'email@example.com';
      case 'zipCode':
        return '12345';
      default:
        return '';
    }
  };

  // Get the current question considering dependencies
  const getCurrentQuestion = () => {
    let index = currentQuestionIndex;
    while (index < questionnaire.length) {
      const question = questionnaire[index];
      if (!question.dependsOn) {
        return { question, index };
      }
      
      const dependencyValue = formData[question.dependsOn.id];
      
      // Handle both string and array dependencies
      if (Array.isArray(question.dependsOn.value)) {
        if (Array.isArray(dependencyValue)) {
          // Check if any of the dependsOn values are in the form data array
          const hasMatch = question.dependsOn.value.some(val => 
            dependencyValue.includes(val)
          );
          if (hasMatch) {
            return { question, index };
          }
        }
      } else if (dependencyValue === question.dependsOn.value) {
        return { question, index };
      }
      index++;
    }
    return { question: null, index: questionnaire.length };
  };

  const { question, index } = getCurrentQuestion();
  
  // Handle form field changes
  const handleChange = (id: string, value: string) => {
    let formattedValue = value;
    let errorMessage = '';
    
    // Apply formatting for phone numbers
    if (id === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }
    
    // Validate fields when they're filled out
    if (value) {
      switch (id) {
        case 'FullName':
          if (!validations.fullName(value)) {
            errorMessage = 'Please enter both your first and last name';
          }
          break;
        case 'phone':
          if (!validations.phone(formattedValue)) {
            errorMessage = 'Please enter a valid phone number';
          }
          break;
        case 'email':
          if (!validations.email(value)) {
            errorMessage = 'Please enter a valid email address';
          }
          break;
        case 'zipCode':
          if (!validations.zipCode(value)) {
            errorMessage = 'Please enter a valid 5-digit zip code';
          }
          break;
      }
    }
    
    // Update validation errors
    setValidationErrors(prev => ({
      ...prev,
      [id]: errorMessage
    }));
    
    // Update form data with formatted value
    setFormData(prevData => ({
      ...prevData,
      [id]: formattedValue
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (id: string, option: string, checked: boolean) => {
    setFormData(prevData => {
      const currentOptions = prevData[id] as string[] || [];
      if (checked) {
        return {
          ...prevData,
          [id]: [...currentOptions, option]
        };
      } else {
        return {
          ...prevData,
          [id]: currentOptions.filter(item => item !== option)
        };
      }
    });
  };

  // Get quote calculation from InstantQuoteCalculator
  const getQuoteAmount = (): number => {
    return calculatedQuoteRef.current || 0;
  };

  // Function to capture the quote value
  const captureQuoteValue = (quoteValue: number) => {
    calculatedQuoteRef.current = quoteValue;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate only the current question or last question
    if (question) {
      const value = formData[question.id] as string;
      
      // If the field is required but empty, don't submit
      if (question.isRequired && (!value || value === '')) {
        setValidationErrors(prev => ({
          ...prev,
          [question.id]: 'This field is required'
        }));
        return;
      }

      // Validate specific field types
      if (value) {
        let errorMessage = '';
        switch (question.id) {
          case 'FullName':
            if (!validations.fullName(value)) {
              errorMessage = 'Please enter both your first and last name';
            }
            break;
          case 'phone':
            if (!validations.phone(value)) {
              errorMessage = 'Please enter a valid phone number';
            }
            break;
          case 'email':
            if (!validations.email(value)) {
              errorMessage = 'Please enter a valid email address';
            }
            break;
          case 'zipCode':
            if (!validations.zipCode(value)) {
              errorMessage = 'Please enter a valid 5-digit zip code';
            }
            break;
        }
        
        if (errorMessage) {
          setValidationErrors(prev => ({
            ...prev,
            [question.id]: errorMessage
          }));
          return;
        }
      }
    }
    
    // If we're here, the current question is valid
    setIsLoading(true);
    
    try {
      // Get the final quote amount
      const quoteAmount = getQuoteAmount();
      
      // Add the quote amount to the form data
      const finalFormData = {
        ...formData,
        quoteAmount: quoteAmount,
        submittedAt: new Date()
      };
      
      // Submit the form data with the quote amount
      await addDocument(finalFormData);
      setFormSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      // You might want to display this error to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Handle next button click
  const handleNext = () => {
    if (isCurrentQuestionValid()) {
      setCurrentQuestionIndex(index + 1);
    }
  };

  // Check if the current question response is valid
  const isCurrentQuestionValid = (): boolean => {
    if (!question || !question.isRequired) return true;
    
    const value = formData[question.id];
    
    // For the "Next" button, we're more lenient - we just need some value
    if (question.type === 'checkbox') {
      return Array.isArray(value) && value.length > 0;
    }
    return value !== undefined && value !== '';
  };

  // Check if it's the last question
  const isLastQuestion = index >= questionnaire.length - 1;

  // Handle going back to previous question
  const handlePrevious = () => {
    let prevIndex = currentQuestionIndex - 1;
    while (prevIndex >= 0) {
      const prevQuestion = questionnaire[prevIndex];
      if (!prevQuestion.dependsOn) {
        setCurrentQuestionIndex(prevIndex);
        break;
      }

      // Handle both string and array dependencies
      const dependencyValue = formData[prevQuestion.dependsOn.id];
      if (Array.isArray(prevQuestion.dependsOn.value)) {
        if (Array.isArray(dependencyValue)) {
          const hasMatch = prevQuestion.dependsOn.value.some(val => 
            dependencyValue.includes(val)
          );
          if (hasMatch) {
            setCurrentQuestionIndex(prevIndex);
            break;
          }
        }
      } else if (dependencyValue === prevQuestion.dependsOn.value) {
        setCurrentQuestionIndex(prevIndex);
        break;
      }
      
      prevIndex--;
    }
  };

  // Determine if we should show the quote calculator
  const shouldShowQuoteCalculator = (): boolean => {
    return (
      !!formData.squareFeet && 
      (formData.paintingType && Array.isArray(formData.paintingType) && formData.paintingType.length > 0) && 
      !formSubmitted
    );
  };

  const renderThankYouScreen = () => (
    <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700">Thank You!</h2>
      <p className="mt-3 text-gray-700">
        Your information has been submitted successfully. We're excited to help you with your painting project!
      </p>
      
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">Your Estimated Quote</h3>
          <InstantQuotePaintingCalculator
          formData={formData} 
          onQuoteCalculated={captureQuoteValue}
        />
        <p className="mt-2 text-sm text-gray-600 italic">
          * This estimate is based on the information provided. Final costs may vary depending on specific project details and on-site assessment.
        </p>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg bg-white">
          <h4 className="font-semibold text-gray-800">Next Steps</h4>
          <ul className="mt-2 space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span>A painting consultant will contact you at your preferred time to discuss your project in detail.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span>We'll help you choose the right paints and finishes for your space.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span>You'll receive a final quote after our on-site assessment.</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg bg-white">
          <h4 className="font-semibold text-gray-800">Have Questions?</h4>
          <p className="mt-2 text-sm text-gray-600">
            For immediate assistance, call us at <a href="tel:(206)619-2804" className="text-blue-600 font-semibold">(206) 619-2804</a> or email us at <a href="mailto:info@paintingpros.com" className="text-blue-600 font-semibold">info@paintingpros.com</a>
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <a
          href="/schedule-consultation"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center"
        >
          Schedule Your Consultation
        </a>
        
        <a
          href="/color-selection"
          className="px-6 py-3 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-center"
        >
          Browse Color Selection
        </a>
      </div>
      
      <p className="mt-6 text-sm text-gray-500">
        A copy of your quote has been sent to {formData.email}. If you don't see it, please check your spam folder.
      </p>
    </div>
  );

  const renderQuestionForm = () => {
    if (!question) {
      return null;
    }

    const renderInputField = () => {
      switch (question.type) {
        case 'checkbox':
          return (
            <div className="flex flex-wrap gap-3 mt-6">
              {question.options?.map((option, i) => {
                const isChecked = Array.isArray(formData[question.id]) && 
                  (formData[question.id] as string[]).includes(option);
                return (
                  <label 
                    key={i}
                    className={`px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                      isChecked 
                        ? 'bg-[#1976D2] text-white border-[#1976D2]' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only" 
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          );
        case 'radio':
          return (
            <div className="flex flex-col gap-3 mt-6">
              {question.options?.map((option, i) => (
                <label 
                  key={i}
                  className={`px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData[question.id] === option 
                      ? 'bg-[#1976D2] text-white border-[#1976D2]' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    checked={formData[question.id] === option}
                    onChange={() => handleChange(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          );
        case 'textarea':
          return (
            <div>
              <textarea
                placeholder="Have any special requests or important details? Let us know here!"
                className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-[#1976D2] focus:ring-[#1976D2] text-black"
                value={(formData[question.id] || '') as string}
                onChange={(e) => handleChange(question.id, e.target.value)}
                rows={4}
              />
              {validationErrors[question.id] && (
                <div className="mt-2 text-red-600 text-sm">{validationErrors[question.id]}</div>
              )}
            </div>
          );
        case 'number':
          return (
            <div>
              <input
                id={question.id}
                type={question.type}
                className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-[#1976D2] focus:ring-[#1976D2] text-black"
                value={(formData[question.id] || '') as string}
                onChange={(e) => handleChange(question.id, e.target.value)}
                min={question.min || 0}
                max={question.max || undefined}
                aria-label={question.label || `Enter ${question.id}`}
                placeholder={getPlaceholder(question.id)}
              />
              {validationErrors[question.id] && (
                <div className="mt-2 text-red-600 text-sm">{validationErrors[question.id]}</div>
              )}
            </div>
          );
        default:
          return (
            <div>
              <input
                id={question.id}
                type={question.type}
                className={`w-full mt-4 p-3 border-2 rounded-lg focus:ring-[#1976D2] text-black ${
                  validationErrors[question.id] 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-[#1976D2]'
                }`}
                value={(formData[question.id] || '') as string}
                onChange={(e) => handleChange(question.id, e.target.value)}
                pattern={question.pattern}
                aria-label={question.label || `Enter ${question.id}`}
                placeholder={getPlaceholder(question.id)}
              />
              {validationErrors[question.id] && (
                <div className="mt-2 text-red-600 text-sm">{validationErrors[question.id]}</div>
              )}
              {question.id === 'FullName' && (
                <div className="mt-1 text-xs text-gray-500">Please enter both your first and last name</div>
              )}
              {question.id === 'phone' && (
                <div className="mt-1 text-xs text-gray-500">Format: (123) 456-7890</div>
              )}
              {question.id === 'email' && (
                <div className="mt-1 text-xs text-gray-500">Example: name@example.com</div>
              )}
              {question.id === 'zipCode' && (
                <div className="mt-1 text-xs text-gray-500">Enter your 5-digit zip code</div>
              )}
            </div>
          );
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {question.question}
          </h2>
          <div className="text-sm text-gray-500">
            Question {index + 1} of {questionnaire.length}
          </div>
        </div>
        
        {renderInputField()}
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className={`px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors ${
              currentQuestionIndex === 0 ? 'invisible' : ''
            }`}
          >
            Back
          </button>
          
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? 'Submitting...' : 'GET MY FREE QUOTE'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionValid()}
              className="px-6 py-2 bg-[#1976D2] text-white rounded-lg hover:bg-[#1565C0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
            </button>
          )}
        </div>
        
        {isLastQuestion && (
          <p className="mt-4 text-xs text-gray-500 text-center">
            By submitting, you'll receive a personalized painting quote plus a FREE design consultation!
          </p>
        )}
        
        <div className="w-full bg-gray-200 h-2 mt-6 rounded-full overflow-hidden">
          <div 
            className="bg-[#1976D2] h-full transition-all duration-500 ease-in-out"
            style={{ width: `${((index + 1) / questionnaire.length) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Painting Quote</h1>
      
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {formSubmitted ? renderThankYouScreen() : renderQuestionForm()}
      
      {shouldShowQuoteCalculator() && (
        <div className="mt-6">
          <InstantQuotePaintingCalculator 
            formData={formData} 
            onQuoteCalculated={captureQuoteValue}
          />
          <p className="mt-2 text-sm text-gray-600 font-semibold text-center">* Quote includes labor, materials, and preparation. Final price may vary based on site inspection.</p>
        </div>
      )}
    </div>
  );
}

export default PaintingQuestionnaireForm;