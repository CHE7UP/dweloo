// 'use client';

// import React, { useState } from 'react';
// import { useFirestore } from '@/hooks/useFirestore';
// import InstantQuoteCalculator from './InstantQuoteCalculator';

// const FlooringQuestionnaireForm = () => {
//   const { addDocument, error, success } = useFirestore('flooringConsultations');
  
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [formData, setFormData] = useState({});
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Define the questionnaire structure
//   const questionnaire = [
//     {
//       id: 'flooringType',
//       question: 'What type of flooring are you interested in?',
//       type: 'checkbox',
//       options: [
//         'Laminate',
//         'Engineered Wood',
//         'Hardwood',
//         'Luxury Vinyl Plank/Tile',
//         'Carpet'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'squareFeet',
//       question: 'How many square feet does your project cover?',
//       type: 'number',
//       isRequired: true
//     },
//     {
//       id: 'roomCount',
//       question: 'How many rooms will be included in this project?',
//       type: 'number',
//       isRequired: true
//     },
//     {
//       id: 'hasStairs',
//       question: 'Will the project include any stairs?',
//       type: 'radio',
//       options: ['Yes', 'No'],
//       isRequired: true
//     },
//     {
//       id: 'stairCount',
//       question: 'How many stairs?',
//       type: 'number',
//       isRequired: true,
//       dependsOn: { id: 'hasStairs', value: 'Yes' }
//     },
//     {
//       id: 'toiletRemoval',
//       question: 'Will toilets need to be removed during installation?',
//       type: 'radio',
//       options: ['Yes', 'No'],
//       isRequired: true
//     },
//     {
//       id: 'toiletCount',
//       question: 'How many toilets?',
//       type: 'number',
//       isRequired: true,
//       dependsOn: { id: 'toiletRemoval', value: 'Yes' }
//     },
//     {
//       id: 'removalNeeded',
//       question: 'Do you need removal and disposal of existing flooring?',
//       type: 'radio',
//       options: [
//         'Yes',
//         'No, I\'ll handle removal',
//         'No, the area is already prepared'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'existingFlooringType',
//       question: 'What type of existing flooring will be removed?',
//       type: 'radio',
//       options: ['Carpet', 'Laminate', 'Hardwood', 'Tile', 'Vinyl', 'Other'],
//       isRequired: true,
//       dependsOn: { id: 'removalNeeded', value: 'Yes' }
//     },
//     {
//       id: 'timeline',
//       question: 'When would you like to have this project completed?',
//       type: 'radio',
//       options: [
//         'As soon as possible (within 7 days)',
//         'Within 30 days',
//         'Within 60 days',
//         'Just exploring options for now'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'motivation',
//       question: 'What\'s the primary reason for your new flooring?',
//       type: 'radio',
//       options: [
//         'Moving into a new home',
//         'Renovation/updating my space',
//         'Preparing to sell my home',
//         'New construction',
//         'Replacing damaged flooring'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'decisionStage',
//       question: 'Where are you in your decision process?',
//       type: 'radio',
//       options: [
//         'Just starting to research',
//         'Getting quotes from multiple companies',
//         'Ready to choose a provider',
//         'Have a firm budget and timeline in place'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'specialConsiderations',
//       question: 'Do any of these apply to your home?',
//       type: 'checkbox',
//       options: [
//         'Pets in the home',
//         'Children in the home',
//         'Need waterproof/water-resistant flooring',
//         'Concerned about sound between floors',
//         'Have floor heating system'
//       ],
//       isRequired: false
//     },
//     {
//       id: 'referralSource',
//       question: 'How did you hear about us?',
//       type: 'radio',
//       options: [
//         'Friend or family recommendation',
//         'Google search',
//         'Social media',
//         'Previous customer',
//         'Advertisement',
//         'Other'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'zipCode',
//       question: 'What is your zip code?',
//       type: 'text',
//       isRequired: true,
//       pattern: '[0-9]{5}'
//     },
//     {
//       id: 'contactTime',
//       question: 'When is the best time to contact you?',
//       type: 'radio',
//       options: [
//         'Morning (8am-12pm)',
//         'Afternoon (12pm-5pm)',
//         'Evening (5pm-8pm)'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'firstName',
//       question: 'What is your first name?',
//       type: 'text',
//       isRequired: true
//     },
//     {
//       id: 'lastName',
//       question: 'What is your last name?',
//       type: 'text',
//       isRequired: true
//     },
//     {
//       id: 'phone',
//       question: 'What is your phone number?',
//       type: 'tel',
//       isRequired: true
//     },
//     {
//       id: 'email',
//       question: 'What email address should we send your quote to?',
//       type: 'email',
//       isRequired: true
//     },
//     {
//       id: 'additionalComments',
//       question: 'Is there anything else we should know about your project?',
//       type: 'textarea',
//       isRequired: false
//     }
//   ];

//   // Get the current question considering dependencies
//   const getCurrentQuestion = () => {
//     let index = currentQuestionIndex;
//     while (index < questionnaire.length) {
//       const question = questionnaire[index];
//       if (!question.dependsOn) {
//         return { question, index };
//       }
      
