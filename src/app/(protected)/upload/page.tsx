'use client';
import { useRouter } from 'next/navigation';

export default function CreateLeadMagnetSelection() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <button
        onClick={() => router.push('/dashboard')}
        className="mb-8 text-gray-600 hover:text-gray-900 text-sm underline"
      >
        ← Back to Home
      </button>
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-4">Create Lead Magnet</h1>
        <button
          disabled
          className="w-full py-3 rounded border border-gray-200 bg-gray-100 text-gray-400 font-medium cursor-not-allowed flex items-center justify-between"
        >
          <span>Start from scratch</span>
          <span className="text-xs ml-2">(coming soon)</span>
        </button>
        <button
          onClick={() => router.push('/upload/pdf')}
          className="w-full py-3 rounded border border-black bg-black text-white font-medium hover:bg-gray-900 transition-colors"
        >
          Upload a PDF
        </button>
        <button
          disabled
          className="w-full py-3 rounded border border-gray-200 bg-gray-100 text-gray-400 font-medium cursor-not-allowed flex items-center justify-between"
        >
          <span>Build with Notion file</span>
          <span className="text-xs ml-2">(coming soon)</span>
        </button>
      </div>
    </div>
  );
} 