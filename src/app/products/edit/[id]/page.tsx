'use client';

import { useEffect, useState, use } from 'react';
import { api } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import ProductForm from '@/components/ProductForm';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products`);
        const list = res.data.data?.products || res.data.data || [];
        const found = list.find((p: any) => p._id === productId);

        if (found) {
          setProduct(found);
        } else {
          setError('Product not found.');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-slate-500">
            Loading product details...
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-sm">
            {error}
          </div>
        ) : (
          <ProductForm initialData={product} productId={productId} />
        )}
      </main>
    </div>
  );
}