//       const dependencyValue = formData[question.dependsOn.id];
//       if (dependencyValue === question.dependsOn.value) {
//         return { question, index };
//       }
//       index++;
//     }
//     return { question: null, index: questionnaire.length };
//   };

//   const { question, index } = getCurrentQuestion();
  
//   // Handle form field changes
//   const handleChange = (id, value) => {
//     setFormData(prevData => ({
//       ...prevData,
//       [id]: value
//     }));
//   };

//   // Handle checkbox changes
//   const handleCheckboxChange = (id, option, checked) => {
//     setFormData(prevData => {
//       const currentOptions = prevData[id] || [];
//       if (checked) {
//         return {
//           ...prevData,
//           [id]: [...currentOptions, option]
//         };
//       } else {
//         return {
//           ...prevData,
//           [id]: currentOptions.filter(item => item !== option)
//         };
//       }
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     setIsLoading(true);
//     await addDocument(formData);
//     setFormSubmitted(true);
//     setIsLoading(false);
//   };

//   // Handle next button click
//   const handleNext = () => {
//     if (isCurrentQuestionValid()) {
//       setCurrentQuestionIndex(index + 1);
//     }
//   };

//   // Check if the current question response is valid
//   const isCurrentQuestionValid = () => {
//     if (!question || !question.isRequired) return true;
    
//     const value = formData[question.id];
//     if (question.type === 'checkbox') {
//       return Array.isArray(value) && value.length > 0;
//     }
//     return value !== undefined && value !== '';
//   };

//   // Check if it's the last question
//   const isLastQuestion = index >= questionnaire.length - 1;

//   // Handle going back to previous question
//   const handlePrevious = () => {
//     let prevIndex = currentQuestionIndex - 1;
//     while (prevIndex >= 0) {
//       const prevQuestion = questionnaire[prevIndex];
//       if (!prevQuestion.dependsOn || formData[prevQuestion.dependsOn.id] === prevQuestion.dependsOn.value) {
//         setCurrentQuestionIndex(prevIndex);
//         break;
//       }
//       prevIndex--;
//     }
//   };

//   const renderThankYouScreen = () => (
//     <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-green-700">Thank You!</h2>
//       <p className="mt-3 text-green-600">
//         Your information has been submitted successfully. We&apos;ll be in touch soon with your personalized flooring quote and to schedule your FREE design consultation!
//       </p>
//       <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
//         <h3 className="text-lg font-semibold text-gray-800">Your Estimated Quote</h3>
//         <InstantQuoteCalculator formData={formData} />
//       </div>
//       <button
//         onClick={() => {
//           setFormData({});
//           setCurrentQuestionIndex(0);
//           setFormSubmitted(false);
//         }}
//         className="mt-5 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//       >
//         Start a New Consultation
//       </button>
//     </div>
//   );

//   const renderQuestionForm = () => {
//     if (!question) {
//       return null;
//     }

//     const renderInputField = () => {
//       switch (question.type) {
//         case 'checkbox':
//           return (
//             <div className="flex flex-wrap gap-3 mt-6">
//               {question.options.map((option, i) => {
//                 const isChecked = Array.isArray(formData[question.id]) && formData[question.id].includes(option);
//                 return (
//                   <label 
//                     key={i}
//                     className={`px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
//                       isChecked 
//                         ? 'bg-blue-600 text-white border-blue-700' 
//                         : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                     }`}
//                   >
//                     <input
                      
//                       type="checkbox"
//                       className="sr-only " 
//                       checked={isChecked}
//                       onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
//                     />
//                     {option}
//                   </label>
//                 );
//               })}
//             </div>
//           );
//         case 'radio':
//           return (
//             <div className="flex flex-col gap-3 mt-6">
//               {question.options.map((option, i) => (
//                 <label 
//                   key={i}
//                   className={`px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData[question.id] === option 
//                       ? 'bg-blue-600 text-white border-blue-700' 
//                       : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     className="sr-only"
//                     checked={formData[question.id] === option}
//                     onChange={() => handleChange(question.id, option)}
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//           );
//         case 'textarea':
//           return (
//             <textarea
//               className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
//               value={formData[question.id] || ''}
//               onChange={(e) => handleChange(question.id, e.target.value)}
//               rows={4}
//             />
//           );
//         default:
//           return (
//             <input
//               type={question.type}
//               className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
//               value={formData[question.id] || ''}
//               onChange={(e) => handleChange(question.id, e.target.value)}
//               pattern={question.pattern}
//             />
//           );
//       }
//     };

//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">
//             {question.question}
//           </h2>
//           <div className="text-sm text-gray-500">
//             Question {index + 1} of {questionnaire.length}
//           </div>
//         </div>
        
//         {renderInputField()}
        
//         <div className="flex justify-between mt-8">
//           <button
//             onClick={handlePrevious}
//             className={`px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors ${
//               currentQuestionIndex === 0 ? 'invisible' : ''
//             }`}
//           >
//             Back
//           </button>
          
