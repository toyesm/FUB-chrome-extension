'use client';

import { useState } from 'react';
import {
  getPersonByEmail,
  getPersonByPhone,
  testConnection,
  type Person,
} from '@/services/fubClient';

export default function Home() {
  const [searchType, setSearchType] = useState<'email' | 'phone'>('email');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Person[] | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      let response;
      if (searchType === 'email') {
        response = await getPersonByEmail(searchValue);
      } else {
        response = await getPersonByPhone(searchValue);
      }

      setResults(response.people || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            FUB Lead Viewer - Test Page
          </h1>
          <p className="text-gray-600">
            Phase A1: Testing FUB API connection and contact lookup
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Contact Lookup
          </h2>

          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Type Selector */}
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={searchType === 'email'}
                  onChange={(e) => setSearchType(e.target.value as 'email')}
                  className="mr-2"
                />
                <span className="text-gray-700">Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="phone"
                  checked={searchType === 'phone'}
                  onChange={(e) => setSearchType(e.target.value as 'phone')}
                  className="mr-2"
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
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && !connectionStatus ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {/* Error Display */}
          {error && !connectionStatus && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Results ({results.length} {results.length === 1 ? 'contact' : 'contacts'} found)
              </h3>

              {results.length === 0 ? (
                <p className="text-gray-600">No contacts found matching your search.</p>
              ) : (
                <div className="space-y-4">
                  {results.map((person) => (
                    <div
                      key={person.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {person.name || `${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Unknown'}
                        </h4>
                        <span className="text-sm text-gray-500">ID: {person.id}</span>
                      </div>

                      {person.emails && person.emails.length > 0 && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-700">Email:</span>
                          <span className="text-sm text-gray-600 ml-2">
                            {person.emails[0].value}
                          </span>
                        </div>
                      )}

                      {person.phones && person.phones.length > 0 && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-700">Phone:</span>
                          <span className="text-sm text-gray-600 ml-2">
                            {person.phones[0].value}
                          </span>
                        </div>
                      )}

                      {person.stage && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-700">Stage:</span>
                          <span className="text-sm text-gray-600 ml-2">{person.stage}</span>
                        </div>
                      )}

                      {person.created && (
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-700">Created:</span>
                          <span className="text-sm text-gray-600 ml-2">
                            {new Date(person.created).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {/* Raw data viewer (collapsible) */}
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                          View raw data
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-800 text-green-400 text-xs rounded overflow-x-auto">
                          {JSON.stringify(person, null, 2)}
                        </pre>
                      </details>
                    </div>
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
