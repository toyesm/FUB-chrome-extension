import { type Person } from '@/services/fubClient';

interface LeadProfileCardProps {
  person: Person;
}

export default function LeadProfileCard({ person }: LeadProfileCardProps) {
  const displayName =
    person.name || `${person.firstName || ''} ${person.lastName || ''}`.trim() || 'Unknown';

  const fullAddress = [person.address, person.city, person.state, person.zip, person.country]
    .filter(Boolean)
    .join(', ');

  const socialLinks = [
    { platform: 'LinkedIn', url: person.linkedin, icon: 'linkedin' },
    { platform: 'Facebook', url: person.facebook, icon: 'facebook' },
    { platform: 'Twitter', url: person.twitter, icon: 'twitter' },
    { platform: 'Instagram', url: person.instagram, icon: 'instagram' },
  ].filter((link) => link.url);

  return (
    <div className="space-y-4">
      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Contact Information
        </h3>

        <div className="space-y-3">
          {/* Full Name */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">Full Name</label>
            <p className="text-sm text-gray-900">{displayName}</p>
          </div>

          {/* All Emails */}
          {person.emails && person.emails.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">
                Email{person.emails.length > 1 ? 's' : ''}
              </label>
              <div className="space-y-1">
                {person.emails.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <a
                      href={`mailto:${email.value}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {email.value}
                    </a>
                    {email.type && (
                      <span className="text-xs text-gray-500">({email.type})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Phones */}
          {person.phones && person.phones.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">
                Phone{person.phones.length > 1 ? 's' : ''}
              </label>
              <div className="space-y-1">
                {person.phones.map((phone, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <a
                      href={`tel:${phone.value}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {phone.value}
                    </a>
                    {phone.type && (
                      <span className="text-xs text-gray-500">({phone.type})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Company & Job Title */}
          {(person.company || person.jobTitle) && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">
                {person.company && person.jobTitle ? 'Company & Title' : person.company ? 'Company' : 'Job Title'}
              </label>
              <p className="text-sm text-gray-900">
                {person.jobTitle && person.company
                  ? `${person.jobTitle} at ${person.company}`
                  : person.jobTitle || person.company}
              </p>
            </div>
          )}

          {/* Website */}
          {person.website && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Website</label>
              <a
                href={person.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
              >
                {person.website}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Address */}
      {fullAddress && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Address
          </h3>
          <p className="text-sm text-gray-900">{fullAddress}</p>
        </div>
      )}

      {/* Tags */}
      {person.tags && person.tags.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {person.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Source & Assignment */}
      {(person.source || person.owner || person.assignedTo) && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Source & Assignment
          </h3>

          <div className="space-y-3">
            {person.source && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Source</label>
                <p className="text-sm text-gray-900">{person.source}</p>
              </div>
            )}

            {person.owner && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Owner</label>
                <p className="text-sm text-gray-900">{person.owner.name}</p>
              </div>
            )}

            {person.assignedTo && !person.owner && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Assigned To</label>
                <p className="text-sm text-gray-900">{person.assignedTo}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Social Media */}
      {socialLinks.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Social Media
          </h3>
          <div className="space-y-2">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                <span className="font-medium">{link.platform}:</span>
                <span className="truncate">{link.url}</span>
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {(person.note || person.description) && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Notes
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {person.note || person.description}
          </p>
        </div>
      )}

      {/* System Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          System Information
        </h3>

        <div className="space-y-3">
          {/* Stage */}
          {person.stage && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Stage</label>
              <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {person.stage}
              </span>
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
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          )}

          {/* Updated Date */}
          {person.updated && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Last Updated</label>
              <p className="text-sm text-gray-900">
                {new Date(person.updated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          )}

          {/* Last Contacted */}
          {person.lastContacted && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Last Contacted</label>
              <p className="text-sm text-gray-900">
                {new Date(person.lastContacted).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          {/* Next Follow Up */}
          {person.nextFollowUp && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Next Follow Up</label>
              <p className="text-sm font-semibold text-orange-600">
                {new Date(person.nextFollowUp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          {/* Contact ID */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">Contact ID</label>
            <p className="text-sm text-gray-900 font-mono">{person.id}</p>
          </div>
        </div>
      </div>

      {/* Custom Fields */}
      {person.customFields && Object.keys(person.customFields).length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Custom Fields
          </h3>
          <div className="space-y-3">
            {Object.entries(person.customFields).map(([key, value]) => (
              <div key={key}>
                <label className="text-xs font-medium text-gray-500 uppercase">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <p className="text-sm text-gray-900">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