//           {isLastQuestion ? (
//             <button
//               onClick={handleSubmit}
//               disabled={!isCurrentQuestionValid() || isLoading}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none"
//             >
//               {isLoading ? 'Submitting...' : 'GET MY FREE QUOTE'}
//             </button>
//           ) : (
//             <button
//               onClick={handleNext}
//               disabled={!isCurrentQuestionValid()}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none"
//             >
//               Next
//             </button>
//           )}
//         </div>
        
//         {isLastQuestion && (
//           <p className="mt-4 text-xs text-gray-500 text-center">
//             By submitting, you&apos;ll receive a personalized flooring quote plus a FREE design consultation!
//           </p>
//         )}
        
//         <div className="w-full bg-gray-200 h-2 mt-6 rounded-full overflow-hidden">
//           <div 
//             className="bg-blue-600 h-full transition-all duration-500 ease-in-out"
//             style={{ width: `${((index + 1) / questionnaire.length) * 100}%` }}
//           ></div>
//         </div>
//       </div>
//     );
//   };

//   // Determine if we should show the quote calculator
//   const shouldShowQuoteCalculator = () => {
//     return (
//       formData.squareFeet && 
//       (formData.flooringType && formData.flooringType.length > 0) && 
//       !formSubmitted
//     );
//   };

//   if (formSubmitted && success) {
//     return renderThankYouScreen();
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6"> Flooring Quote</h1>
      
//       {error && (
//         <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
//           {error}
//         </div>
//       )}
      
//       {renderQuestionForm()}
      
//       {shouldShowQuoteCalculator() && (
//         <div className="mt-6">
//           <InstantQuoteCalculator formData={formData} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlooringQuestionnaireForm;


// 'use client';

// import React, { useState } from 'react';
// import { useFirestore } from '@/hooks/useFirestore';

// const FlooringQuestionnaireForm = () => {
//   const { addDocument, error, success } = useFirestore('flooringConsultations');
  
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [formData, setFormData] = useState({});
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Define the questionnaire structure
//   const questionnaire = [
//     {
//       id: 'flooringType',
//       question: 'What type of flooring are you interested in?',
//       type: 'checkbox',
//       options: [
//         'Laminate',
//         'Engineered Wood',
//         'Hardwood',
//         'Luxury Vinyl Plank/Tile',
//         'Carpet'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'squareFeet',
//       question: 'How many square feet does your project cover?',
//       type: 'number',
//       isRequired: true
//     },
//     {
//       id: 'roomCount',
//       question: 'How many rooms will be included in this project?',
//       type: 'number',
//       isRequired: true
//     },
//     {
//       id: 'hasStairs',
//       question: 'Will the project include any stairs?',
//       type: 'radio',
//       options: ['Yes', 'No'],
//       isRequired: true
//     },
//     {
//       id: 'stairCount',
//       question: 'How many stairs?',
//       type: 'number',
//       isRequired: true,
//       dependsOn: { id: 'hasStairs', value: 'Yes' }
//     },
//     {
//       id: 'toiletRemoval',
//       question: 'Will toilets need to be removed during installation?',
//       type: 'radio',
//       options: ['Yes', 'No'],
//       isRequired: true
//     },
//     {
//       id: 'toiletCount',
//       question: 'How many toilets?',
//       type: 'number',
//       isRequired: true,
//       dependsOn: { id: 'toiletRemoval', value: 'Yes' }
//     },
//     {
//       id: 'removalNeeded',
//       question: 'Do you need removal and disposal of existing flooring?',
//       type: 'radio',
//       options: [
//         'Yes',
//         'No, I\'ll handle removal',
//         'No, the area is already prepared'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'existingFlooringType',
//       question: 'What type of existing flooring will be removed?',
//       type: 'radio',
//       options: ['Carpet', 'Laminate', 'Hardwood', 'Tile', 'Vinyl', 'Other'],
//       isRequired: true,
//       dependsOn: { id: 'removalNeeded', value: 'Yes' }
//     },
//     {
//       id: 'timeline',
//       question: 'When would you like to have this project completed?',
//       type: 'radio',
//       options: [
//         'As soon as possible (within 7 days)',
//         'Within 30 days',
//         'Within 60 days',
//         'Just exploring options for now'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'motivation',
//       question: 'What\'s the primary reason for your new flooring?',
//       type: 'radio',
//       options: [
//         'Moving into a new home',
//         'Renovation/updating my space',
//         'Preparing to sell my home',
//         'New construction',
//         'Replacing damaged flooring'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'decisionStage',
//       question: 'Where are you in your decision process?',
//       type: 'radio',
//       options: [
//         'Just starting to research',
//         'Getting quotes from multiple companies',
//         'Ready to choose a provider',
//         'Have a firm budget and timeline in place'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'specialConsiderations',
//       question: 'Do any of these apply to your home?',
//       type: 'checkbox',
//       options: [
//         'Pets in the home',
//         'Children in the home',
//         'Need waterproof/water-resistant flooring',
//         'Concerned about sound between floors',
//         'Have floor heating system'
//       ],
//       isRequired: false
//     },
//     {
//       id: 'referralSource',
//       question: 'How did you hear about us?',
//       type: 'radio',
//       options: [
//         'Friend or family recommendation',
//         'Google search',
//         'Social media',
//         'Previous customer',
//         'Advertisement',
//         'Other'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'zipCode',
//       question: 'What is your zip code?',
//       type: 'text',
//       isRequired: true,
//       pattern: '[0-9]{5}'
//     },
//     {
//       id: 'contactTime',
//       question: 'When is the best time to contact you?',
//       type: 'radio',
//       options: [
//         'Morning (8am-12pm)',
//         'Afternoon (12pm-5pm)',
//         'Evening (5pm-8pm)'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'firstName',
//       question: 'What is your first name?',
//       type: 'text',
//       isRequired: true
//     },
//     {
//       id: 'lastName',
//       question: 'What is your last name?',
//       type: 'text',
//       isRequired: true
//     },
//     {
//       id: 'phone',
//       question: 'What is your phone number?',
//       type: 'tel',
//       isRequired: true
//     },
//     {
//       id: 'email',
//       question: 'What email address should we send your quote to?',
//       type: 'email',
//       isRequired: true
//     },
//     {
//       id: 'additionalComments',
//       question: 'Is there anything else we should know about your project?',
//       type: 'textarea',
//       isRequired: false
//     }
//   ];

