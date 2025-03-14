// app/warranty/page.tsx (Next.js app router example)
'use client';

import React from 'react';
import WarrantyForm from '../components/WarranyForm';

export default function WarrantyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Submit a Warranty Claim</h1>
      <WarrantyForm />
    </div>
  );
}