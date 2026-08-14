'use client';

import Sidebar from '@/components/Sidebar';
import ProductForm from '@/components/ProductForm';

export default function NewProductPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <ProductForm />
      </main>
    </div>
  );
}