//   // Get the current question considering dependencies
//   const getCurrentQuestion = () => {
//     let index = currentQuestionIndex;
//     while (index < questionnaire.length) {
//       const question = questionnaire[index];
//       if (!question.dependsOn) {
//         return { question, index };
//       }
      
//       const dependencyValue = formData[question.dependsOn.id];
//       if (dependencyValue === question.dependsOn.value) {
//         return { question, index };
//       }
//       index++;
//     }
//     return { question: null, index: questionnaire.length };
//   };

//   const { question, index } = getCurrentQuestion();
  
//   // Handle form field changes
//   const handleChange = (id, value) => {
//     setFormData(prevData => ({
//       ...prevData,
//       [id]: value
//     }));
//   };

//   // Handle checkbox changes
//   const handleCheckboxChange = (id, option, checked) => {
//     setFormData(prevData => {
//       const currentOptions = prevData[id] || [];
//       if (checked) {
//         return {
//           ...prevData,
//           [id]: [...currentOptions, option]
//         };
//       } else {
//         return {
//           ...prevData,
//           [id]: currentOptions.filter(item => item !== option)
//         };
//       }
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     setIsLoading(true);
//     await addDocument(formData);
//     setFormSubmitted(true);
//     setIsLoading(false);
//   };

//   // Handle next button click
//   const handleNext = () => {
//     if (isCurrentQuestionValid()) {
//       setCurrentQuestionIndex(index + 1);
//     }
//   };

//   // Check if the current question response is valid
//   const isCurrentQuestionValid = () => {
//     if (!question || !question.isRequired) return true;
    
//     const value = formData[question.id];
//     if (question.type === 'checkbox') {
//       return Array.isArray(value) && value.length > 0;
//     }
//     return value !== undefined && value !== '';
//   };

//   // Check if it's the last question
//   const isLastQuestion = index >= questionnaire.length - 1;

//   // Handle going back to previous question
//   const handlePrevious = () => {
//     let prevIndex = currentQuestionIndex - 1;
//     while (prevIndex >= 0) {
//       const prevQuestion = questionnaire[prevIndex];
//       if (!prevQuestion.dependsOn || formData[prevQuestion.dependsOn.id] === prevQuestion.dependsOn.value) {
//         setCurrentQuestionIndex(prevIndex);
//         break;
//       }
//       prevIndex--;
//     }
//   };

//   const renderThankYouScreen = () => (
//     <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-green-700">Thank You!</h2>
//       <p className="mt-3 text-green-600">
//         Your information has been submitted successfully. We'll be in touch soon with your personalized flooring quote and to schedule your FREE design consultation!
//       </p>
//       <button
//         onClick={() => {
//           setFormData({});
//           setCurrentQuestionIndex(0);
//           setFormSubmitted(false);
//         }}
//         className="mt-5 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//       >
//         Start a New Consultation
//       </button>
//     </div>
//   );

//   const renderQuestionForm = () => {
//     if (!question) {
//       return null;
//     }

