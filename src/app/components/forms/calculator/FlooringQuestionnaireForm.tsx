'use client';

import React, { useState, useRef } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import InstantQuoteCalculator from './InstantQuoteCalculator';
import { FormData, Question, FirestoreHookResult } from './types';
import { ArrowRight, Calendar, Palette, Phone, Mail, Check } from 'lucide-react';

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

const FlooringQuestionnaireForm: React.FC = () => {
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
      id: 'flooringType',
      question: 'What type of flooring are you interested in?',
      type: 'radio', // Changed from checkbox to radio
      options: [
        'Laminate',
        'Engineered Wood',
        'Hardwood',
        'Luxury Vinyl Plank/Tile',
        'Carpet'
      ],
      isRequired: true
    },
    {
      id: 'squareFeet',
      question: 'How many square feet does your project cover?',
      type: 'number',
      min: 100,  // Added minimum value
      max: 20000, // Added maximum value
      isRequired: true
    },
    {
      id: 'roomCount',
      question: 'How many rooms will be included in this project?',
      type: 'number',
      min: 1,  // Added minimum value
      max: 30, // Added maximum value
      isRequired: true
    },
    {
      id: 'hasStairs',
      question: 'Will the project include any stairs?',
      type: 'radio',
      options: ['Yes', 'No'],
      isRequired: true
    },
    {
      id: 'stairCount',
      question: 'How many stairs?',
      type: 'number',
      min: 1,  // Added minimum value
      max: 50, // Added maximum value
      isRequired: true,
      dependsOn: { id: 'hasStairs', value: 'Yes' }
    },
    {
      id: 'toiletRemoval',
      question: 'Will toilets need to be removed during installation?',
      type: 'radio',
      options: ['Yes', 'No'],
      isRequired: true
    },
    {
      id: 'toiletCount',
      question: 'How many toilets?',
      type: 'number',
      min: 1,  // Added minimum value
      max: 10, // Added maximum value
      isRequired: true,
      dependsOn: { id: 'toiletRemoval', value: 'Yes' }
    },
    {
      id: 'removalNeeded',
      question: 'Do you need removal and disposal of existing flooring?',
      type: 'radio',
      options: [
        'Yes',
        'No, I\'ll handle removal',
        'No, the area is already prepared'
      ],
      isRequired: true
    },
    {
      id: 'existingFlooringType',
      question: 'What type of existing flooring will be removed?',
      type: 'radio',
      options: ['Carpet', 'Laminate', 'Hardwood', 'Tile', 'Vinyl', 'Other'],
      isRequired: true,
      dependsOn: { id: 'removalNeeded', value: 'Yes' }
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
      question: 'What\'s the primary reason for your new flooring?',
      type: 'radio',
      options: [
        'Moving into a new home',
        'Renovation/updating my space',
        'Preparing to sell my home',
        'New construction',
        'Replacing damaged flooring'
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
      question: 'Do any of these apply to your home?',
      type: 'checkbox',
      options: [
        'Pets in the home',
        'Children in the home',
        'Need waterproof/water-resistant flooring',
        'Concerned about sound between floors',
        'Have floor heating system'
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
      id: 'fullName',
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
      case 'fullName':
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
      if (dependencyValue === question.dependsOn.value) {
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

         // Special handling for number inputs
  if (question?.type === 'number') {
    // Parse the input as a number
    const numValue = parseFloat(value);
    
    // Validate number input
    if (value !== '' && (isNaN(numValue) || numValue < 0 || numValue > 1000000)) {
      errorMessage = numValue < 0 
        ? 'Value cannot be negative' 
        : numValue > 1000000 
          ? 'Value cannot exceed 1,000,000' 
          : 'Please enter a valid number';
      
      // If the value is invalid, don't update formData (keep previous value)
      if (numValue < 0 || numValue > 1000000) {
        setValidationErrors(prev => ({
          ...prev,
          [id]: errorMessage
        }));
        return;
      }
    }
  } 
    
    // Apply formatting for phone numbers
    if (id === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }
    
    // Validate fields when they're filled out
    if (value) {
      switch (id) {
        case 'fullName':
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
    // This will be populated by the ref in QuoteCalculator
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
          case 'fullName':
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
      if (!prevQuestion.dependsOn || formData[prevQuestion.dependsOn.id] === prevQuestion.dependsOn.value) {
        setCurrentQuestionIndex(prevIndex);
        break;
      }
      prevIndex--;
    }
  };


  const renderThankYouScreen = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Success Banner */}
      <div className="mb-6 bg-green-50 py-3 px-4 rounded-lg border border-green-100 flex items-center justify-center">
        <Check className="text-green-500 mr-2" size={18} />
        <p className="text-green-700 text-sm font-medium">Quote sent to {formData.email}</p>
      </div>
      
      {/* Quote Section */}
      <h2 className="text-xl font-semibold text-gray-800">Quote Ready</h2>
      
      <div className="mt-4">
        <InstantQuoteCalculator
          formData={formData} 
          onQuoteCalculated={captureQuoteValue}
          showQuote={true} 
        />
        <p className="mt-1 text-xs text-gray-500">
          *Estimate based on provided information. Final cost may vary.
        </p>
      </div>
        
      {/* What's Next & Help Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">What&apos;s Next</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <ArrowRight className="text-[#1976D2] mr-2" size={14} />
              <span className="text-sm text-gray-600">Consultant will contact you within 24 hours</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="text-[#1976D2] mr-2" size={14} />
              <span className="text-sm text-gray-600">Final quote after site assessment</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Need Help?</h4>
          <div className="flex flex-col space-y-2">
            <a href="tel:(206)619-2804" className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <Phone className="text-[#1976D2] mr-2" size={14} />
              (206) 619-2804
            </a>
            <a href="mailto:info@dweloo.com" className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="text-[#1976D2] mr-2" size={14} />
              info@dweloo.com
            </a>
          </div>
        </div>
      </div>
      
      {/* CTAs */}
      <div className="mt-8 max-w-[350px]">
  <div className="flex flex-row gap-2">
    <a
      href="/schedule-consultation-seattle"
      className="flex-1 px-3 py-4 bg-[#1976D2] text-white text-md rounded hover:bg-blue-700 transition-colors text-center flex items-center justify-center"
    >
      <span>Schedule</span>
      <Calendar className="ml-1" size={16} />
    </a>
    <a
      href="/flooring-selection"
      className="flex-1 px-3 py-4 bg-white border border-gray-300 text-gray-700 text-md rounded hover:bg-gray-50 transition-colors text-center flex items-center justify-center"
    >
      <span>Browse</span>
      <Palette className="ml-1" size={16} />
    </a>
  </div>
</div>
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
              {question.id === 'fullName' && (
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
          {/* <div className="text-sm text-gray-500">
            Question {index + 1} of {questionnaire.length}
          </div> */}
        </div>
        
        {renderInputField()}
        
        <div className="flex justify-between mt-8">
        {!isLastQuestion && (
          <button
            onClick={handlePrevious}
            className={`px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors ${
              currentQuestionIndex === 0 ? 'invisible' : ''
            }`}
          >
            Back
          </button>
         )} 
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!isCurrentQuestionValid() || isLoading}
              className="w-full px-5 py-3 bg-blue-500 text-white cursor-pointer font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
              {isLoading ? 'Submitting...' : 'Get Flooring Estimate'}
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
            By submitting, you&apos;ll receive a personalized flooring quote!
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

  // Determine if we should show the quote calculator
  const shouldShowQuoteCalculator = (): boolean => {
    return Boolean(
      !!formData.squareFeet && 
      !!formData.flooringType && 
      !formSubmitted
    );
  };

  return (
    <div className="max-w-2xl mx-auto">      
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {formSubmitted ? renderThankYouScreen() : renderQuestionForm()}
      
      {shouldShowQuoteCalculator() && (
        <div className="mt-6">
          <InstantQuoteCalculator 
            formData={formData} 
            onQuoteCalculated={captureQuoteValue}
          />
          <p className="mt-2 text-sm text-gray-600 font-semibold text-center">* Labor and preparation only. Materials not included. Final price subject to site inspection</p>
        </div>
      )}
    </div>
  );
};

export default FlooringQuestionnaireForm;