
"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setStatus(null);
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/log-click`, {
        timestamp: new Date(),
        action: 'button_clicked'
      });
      
      setStatus({ type: 'success', message: 'Click logged successfully!' });
    } catch (error) {
      console.error('Error logging click:', error);
      setStatus({ type: 'error', message: 'Failed to log click. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Simple Click Logger</h1>
        
        <p className="text-center text-gray-600">
          Click the button below to log an entry in the database
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            disabled={loading}
            className={`px-6 py-3 text-white font-medium rounded-md transition
              ${loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}`}
          >
            {loading ? 'Logging...' : 'Log Click to Database'}
          </button>
        </div>
        
        {status && (
          <div className={`p-4 rounded-md ${
            status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {status.message}
          </div>
        )}
      </div>
    </main>
  );
}