//     const renderInputField = () => {
//       switch (question.type) {
//         case 'checkbox':
//           return (
//             <div className="flex flex-wrap gap-3 mt-6">
//               {question.options.map((option, i) => {
//                 const isChecked = Array.isArray(formData[question.id]) && formData[question.id].includes(option);
//                 return (
//                   <label 
//                     key={i}
//                     className={`px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
//                       isChecked 
//                         ? 'bg-blue-600 text-white border-blue-700' 
//                         : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       className="sr-only"
//                       checked={isChecked}
//                       onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
//                     />
//                     {option}
//                   </label>
//                 );
//               })}
//             </div>
//           );
//         case 'radio':
//           return (
//             <div className="flex flex-col gap-3 mt-6">
//               {question.options.map((option, i) => (
//                 <label 
//                   key={i}
//                   className={`px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData[question.id] === option 
//                       ? 'bg-blue-600 text-white border-blue-700' 
//                       : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     className="sr-only"
//                     checked={formData[question.id] === option}
//                     onChange={() => handleChange(question.id, option)}
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//           );
//         case 'textarea':
//           return (
//             <textarea
//               className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
//               value={formData[question.id] || ''}
//               onChange={(e) => handleChange(question.id, e.target.value)}
//               rows={4}
//             />
//           );
//         default:
//           return (
//             <input
//               type={question.type}
//               className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
//               value={formData[question.id] || ''}
//               onChange={(e) => handleChange(question.id, e.target.value)}
//               pattern={question.pattern}
//             />
//           );
//       }
//     };

//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">
//             {question.question}
//           </h2>
//           <div className="text-sm text-gray-500">
//             Question {index + 1} of {questionnaire.length}
//           </div>
//         </div>
        
//         {renderInputField()}
        
//         <div className="flex justify-between mt-8">
//           <button
//             onClick={handlePrevious}
//             className={`px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors ${
//               currentQuestionIndex === 0 ? 'invisible' : ''
//             }`}
//           >
//             Back
//           </button>
          
//           {isLastQuestion ? (
//             <button
//               onClick={handleSubmit}
//               disabled={!isCurrentQuestionValid() || isLoading}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none"
//             >
//               {isLoading ? 'Submitting...' : 'GET MY FREE QUOTE'}
//             </button>
//           ) : (
//             <button
//               onClick={handleNext}
//               disabled={!isCurrentQuestionValid()}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none"
//             >
//               Next
//             </button>
//           )}
//         </div>
        
//         {isLastQuestion && (
//           <p className="mt-4 text-xs text-gray-500 text-center">
//             By submitting, you'll receive a personalized flooring quote plus a FREE design consultation!
//           </p>
//         )}
        
//         <div className="w-full bg-gray-200 h-2 mt-6 rounded-full overflow-hidden">
//           <div 
//             className="bg-blue-600 h-full transition-all duration-500 ease-in-out"
//             style={{ width: `${((index + 1) / questionnaire.length) * 100}%` }}
//           ></div>
//         </div>
//       </div>
//     );
//   };

//   if (formSubmitted && success) {
//     return renderThankYouScreen();
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6">Professional Flooring Consultation</h1>
      
//       {error && (
//         <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
//           {error}
//         </div>
//       )}
      
//       {renderQuestionForm()}
//     </div>
//   );
// };

// // export default FlooringQuestionnaireForm;
// 'use client';

// import React, { useState, useRef } from 'react';
// import { useFirestore } from '@/hooks/useFirestore';
// import InstantQuoteCalculator from './InstantQuoteCalculator';

// // Define TypeScript interfaces for the form


// const FlooringQuestionnaireForm = () => {
//   const { addDocument, error, success } = useFirestore('flooringConsultations');
  
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [formData, setFormData] = useState({});
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   // Reference to store the calculated quote amount
//   const calculatedQuoteRef = useRef(null);

