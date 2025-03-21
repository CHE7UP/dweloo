'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useFirestore } from '@/hooks/useFirestore';

type Subscription = {
  email: string;
};

const SubscriptionForm: React.FC = () => {
  const { addDocument, error, success } = useFirestore('subscriptions');

  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const subscription: Subscription = {
      email: email
    };

    await addDocument(subscription);
    setFormSubmitted(true);
    setIsLoading(false);
  };

  const handleReset = () => {
    setEmail('');
    setFormSubmitted(false);
  };

  if (formSubmitted && success) {
    return (
      <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-700">Subscription Successful!</h2>
        <p className="mt-3 text-green-600">
          Thank you for subscribing to our newsletter.
        </p>        
        <button
          onClick={handleReset}
          className="mt-5 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Subscribe Another Email
        </button>
      </div>
    );
  }
  
  return (
      <div>  
      {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
            {error}
            </div>
        )}
    <form onSubmit={handleSubmit}>
    <div className="mt-4 flex flex-row items-center gap-3 bg-white rounded-lg p-2">
      <div className="flex-grow">
        <label 
        htmlFor="email" 
        className="sr-only font-medium text-gray-700"
        >
        Subscribe to our newsletter
        </label>
        <input
        type="email" 
        id="email" 
        name="email" 
        className="py-1 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
         placeholder="Enter your email"
         value={email} 
         onChange={handleChange} 
         required
         />
      </div>
      <button 
        type="submit"
        disabled={isLoading}  
        className="whitespace-nowrap p-2 inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-[#1E88E5] text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? 'Subscribing...' : 'Get Inspired'}
      </button>
    </div>
    <p className="mt-3 text-xs text-gray-400">
      Home improvement tips and exclusive offers. Never spam.
    </p>
  </form>
    </div>
  );
};

export default SubscriptionForm;



       