'use client';

import { useState, useEffect } from 'react';
import {
  getPersonByEmail,
  getPersonByPhone,
  testConnection,
  type Person,
} from '@/services/fubClient';
import ContactCard from '@/components/ContactCard';
import {
  getSearchHistory,
  addToSearchHistory,
  clearSearchHistory,
  type SearchHistoryItem,
} from '@/lib/searchHistory';

export default function Home() {
  const [searchType, setSearchType] = useState<'email' | 'phone'>('email');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Person[] | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(true);

  // Load search history on mount
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  const handleTestConnection = async () => {
    setLoading(true);
    setError(null);
    setConnectionStatus('idle');

    try {
      await testConnection();
      setConnectionStatus('success');
    } catch (err) {
      setConnectionStatus('error');
      setError(err instanceof Error ? err.message : 'Connection test failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchType, searchValue);
  };

  const performSearch = async (type: 'email' | 'phone', value: string) => {
    setLoading(true);
    setError(null);
    setResults(null);
    setShowHistory(false);

    try {
      let response;
      if (type === 'email') {
        response = await getPersonByEmail(value);
      } else {
        response = await getPersonByPhone(value);
      }

      setResults(response.people || []);

      // Add to search history
      addToSearchHistory(type, value);
      setSearchHistory(getSearchHistory());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (item: SearchHistoryItem) => {
    setSearchType(item.type);
    setSearchValue(item.value);
    performSearch(item.type, item.value);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  const handleViewDetails = (person: Person) => {
    // Placeholder for Phase A3 - will open sidebar
    alert(`Phase A3 will open sidebar for ${person.name || person.id}`);
  };

  const handleNewSearch = () => {
    setSearchValue('');
    setResults(null);
    setError(null);
    setShowHistory(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            FUB Lead Viewer
          </h1>
          <p className="text-gray-600">
            Phase A2: Enhanced manual contact lookup
          </p>
        </div>

        {/* Connection Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Connection Test
          </h2>
          <button
            onClick={handleTestConnection}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading && connectionStatus === 'idle' ? 'Testing...' : 'Test FUB Connection'}
          </button>

          {connectionStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✓ Connection successful! FUB API is reachable.
              </p>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">✗ Connection failed</p>
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>
          )}
        </div>

        {/* Contact Search */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Contact Lookup
            </h2>
            {results && (
              <button
                onClick={handleNewSearch}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + New Search
              </button>
            )}
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Type Selector */}
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="email"
                  checked={searchType === 'email'}
                  onChange={(e) => setSearchType(e.target.value as 'email')}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Email</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="phone"
                  checked={searchType === 'phone'}
                  onChange={(e) => setSearchType(e.target.value as 'phone')}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Phone</span>
              </label>
            </div>

            {/* Search Input */}
            <div className="flex gap-2">
              <input
                type={searchType === 'email' ? 'email' : 'tel'}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchType === 'email' ? 'Enter email address' : 'Enter phone number'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading && !connectionStatus ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Searching...</span>
                  </div>
                ) : 'Search'}
              </button>
            </div>
          </form>

          {/* Recent Searches */}
          {showHistory && searchHistory.length > 0 && !results && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Recent Searches
                </h3>
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-gray-500 hover:text-red-600"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {searchHistory.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleHistoryClick(item)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded">
                        {item.type === 'email' ? (
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.value}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && !connectionStatus && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Results Display */}
          {results !== null && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {results.length === 0 ? 'No Results' : `Found ${results.length} ${results.length === 1 ? 'Contact' : 'Contacts'}`}
              </h3>

              {results.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="mt-2 text-gray-600">No contacts found matching your search.</p>
                  <p className="mt-1 text-sm text-gray-500">Try a different email or phone number.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {results.map((person) => (
                    <ContactCard
                      key={person.id}
                      person={person}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Setup Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Setup Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
            <li>Create a <code className="bg-blue-100 px-1 rounded">.env.local</code> file in the project root</li>
            <li>Add your FUB API key: <code className="bg-blue-100 px-1 rounded">FUB_API_KEY=your_key_here</code></li>
            <li>Restart the development server</li>
            <li>Click "Test FUB Connection" to verify setup</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
