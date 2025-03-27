import { Provider, PayerType } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Tooltip } from './Tooltip';

// Insurance abbreviation explanations
const INSURANCE_TOOLTIPS = {
  'DMBA': 'Deseret Mutual Benefit Administrators - Insurance for employees of the LDS Church and their families',
  'SelectHealth': 'Utah-based not-for-profit health insurance organization',
  'Optum': 'Part of UnitedHealth Group, offering health care services and benefits',
  'Molina': 'Molina Healthcare - Provider of government-funded health care',
  'Aetna': 'National healthcare company offering health insurance plans',
} as const;

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Group payers by type for structured data
  const acceptedPaymentMethods = provider.acceptedPayers.reduce((acc: Record<PayerType, string[]>, { payer }) => {
    const type = payer.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(payer.displayName);
    return acc;
  }, { INSURANCE: [], CASH: [], MEDICAID: [], MEDICARE: [] });

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: `${provider.title} ${provider.firstName} ${provider.lastName}`,
    medicalSpecialty: provider.specialty,
    availableService: provider.specialties,
    acceptsInsurancePlans: acceptedPaymentMethods.INSURANCE,
    availableLanguage: provider.languages,
    isAcceptingNewPatients: provider.availability,
    hasCredential: provider.education?.map(edu => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: edu.degree,
      educationalLevel: edu.field,
      recognizedBy: {
        '@type': 'Organization',
        name: edu.institution
      },
      dateCreated: edu.endDate
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Top Section */}
        <div className="flex">
          {/* Left - Photo */}
          <div className="flex-shrink-0">
            <div className="relative h-40 w-40">
              {provider.photoUrl ? (
                <Image
                  src={provider.photoUrl}
                  alt={`${provider.firstName} ${provider.lastName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-surface flex items-center justify-center">
                  <span className="text-4xl font-serif font-bold text-primary">
                    {`${provider.firstName[0]}${provider.lastName[0]}`.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right - Name and Book Button */}
          <div className="flex-grow pl-5 pr-6 py-5 relative">
            <div>
              <h2 className="font-serif text-[#091747] leading-tight">
                <span className="block text-[16px] font-normal">
                  {(provider.title === 'MD' || provider.title === 'DO') ? `Dr. ${provider.firstName}` : provider.firstName}
                </span>
                <span className="block text-[22px] font-medium -mt-0.5">{provider.lastName}, {provider.title}</span>
              </h2>
            </div>

            {provider.availability && (
              <Link
                href={`/book/${provider.id}`}
                className="absolute bottom-0 inline-flex items-center justify-center h-9 px-5 bg-[#0A3D5C] text-white rounded hover:bg-[#0A3D5C]/90 transition-colors duration-200 text-[12px] tracking-wide font-normal whitespace-nowrap"
              >
                {(provider.title === 'MD' || provider.title === 'DO') ? `Book Dr. ${provider.lastName}` : `Book ${provider.lastName}`}
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Section - Full Width Content */}
        <div className="px-6 pt-2 pb-6">
          {/* Tags Section */}
          <div className="space-y-2.5 mb-5">
            <div className="flex flex-wrap gap-1.5">
              <span className="px-3 py-1 bg-[#F6B398] text-white rounded-md text-[13px] font-normal">
                psychiatrist
              </span>
              <span className={`px-3 py-1 rounded-md text-[13px] font-normal ${
                provider.availability
                  ? 'bg-[#FEF8F1] text-[#091747]'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {provider.availability ? 'Accepting new patients' : 'Not currently accepting new patients'}
              </span>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="mb-5 relative">
            <h4 className="text-[14px] text-[#091747] mb-2.5 font-normal">
              Ways you could pay Dr. {provider.lastName}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(acceptedPaymentMethods).flatMap(([type, plans]) =>
                plans.map(plan => (
                  <Tooltip
                    key={plan}
                    content={INSURANCE_TOOLTIPS[plan as keyof typeof INSURANCE_TOOLTIPS] || plan}
                  >
                    <span className="px-3 py-1 bg-[#FEF8F1] text-[#091747] rounded-md text-[13px] font-normal cursor-help">
                      {plan}
                    </span>
                  </Tooltip>
                ))
              )}
            </div>
          </div>

          {/* About Section */}
          <div>
            <h4 className="text-[14px] text-[#091747] mb-2.5 font-normal tracking-wide uppercase">
              About
            </h4>
            <div className="relative">
              <div className={`${!isExpanded ? 'max-h-16 overflow-hidden' : ''}`}>
                <div className="space-y-4">
                  {/* Bio */}
                  <p className="text-[#091747]/80 text-[14px] leading-relaxed">
                    {provider.bio}
                  </p>

                  {/* Education */}
                  {provider.education && provider.education.length > 0 && (
                    <div>
                      <h5 className="text-[14px] text-[#091747] mb-2 font-normal">Education</h5>
                      <div className="space-y-1 text-[13px] text-[#091747]/80">
                        {provider.education.map(edu => (
                          <p key={edu.id}>
                            {edu.degree} - {edu.institution}, {edu.field}, {new Date(edu.endDate || '').getFullYear()}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {provider.languages.length > 0 && (
                    <div>
                      <h5 className="text-[14px] text-[#091747] mb-2 font-normal">
                        Languages spoken
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {provider.languages.map(language => (
                          <span key={language} className="px-3 py-1 bg-[#FEF8F1] text-[#091747] rounded-md text-[13px] font-normal">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#091747]/60 hover:text-[#091747] mt-2.5 text-[13px] font-medium tracking-wide uppercase"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 