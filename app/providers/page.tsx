'use client';

import { useState, useEffect } from 'react';
import { Provider, InsurancePlan, Language, LANGUAGES, Degree, DEGREES } from '../types';
import ProviderCard from '../components/ProviderCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Header from '../components/Header';
import Link from 'next/link';

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePayers, setActivePayers] = useState<InsurancePlan[]>([]);
  const [filters, setFilters] = useState({
    insurancePlans: [] as InsurancePlan[],
    languages: [...LANGUAGES] as Language[],
    acceptingPatients: null as boolean | null,
    degrees: [...DEGREES] as Degree[],
  });
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch active payers on component mount
  useEffect(() => {
    const fetchActivePayers = async () => {
      try {
        const response = await fetch('/api/active-payers');
        if (!response.ok) throw new Error('Failed to fetch active payers');
        const data = await response.json();
        const payerNames = data.map((payer: any) => payer.displayName);
        setActivePayers(payerNames);
        // Initialize filters with all active payers selected
        setFilters(prev => ({
          ...prev,
          insurancePlans: payerNames
        }));
      } catch (error) {
        console.error('Error fetching active payers:', error);
      }
    };

    fetchActivePayers();
  }, []);

  useEffect(() => {
    const fetchProviders = async () => {
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams();
        if (searchQuery) searchParams.set('search', searchQuery);
        
        // Apply insurance filter if not all plans are selected
        if (filters.insurancePlans.length < activePayers.length) {
          searchParams.set('insurancePlans', filters.insurancePlans.join(','));
        }
        
        // Only apply language filter if some (but not all) languages are selected
        if (filters.languages.length > 0 && filters.languages.length < LANGUAGES.length) {
          searchParams.set('languages', filters.languages.join(','));
        }
        
        if (filters.acceptingPatients !== null) {
          searchParams.set('acceptingPatients', filters.acceptingPatients.toString());
        }
        
        // Only apply degree filter if some (but not all) degrees are selected
        if (filters.degrees.length > 0 && filters.degrees.length < DEGREES.length) {
          searchParams.set('degrees', filters.degrees.join(','));
        }

        const response = await fetch(`/api/providers?${searchParams.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch providers');
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchProviders, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, filters, activePayers]);

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="text-sm tracking-widest text-text font-light mb-8">
              OUR PROVIDERS
            </div>
            <h1 className="text-3xl font-serif text-text max-w-3xl">
              We only work with psychiatrists with the best training — both in medicine and in bedside manner.
            </h1>
            <Link 
              href="/book"
              className="inline-block mt-8 px-6 py-3 bg-[#BF9C73] text-white rounded hover:bg-[#A88B68] transition-colors"
            >
              Book by availability
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter sidebar */}
            <div className="lg:w-64 space-y-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search . . ."
                title="Search providers by name or keyword in bio"
              />
              <FilterPanel 
                filters={filters} 
                onChange={setFilters}
                availableInsurancePlans={activePayers}
              />
            </div>

            {/* Main content area */}
            <div className="flex-grow">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : providers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No providers found matching your criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {providers.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 