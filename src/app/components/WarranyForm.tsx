import React, { useState, ChangeEvent, FormEvent } from 'react';
import { WarrantyClaim } from '../types';
import { useFirestore } from '@/hooks/useFirestore';
import { documentId } from 'firebase/firestore';
const WarrantyForm: React.FC = () => {
  const { addDocument, error, success } = useFirestore('warrantyClaims');

  const [formData, setFormData] = useState<Omit<
    WarrantyClaim,
    'id' | 'damagePhotoUrl' | 'status' | 'createdAt' | 'updatedAt'
  >>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    invoiceNumber: '',
    serviceDate: '',
    description: '',
  });

  const [damagePhoto, setDamagePhoto] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDamagePhoto(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const claim: Partial<WarrantyClaim> = {
      ...formData,
      status: 'pending',
    };

    await addDocument(claim, damagePhoto ? { damagePhotoUrl: damagePhoto } : undefined);
    setFormSubmitted(true);
    setIsLoading(false);
  };

  const handleReset = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      invoiceNumber: '',
      serviceDate: '',
      description: '',
    });
    setDamagePhoto(null);
    setFormSubmitted(false);
  };

  if (formSubmitted && success) {
    return (
      <div className="p-4 bg-green-100 border border-green-400 rounded-md">
        <h2 className="text-xl font-semibold text-green-800">Warranty Claim Submitted!</h2>
        <p className="mt-2">
  Your claim has been received. Reference ID: {typeof documentId === 'string' ? documentId : 'N/A'}
</p>        
<button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit Another Claim
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Warranty Claim Form</h2>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="customerName" className="mb-1">Customer Name</label>
            <input 
              id="customerName" 
              name="customerName" 
              placeholder="Full Name" 
              value={formData.customerName} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="customerEmail" className="mb-1">Email Address</label>
            <input 
              id="customerEmail" 
              name="customerEmail" 
              type="email" 
              placeholder="email@example.com" 
              value={formData.customerEmail} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="customerPhone" className="mb-1">Phone Number</label>
            <input 
              id="customerPhone" 
              name="customerPhone" 
              type="tel" 
              placeholder="(123) 456-7890" 
              value={formData.customerPhone} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1">Street Address</label>
            <input 
              id="address" 
              name="address" 
              placeholder="123 Main St" 
              value={formData.address} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1">City</label>
            <input 
              id="city" 
              name="city" 
              placeholder="City" 
              value={formData.city} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="mb-1">State</label>
            <input 
              id="state" 
              name="state" 
              placeholder="State" 
              value={formData.state} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="zipCode" className="mb-1">Zip Code</label>
            <input 
              id="zipCode" 
              name="zipCode" 
              placeholder="Postal Code" 
              value={formData.zipCode} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="invoiceNumber" className="mb-1">Invoice Number</label>
            <input 
              id="invoiceNumber" 
              name="invoiceNumber" 
              placeholder="Invoice #" 
              value={formData.invoiceNumber} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="serviceDate" className="mb-1">Service Date</label>
            <input 
              id="serviceDate" 
              name="serviceDate" 
              type="date" 
              value={formData.serviceDate} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1">Description</label>
            <textarea 
              id="description" 
              name="description" 
              placeholder="Describe the issue" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="damagePhoto" className="mb-1">Upload Damage Photo</label>
            <input 
              id="damagePhoto" 
              name="damagePhoto" 
              type="file" 
              onChange={handlePhotoChange} 
              accept="image/*" 
              className="border p-2 rounded-md"
            />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          {isLoading ? 'Submitting...' : 'Submit Claim'}
        </button>
      </form>
    </div>
  );
};

export default WarrantyForm;