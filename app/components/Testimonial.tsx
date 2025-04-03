import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  author: string;
  avatarSrc: string;
}

export default function Testimonial({ quote, author, avatarSrc }: TestimonialProps) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <p className="text-lg sm:text-xl font-serif text-[#091747] mb-6">
        "{quote}"
      </p>
      <div className="flex items-center justify-between">
        <p className="text-[#091747] italic">- {author}</p>
        <Image 
          src={avatarSrc}
          alt={`${author} avatar`}
          width={64}
          height={64}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
          sizes="(max-width: 640px) 48px, 64px"
          quality={90}
        />
      </div>
    </div>
  );
} 