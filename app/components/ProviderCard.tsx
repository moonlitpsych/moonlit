import { Provider } from '../types';
import Image from 'next/image';

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        {provider.photoUrl ? (
          <Image
            src={provider.photoUrl}
            alt={`${provider.firstName} ${provider.lastName}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-2xl">No photo available</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif text-[#091747] mb-2">
          {provider.firstName} {provider.lastName}, {provider.title}
        </h3>

        {provider.bio && (
          <p className="text-gray-600 mb-4">{provider.bio}</p>
        )}

        {provider.languages.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-[#091747] mb-1">Languages</h4>
            <p className="text-gray-600">{provider.languages.join(', ')}</p>
          </div>
        )}

        {provider.medicalSchool && (
          <div className="mb-4">
            <h4 className="font-medium text-[#091747] mb-1">Education</h4>
            <p className="text-gray-600">{provider.medicalSchool}</p>
            {provider.residency && (
              <p className="text-gray-600">
                Residency: {provider.residency} ({provider.residencyStartYear} - {provider.residencyGradYear})
              </p>
            )}
          </div>
        )}

        <div className="mt-4">
          <a
            href={provider.personalBookingLink || '#'}
            className="inline-block bg-[#091747] text-white px-4 py-2 rounded hover:bg-[#0c1f5e]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
} 