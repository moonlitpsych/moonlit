'use client';

import React, { useState, useEffect } from 'react';
import ProviderForm from '../components/ProviderForm';
import { Provider } from '../types';

export default function AdminPage() {
  const [message, setMessage] = useState<string>('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch providers on component mount
  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await fetch('/api/providers');
      if (!response.ok) throw new Error('Failed to fetch providers');
      const data = await response.json();
      setProviders(data);
    } catch (error) {
      setMessage('Error fetching providers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (type: 'providers') => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('type', type);
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.csv';
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        
        formData.append('file', file);
        
        const response = await fetch('/api/import', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        setMessage(data.message);
      };
      
      input.click();
    } catch (error) {
      console.error('Error importing data:', error);
      setMessage('Error importing data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (type: 'providers') => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/export/${type}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      setMessage(`Successfully exported ${type}`);
    } catch (error) {
      console.error('Error exporting data:', error);
      setMessage('Error exporting data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSubmit = async (data: any) => {
    try {
      const url = '/api/providers';
      const method = selectedProvider ? 'PUT' : 'POST';
      const body = selectedProvider ? { ...data, id: selectedProvider.id } : data;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Failed to save provider');
      
      setMessage(`Successfully ${selectedProvider ? 'updated' : 'added'} provider`);
      setShowForm(false);
      setSelectedProvider(null);
      fetchProviders();
    } catch (error) {
      setMessage('Error saving provider');
    }
  };

  const handleDelete = async (provider: Provider) => {
    if (!confirm('Are you sure you want to delete this provider?')) return;

    try {
      const response = await fetch('/api/providers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: provider.id }),
      });

      if (!response.ok) throw new Error('Failed to delete provider');
      
      setMessage('Successfully deleted provider');
      fetchProviders();
    } catch (error) {
      setMessage('Error deleting provider');
    }
  };

  return (
    <main className="min-h-screen bg-[#FEF8F1] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif text-[#091747] mb-8">Moonlit Admin</h1>
        
        {message && (
          <div className={`p-4 mb-8 rounded ${message.includes('Error') ? 'bg-red-100' : 'bg-green-100'}`}>
            {message}
          </div>
        )}
        
        {showForm ? (
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-[#091747] mb-4">
              {selectedProvider ? 'Edit Provider' : 'Add New Provider'}
            </h2>
            <ProviderForm
              provider={selectedProvider || undefined}
              onSubmit={handleProviderSubmit}
              onCancel={() => {
                setShowForm(false);
                setSelectedProvider(null);
              }}
            />
          </div>
        ) : (
          <>
            {/* Providers Section */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-serif text-[#091747]">Providers</h2>
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-[#091747] text-white px-4 py-2 rounded hover:bg-[#0c1f5e]"
                >
                  Add New Provider
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    className="bg-[#091747] text-white px-4 py-2 rounded hover:bg-[#0c1f5e] disabled:opacity-50"
                    onClick={() => handleImport('providers')}
                    disabled={isLoading}
                  >
                    Import Providers (CSV)
                  </button>
                  <button
                    className="bg-[#091747] text-white px-4 py-2 rounded hover:bg-[#0c1f5e] disabled:opacity-50"
                    onClick={() => handleExport('providers')}
                    disabled={isLoading}
                  >
                    Export Providers (CSV)
                  </button>
                </div>
                
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={4} className="text-center py-4">Loading...</td>
                        </tr>
                      ) : providers.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-4">No providers found</td>
                        </tr>
                      ) : (
                        providers.map((provider) => (
                          <tr key={provider.id} className="border-t">
                            <td className="px-4 py-2">{provider.firstName} {provider.lastName}</td>
                            <td className="px-4 py-2">{provider.title || '-'}</td>
                            <td className="px-4 py-2">{provider.personalEmail}</td>
                            <td className="px-4 py-2">
                              <button
                                onClick={() => {
                                  setSelectedProvider(provider);
                                  setShowForm(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(provider)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
} 