//   // Define the questionnaire structure
//   const questionnaire = [
//     {
//       id: 'flooringType',
//       question: 'What type of flooring are you interested in?',
//       type: 'checkbox',
//       options: [
//         'Laminate',
//         'Engineered Wood',
//         'Hardwood',
//         'Luxury Vinyl Plank/Tile',
//         'Carpet'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'squareFeet',
//       question: 'How many square feet does your project cover?',
//       type: 'number',
//       isRequired: true
//     },
//     {
//       id: 'roomCount',
//       question: 'How many rooms will be included in this project?',
//       type: 'number',
//       isRequired: true
//     },
//     {
//       id: 'hasStairs',
//       question: 'Will the project include any stairs?',
//       type: 'radio',
//       options: ['Yes', 'No'],
//       isRequired: true
//     },
//     {
//       id: 'stairCount',
//       question: 'How many stairs?',
//       type: 'number',
//       isRequired: true,
//       dependsOn: { id: 'hasStairs', value: 'Yes' }
//     },
//     {
//       id: 'toiletRemoval',
//       question: 'Will toilets need to be removed during installation?',
//       type: 'radio',
//       options: ['Yes', 'No'],
//       isRequired: true
//     },
//     {
//       id: 'toiletCount',
//       question: 'How many toilets?',
//       type: 'number',
//       isRequired: true,
//       dependsOn: { id: 'toiletRemoval', value: 'Yes' }
//     },
//     {
//       id: 'removalNeeded',
//       question: 'Do you need removal and disposal of existing flooring?',
//       type: 'radio',
//       options: [
//         'Yes',
//         'No, I\'ll handle removal',
//         'No, the area is already prepared'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'existingFlooringType',
//       question: 'What type of existing flooring will be removed?',
//       type: 'radio',
//       options: ['Carpet', 'Laminate', 'Hardwood', 'Tile', 'Vinyl', 'Other'],
//       isRequired: true,
//       dependsOn: { id: 'removalNeeded', value: 'Yes' }
//     },
//     {
//       id: 'timeline',
//       question: 'When would you like to have this project completed?',
//       type: 'radio',
//       options: [
//         'As soon as possible (within 7 days)',
//         'Within 30 days',
//         'Within 60 days',
//         'Just exploring options for now'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'motivation',
//       question: 'What\'s the primary reason for your new flooring?',
//       type: 'radio',
//       options: [
//         'Moving into a new home',
//         'Renovation/updating my space',
//         'Preparing to sell my home',
//         'New construction',
//         'Replacing damaged flooring'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'decisionStage',
//       question: 'Where are you in your decision process?',
//       type: 'radio',
//       options: [
//         'Just starting to research',
//         'Getting quotes from multiple companies',
//         'Ready to choose a provider',
//         'Have a firm budget and timeline in place'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'specialConsiderations',
//       question: 'Do any of these apply to your home?',
//       type: 'checkbox',
//       options: [
//         'Pets in the home',
//         'Children in the home',
//         'Need waterproof/water-resistant flooring',
//         'Concerned about sound between floors',
//         'Have floor heating system'
//       ],
//       isRequired: false
//     },
//     {
//       id: 'referralSource',
//       question: 'How did you hear about us?',
//       type: 'radio',
//       options: [
//         'Friend or family recommendation',
//         'Google search',
//         'Social media',
//         'Previous customer',
//         'Advertisement',
//         'Other'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'zipCode',
//       question: 'What is your zip code?',
//       type: 'text',
//       isRequired: true,
//       pattern: '[0-9]{5}'
//     },
//     {
//       id: 'contactTime',
//       question: 'When is the best time to contact you?',
//       type: 'radio',
//       options: [
//         'Morning (8am-12pm)',
//         'Afternoon (12pm-5pm)',
//         'Evening (5pm-8pm)'
//       ],
//       isRequired: true
//     },
//     {
//       id: 'firstName',
//       question: 'What is your first name?',
//       type: 'text',
//       isRequired: true
//     },
//     {
//       id: 'lastName',
//       question: 'What is your last name?',
//       type: 'text',
//       isRequired: true
//     },
//     {
//       id: 'phone',
//       question: 'What is your phone number?',
//       type: 'tel',
//       isRequired: true
//     },
//     {
//       id: 'email',
//       question: 'What email address should we send your quote to?',
//       type: 'email',
//       isRequired: true
//     },
//     {
//       id: 'additionalComments',
//       question: 'Is there anything else we should know about your project?',
//       type: 'textarea',
//       isRequired: false
//     }
//   ];

//   // Get the current question considering dependencies
//   const getCurrentQuestion = () => {
//     let index = currentQuestionIndex;
//     while (index < questionnaire.length) {
//       const question = questionnaire[index];
//       if (!question.dependsOn) {
//         return { question, index };
//       }
      
//       const dependencyValue = formData[question.dependsOn.id];
//       if (dependencyValue === question.dependsOn.value) {
//         return { question, index };
//       }
//       index++;
//     }
//     return { question: null, index: questionnaire.length };
//   };

//   const { question, index } = getCurrentQuestion();
  
//   // Handle form field changes
//   const handleChange = (id, value) => {
//     setFormData(prevData => ({
//       ...prevData,
//       [id]: value
//     }));
//   };

//   // Handle checkbox changes
//   const handleCheckboxChange = (id, option, checked) => {
//     setFormData(prevData => {
//       const currentOptions = prevData[id] || [];
//       if (checked) {
//         return {
//           ...prevData,
//           [id]: [...currentOptions, option]
//         };
//       } else {
//         return {
//           ...prevData,
//           [id]: currentOptions.filter(item => item !== option)
//         };
//       }
//     });
//   };

//   // Get quote calculation from InstantQuoteCalculator
//   const getQuoteAmount = () => {
//     // This will be populated by the ref in QuoteCalculator
//     return calculatedQuoteRef.current || 0;
//   };

//   // Function to capture the quote value
//   const captureQuoteValue = (quoteValue) => {
//     calculatedQuoteRef.current = quoteValue;
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     setIsLoading(true);
    
//     // Get the final quote amount
//     const quoteAmount = getQuoteAmount();
    
//     // Add the quote amount to the form data
//     const finalFormData = {
//       ...formData,
//       quoteAmount: quoteAmount,
//       submittedAt: new Date()
//     };
    
//     // Submit the form data with the quote amount
//     await addDocument(finalFormData);
//     setFormSubmitted(true);
//     setIsLoading(false);
//   };

//   // Handle next button click
//   const handleNext = () => {
//     if (isCurrentQuestionValid()) {
//       setCurrentQuestionIndex(index + 1);
//     }
//   };

//   // Check if the current question response is valid
//   const isCurrentQuestionValid = () => {
//     if (!question || !question.isRequired) return true;
    
