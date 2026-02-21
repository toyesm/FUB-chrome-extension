'use client';

import { type Person } from '@/services/fubClient';

interface ContactCardProps {
  person: Person;
  onViewDetails?: (person: Person) => void;
}

export default function ContactCard({ person, onViewDetails }: ContactCardProps) {
  const displayName =
    person.name ||
    `${person.firstName || ''} ${person.lastName || ''}`.trim() ||
    'Unknown Contact';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{displayName}</h3>
          {person.stage && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              {person.stage}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400">ID: {person.id}</span>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-3">
        {person.emails && person.emails.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700 truncate">{person.emails[0].value}</span>
          </div>
        )}

        {person.phones && person.phones.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-700">{person.phones[0].value}</span>
          </div>
        )}

        {person.created && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Created {new Date(person.created).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {onViewDetails && (
        <button
          onClick={() => onViewDetails(person)}
          className="w-full mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
