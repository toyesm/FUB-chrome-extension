'use client';

import { useState, useEffect } from 'react';
import { type Person } from '@/services/fubClient';
import TabNavigation, { type TabId } from './TabNavigation';
import LeadProfileCard from './LeadProfileCard';

interface SidebarProps {
  person: Person;
  onClose: () => void;
}

export default function Sidebar({ person, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  // Add Escape key handler for accessibility
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 md:relative md:bg-transparent md:bg-opacity-100"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sidebar-title"
    >
      <div
        className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-4">
            <h2 id="sidebar-title" className="text-lg font-semibold text-gray-900">Lead Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contact Summary */}
          <div className="px-4 pb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {person.name ||
               `${person.firstName || ''} ${person.lastName || ''}`.trim() ||
               'Unknown Contact'}
            </h3>

            {person.emails && person.emails.length > 0 && (
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {person.emails[0].value}
              </p>
            )}

            {person.phones && person.phones.length > 0 && (
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {person.phones[0].value}
              </p>
            )}

            {person.stage && (
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {person.stage}
              </span>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'profile' && <LeadProfileCard person={person} />}

          {activeTab === 'properties' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-gray-600">
              <p className="text-sm font-medium">Properties Tab</p>
              <p className="text-xs mt-1">
                Phase A5: Properties Viewed, Saved Properties, Search Criteria, Inquiry History
              </p>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-gray-600">
              <p className="text-sm font-medium">Appointments Tab</p>
              <p className="text-xs mt-1">
                Phase A6-A7: Upcoming Appointments, Create Appointment, Outcome Tracking
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