//     const value = formData[question.id];
//     if (question.type === 'checkbox') {
//       return Array.isArray(value) && value.length > 0;
//     }
//     return value !== undefined && value !== '';
//   };

//   // Check if it's the last question
//   const isLastQuestion = index >= questionnaire.length - 1;

//   // Handle going back to previous question
//   const handlePrevious = () => {
//     let prevIndex = currentQuestionIndex - 1;
//     while (prevIndex >= 0) {
//       const prevQuestion = questionnaire[prevIndex];
//       if (!prevQuestion.dependsOn || formData[prevQuestion.dependsOn.id] === prevQuestion.dependsOn.value) {
//         setCurrentQuestionIndex(prevIndex);
//         break;
//       }
//       prevIndex--;
//     }
//   };

//   const renderThankYouScreen = () => (
//     <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-green-700">Thank You!</h2>
//       <p className="mt-3 text-green-600">
//         Your information has been submitted successfully. We&apos;ll be in touch soon with your personalized flooring quote and to schedule your FREE design consultation!
//       </p>
//       <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
//         <h3 className="text-lg font-semibold text-gray-800">Your Estimated Quote</h3>
//         <InstantQuoteCalculator 
//           formData={formData} 
//           onQuoteCalculated={captureQuoteValue}
//         />
//         <p className="mt-2 text-sm text-gray-600 font-semibold">* Quote is for materials only. Installation costs will be determined during your consultation.</p>
//       </div>
//       <button
//         onClick={() => {
//           setFormData({});
//           setCurrentQuestionIndex(0);
//           setFormSubmitted(false);
//         }}
//         className="mt-5 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//       >
//         Start a New Consultation
//       </button>
//     </div>
//   );

//   const renderQuestionForm = () => {
//     if (!question) {
//       return null;
//     }

//     const renderInputField = () => {
//       switch (question.type) {
//         case 'checkbox':
//           return (
//             <div className="flex flex-wrap gap-3 mt-6">
//               {question.options.map((option, i) => {
//                 const isChecked = Array.isArray(formData[question.id]) && formData[question.id].includes(option);
//                 return (
//                   <label 
//                     key={i}
//                     className={`px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
//                       isChecked 
//                         ? 'bg-blue-600 text-white border-blue-700' 
//                         : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       className="sr-only" 
//                       checked={isChecked}
//                       onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
//                     />
//                     {option}
//                   </label>
//                 );
//               })}
//             </div>
//           );
//         case 'radio':
//           return (
//             <div className="flex flex-col gap-3 mt-6">
//               {question.options.map((option, i) => (
//                 <label 
//                   key={i}
//                   className={`px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData[question.id] === option 
//                       ? 'bg-blue-600 text-white border-blue-700' 
//                       : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     className="sr-only"
//                     checked={formData[question.id] === option}
//                     onChange={() => handleChange(question.id, option)}
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//           );
//         case 'textarea':
//           return (
//             <textarea
//               className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-black"
//               value={formData[question.id] || ''}
//               onChange={(e) => handleChange(question.id, e.target.value)}
//               rows={4}
//             />
//           );
//         default:
//           return (
//             <input
//               type={question.type}
//               className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-black"
//               value={formData[question.id] || ''}
//               onChange={(e) => handleChange(question.id, e.target.value)}
//               pattern={question.pattern}
//             />
//           );
//       }
//     };

//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">
//             {question.question}
//           </h2>
//           <div className="text-sm text-gray-500">
//             Question {index + 1} of {questionnaire.length}
//           </div>
//         </div>
        
//         {renderInputField()}
        
//         <div className="flex justify-between mt-8">
//           <button
//             onClick={handlePrevious}
//             className={`px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors ${
//               currentQuestionIndex === 0 ? 'invisible' : ''
//             }`}
//           >
//             Back
//           </button>
          
//           {isLastQuestion ? (
//             <button
//               onClick={handleSubmit}
//               disabled={!isCurrentQuestionValid() || isLoading}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none"
//             >
//               {isLoading ? 'Submitting...' : 'GET MY FREE QUOTE'}
//             </button>
//           ) : (
//             <button
//               onClick={handleNext}
//               disabled={!isCurrentQuestionValid()}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none"
//             >
//               Next
//             </button>
//           )}
//         </div>
        
//         {isLastQuestion && (
//           <p className="mt-4 text-xs text-gray-500 text-center">
//             By submitting, you&apos;ll receive a personalized flooring quote plus a FREE design consultation!
//           </p>
//         )}
        
//         <div className="w-full bg-gray-200 h-2 mt-6 rounded-full overflow-hidden">
//           <div 
//             className="bg-blue-600 h-full transition-all duration-500 ease-in-out"
//             style={{ width: `${((index + 1) / questionnaire.length) * 100}%` }}
//           ></div>
//         </div>
//       </div>
//     );
//   };

//   // Determine if we should show the quote calculator
//   const shouldShowQuoteCalculator = () => {
//     return (
//       formData.squareFeet && 
//       (formData.flooringType && formData.flooringType.length > 0) && 
//       !formSubmitted
//     );
//   };

