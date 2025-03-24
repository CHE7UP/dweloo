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

    // This effect runs when formSubmitted and success change
    React.useEffect(() => {
      if (formSubmitted && success) {
        const timer = setTimeout(() => {
          handleReset();
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }, [formSubmitted, success]);

  if (formSubmitted && success) {
  
    return (
      <div className="p-4 bg-white border-l-2 border-[#1976D2] rounded shadow-sm animate-fade-out">
        <h3 className="text-lg font-medium text-[#1976D2]">Subscription confirmed</h3>
        <p className="mt-1 text-sm text-gray-600">
          Home inspiration coming your way soon.
        </p>
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
        <div className="text-gray-900">
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



       