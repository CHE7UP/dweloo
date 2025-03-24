'use client';

import React, { useState } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import { FormData, Question, FirestoreHookResult } from './types';
import { ArrowRight, Calendar, Phone, Mail, Check } from 'lucide-react';

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

  // Define the questionnaire structure
  const questionnaire: Question[] = [
    {
      id: 'projectScope',
      question: 'What type of renovation project are you planning?',
      type: 'radio',
      options: [
        'Whole house renovation',
        'Kitchen renovation',
        'Bathroom renovation',
        'Flooring installation',
        'Painting',
        'Other'
      ],
      isRequired: true
    },
    {
      id: 'projectScopeOther',
      question: 'Please specify your renovation project:',
      type: 'text',
      isRequired: true,
      dependsOn: { id: 'projectScope', value: 'Other' }
    },
    {
      id: 'homeAge',
      question: 'How old is your home?',
      type: 'radio',
      options: [
        'Less than 5 years',
        '5-15 years',
        '16-30 years',
        '31-50 years',
        '51-100 years',
        'Over 100 years'
      ],
      isRequired: true
    },
    {
      id: 'renovationReason',
      question: 'What is the primary reason for your renovation?',
      type: 'radio',
      options: [
        'Update appearance/style',
        'Fix damage/disrepair',
        'Increase home value for sale',
        'New home purchase renovation',
        'Accessibility modifications'
      ],
      isRequired: true
    },
    {
      id: 'timeline',
      question: 'When would you like to start this renovation project?',
      type: 'radio',
      options: [
        'As soon as possible',
        'Within 1 month',
        'Within 2-3 months',
        'Within 4-6 months',
        'More than 6 months from now'
      ],
      isRequired: true
    },
    {
      id: 'additionalDetails',
      question: 'Please provide any additional details or specific requirements for your renovation:',
      type: 'textarea',
      isRequired: false
    },
    {
      id: 'zipCode',
      question: 'What is your zip code?',
      type: 'text',
      isRequired: true,
      pattern: '[0-9]{5}'
    },
    {
      id: 'fullName',
      question: 'What is your full name?',
      type: 'text',
      isRequired: true
    },
    {
      id: 'phoneNumber',
      question: 'What is your phone number?',
      type: 'tel',
      isRequired: true
    },
    {
      id: 'email',
      question: 'What is your email address?',
      type: 'email',
      isRequired: true
    },
    {
      id: 'bestTimeToContact',
      question: 'What is the best time to contact you?',
      type: 'checkbox',
      options: [
        'Weekday mornings (8am-12pm)',
        'Weekday afternoons (12pm-5pm)',
        'Weekday evenings (5pm-8pm)',
        'Weekends'
      ],
      isRequired: true
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
      // Submit the form data
      await addDocument({
        ...formData,
        submittedAt: new Date()
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
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
        <p className="text-green-700 text-sm font-medium">Request received! Confirmation sent to {formData.email}</p>
      </div>
      
      {/* Thank You Message */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Thank You for Your Interest!</h2>
      <p className="text-gray-600">
        We&apos;ve received your flooring project details and our specialist will contact you within 24 hours to discuss your needs and provide a personalized quote.
      </p>
        
      {/* What's Next & Help Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">What&apos;s Next</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <ArrowRight className="text-[#1976D2] mr-2" size={14} />
              <span className="text-sm text-gray-600">Specialist will contact you within 24 hours</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="text-[#1976D2] mr-2" size={14} />
              <span className="text-sm text-gray-600">On-site assessment will be scheduled</span>
            </li>
            <li className="flex items-center">
              <ArrowRight className="text-[#1976D2] mr-2" size={14} />
              <span className="text-sm text-gray-600">Detailed quote will be provided after assessment</span>
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
      
      {/* CTA */}
      <div className="mt-8 max-w-[350px]">
        <a
          href="/schedule-consultation-seattle"
          className="w-full px-4 py-3 bg-[#1976D2] text-white text-md rounded hover:bg-blue-700 transition-colors text-center flex items-center justify-center"
        >
          <span>Schedule Consultation</span>
          <Calendar className="ml-2" size={16} />
        </a>
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
        </div>
        
        {renderInputField()}
        
        <div className="flex justify-between mt-8">
          {currentQuestionIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
          )}
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading || !isCurrentQuestionValid()}
              className="w-full px-5 py-3 bg-[#1976D2] text-white cursor-pointer font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Get Custom Quote'}
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
            By submitting, you agree to be contacted by our home specialists.
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
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {formSubmitted ? renderThankYouScreen() : renderQuestionForm()}
    </div>
  );
};

export default FlooringQuestionnaireForm;