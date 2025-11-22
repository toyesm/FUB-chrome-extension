import { type Person } from '@/services/fubClient';

interface LeadProfileCardProps {
  person: Person;
}

export default function LeadProfileCard({ person }: LeadProfileCardProps) {
  return (
    <div className="space-y-4">
      {/* Profile Section - Placeholder for Phase A4 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Profile</h3>

        <div className="space-y-3">
          {/* Basic Info */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">Full Name</label>
            <p className="text-sm text-gray-900">
              {person.name || `${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Unknown'}
            </p>
          </div>

          {/* Email */}
          {person.emails && person.emails.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
              <p className="text-sm text-gray-900">{person.emails[0].value}</p>
            </div>
          )}

          {/* Phone */}
          {person.phones && person.phones.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
              <p className="text-sm text-gray-900">{person.phones[0].value}</p>
            </div>
          )}

          {/* Stage */}
          {person.stage && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Stage</label>
              <p className="text-sm text-gray-900">{person.stage}</p>
            </div>
          )}

          {/* Created Date */}
          {person.created && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Created</label>
              <p className="text-sm text-gray-900">
                {new Date(person.created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>

        {/* Placeholder notice */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
          <strong>Phase A4:</strong> This card will be enhanced with additional profile fields,
          custom fields, tags, and more detailed contact information.
        </div>
      </div>
    </div>
  );
}
