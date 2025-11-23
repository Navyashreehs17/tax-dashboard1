import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-slate-700 font-medium">Loading...</p>
    </div>
  );
};