//   if (formSubmitted && success) {
//     return renderThankYouScreen();
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6">Flooring Quote</h1>
      
//       {error && (
//         <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
//           {error}
//         </div>
//       )}
      
//       {renderQuestionForm()}
      
//       {shouldShowQuoteCalculator() && (
//         <div className="mt-6">
//           <InstantQuoteCalculator 
//             formData={formData} 
//             onQuoteCalculated={captureQuoteValue}
//           />
//           <p className="mt-2 text-sm text-gray-600 font-semibold text-center">* Quote is for materials only. Installation costs will be determined during your consultation.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlooringQuestionnaireForm;
'use client';

import React, { useState, useRef } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import InstantQuoteCalculator from './InstantQuoteCalculator';
import { FormData, Question, FirestoreHookResult } from './types';

const FlooringQuestionnaireForm: React.FC = () => {

  const firestoreHook = useFirestore('flooringConsultations');
  const { addDocument, error, success } = firestoreHook as unknown as FirestoreHookResult;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      id: 'firstName',
      question: 'What is your first name?',
      type: 'text',
      isRequired: true
    },
    {
      id: 'lastName',
      question: 'What is your last name?',
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
    setFormData(prevData => ({
      ...prevData,
      [id]: value
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
    setIsLoading(true);
    
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
    setIsLoading(false);
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
    <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700">Thank You!</h2>
      <p className="mt-3 text-gray-700">
        Your information has been submitted successfully. We&apos;re excited to help you with your flooring project!
      </p>
      
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">Your Estimated Installation Quote</h3>
        <InstantQuoteCalculator 
          formData={formData} 
          onQuoteCalculated={captureQuoteValue}
        />
        <p className="mt-2 text-sm text-gray-600 italic">
          * This estimate covers labor and installation costs only. Materials can be purchased separately or through us at competitive prices.
        </p>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg bg-white">
          <h4 className="font-semibold text-gray-800">Next Steps</h4>
          <ul className="mt-2 space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span>A flooring consultant will contact you at your preferred time to discuss your project in detail.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span>We&apos;ll help you choose the right materials for your space and budget.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              <span>You&apos;ll receive a final quote that includes both materials and installation.</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg bg-white">
          <h4 className="font-semibold text-gray-800">Have Questions?</h4>
          <p className="mt-2 text-sm text-gray-600">
            For immediate assistance, call us at <a href="tel:5551234567" className="text-blue-600 font-semibold">(555) 123-4567</a> or email us at <a href="mailto:info@flooringpros.com" className="text-blue-600 font-semibold">info@flooringpros.com</a>
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <a
         href="/schedule-consultation"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Schedule Your Consultation
        </a>
        
        <a
         href="/flooring-materials"
         className="px-6 py-3 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Browse Flooring Materials
        </a>
      </div>
      
      <p className="mt-6 text-sm text-gray-500">
        A copy of your quote has been sent to {formData.email}. If you don&apos;t see it, please check your spam folder.
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
            <textarea
              placeholder="Have any special requests or important details? Let us know here!"
              className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-[#1976D2] focus:ring-[#1976D2] text-black"
              value={(formData[question.id] || '') as string}
              onChange={(e) => handleChange(question.id, e.target.value)}
              rows={4}
            />
          );
        case 'number':
          return (
            <input
              id={question.id}
              type={question.type}
              className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-[#1976D2] focus:ring-[#1976D2] text-black"
              value={(formData[question.id] || '') as string}
              onChange={(e) => handleChange(question.id, e.target.value)}
              min={question.min || 0}
              max={question.max || undefined}
              aria-label={question.label || `Enter ${question.id}`}
            />
          );
        default:
          return (
            <input
              id={question.id}
              type={question.type}
              className="w-full mt-4 p-3 border-2 border-gray-300 rounded-lg focus:border-[#1976D2] focus:ring-[#1976D2] text-black"
              value={(formData[question.id] || '') as string}
              onChange={(e) => handleChange(question.id, e.target.value)}
              pattern={question.pattern}
              aria-label={question.label || `Enter ${question.id}`}
            />
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
              disabled={!isCurrentQuestionValid() || isLoading}
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
            By submitting, you&apos;ll receive a personalized flooring quote plus a FREE design consultation!
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
    // Modified to check for a single selected flooring type (string) instead of an array
    return (
      !!formData.squareFeet && 
      !!formData.flooringType && 
      !formSubmitted
    );
  };

  if (formSubmitted && success) {
    return renderThankYouScreen();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Flooring Quote</h1>
      
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {renderQuestionForm()}
      
      {shouldShowQuoteCalculator() && (
        <div className="mt-6">
          <InstantQuoteCalculator 
            formData={formData} 
            onQuoteCalculated={captureQuoteValue}
          />
          <p className="mt-2 text-sm text-gray-600 font-semibold text-center">* Quote is for materials only. Installation costs will be determined during your consultation.</p>
        </div>
      )}
    </div>
  );
};

export default FlooringQuestionnaireForm;