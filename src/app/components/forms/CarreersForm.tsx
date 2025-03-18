import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CareerApplication } from '../../types';
import { useFirestore } from '@/hooks/useFirestore';
import { documentId } from 'firebase/firestore';
import { CheckCircle, Upload, Loader } from 'lucide-react';

const CareersForm: React.FC = () => {
  const { addDocument, error, success } = useFirestore('careerApplications');

  const [formData, setFormData] = useState<Omit<
    CareerApplication,
    'id' | 'resumeUrl' | 'status' | 'createdAt' | 'updatedAt'
  >>({
    fullName: '',
    city: '',
    phoneNumber: '',
    message: '',
  });

  const [resume, setResume] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResume(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const application: Partial<CareerApplication> = {
      ...formData,
      status: 'new',
    };

    await addDocument(application, resume ? { resumeUrl: resume } : undefined);
    setFormSubmitted(true);
    setIsLoading(false);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      city: '',
      phoneNumber: '',
      message: '',
    });
    setResume(null);
    setFormSubmitted(false);
  };

  if (formSubmitted && success) {
    return (
      <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md">
        <div className="flex items-center mb-3">
          <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold text-green-700">Application Submitted!</h2>
        </div>
        <p className="mt-3 text-green-600">
          Your application has been received. Reference ID: {typeof documentId === 'string' ? documentId : 'N/A'}
        </p>        
        <button
          onClick={handleReset}
          className="mt-5 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Submit Another Application
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Careers Application Form</h2>
  
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md mb-6">
          {error}
        </div>
      )}
  
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-2 font-medium text-gray-700">Full Name</label>
            <input 
              id="fullName" 
              name="fullName" 
              placeholder="Full Name" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="city" className="mb-2 font-medium text-gray-700">City</label>
            <input 
              id="city" 
              name="city" 
              placeholder="City" 
              value={formData.city} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="mb-2 font-medium text-gray-700">Phone Number</label>
            <input 
              id="phoneNumber" 
              name="phoneNumber" 
              type="tel" 
              placeholder="(123) 456-7890" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
              required 
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="message" className="mb-2 font-medium text-gray-700">Message</label>
            <textarea 
              id="message" 
              name="message" 
              placeholder="Tell us about yourself and why you're interested in working with us" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows={4}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 placeholder-gray-400 resize-vertical"
            />
          </div>
          
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="resume" className="mb-2 font-medium text-gray-700">Upload Resume (optional)</label>
            <div className="flex items-center relative">
              <input 
                id="resume" 
                name="resume" 
                type="file" 
                onChange={handleResumeChange} 
                accept=".pdf,.doc,.docx" 
                className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <Upload className="absolute right-3 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
  
        <button 
          type="submit" 
          disabled={isLoading} 
          className="mt-6 px-6 py-3 bg-[#1976D2] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin mr-2 h-5 w-5" />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </div>
  );
};

export default CareersForm;