export const INSURANCE_PLANS = [
  'Aetna',
  'Cash | Credit | ACH',
  'DMBA',
  'First Health ( Aetna Network)',
  'Molina',
  'Motiv Health',
  'Optum',
  'SelectHealth',
  'University of Utah'
] as const;

export const LANGUAGES = [
  'English',
  'Korean',
  'Mandarin',
  'Spanish'
] as const;

export const DEGREES = [
  'DO',
  'MD',
  'NP',
  'PA'
] as const;

export const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'ACH',
  'HSA/FSA'
] as const;

export type InsurancePlan = typeof INSURANCE_PLANS[number];
export type Language = typeof LANGUAGES[number];
export type Degree = typeof DEGREES[number];
export type PaymentMethod = typeof PAYMENT_METHODS[number];

export type PayerType = 'INSURANCE' | 'CASH' | 'MEDICAID' | 'MEDICARE';

export interface Payer {
  id: string;
  name: string;
  displayName: string;
  type: PayerType;
  networkName?: string | null;
  contactInfo?: any;
  claimsAddress?: string | null;
  electronicPayerId?: string | null;
  effectiveDate?: Date | null;
  contractTerms?: string | null;
  paymentMethods: string[];
  claimsRequirements?: string | null;
  acceptedStates: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProviderPayer {
  provider: Provider;
  providerId: string;
  payer: Payer;
  payerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  id: string;
  providerId: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Provider {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  title?: string | null;
  personalEmail: string;
  phone?: string | null;
  fax?: string | null;
  bio?: string | null;
  languages: string[];
  photoUrl?: string | null;
  availability: boolean;
  npi?: string | null;
  personalBookingLink?: string | null;
  address?: string | null;
  dateOfBirth?: Date | null;
  locationOfBirth?: string | null;
  stateLicenseNumbers?: string | null;
  deaNumber?: string | null;
  ssn?: string | null;
  medicalSchool?: string | null;
  residency?: string | null;
  residencyStartYear?: number | null;
  residencyGradYear?: number | null;
  isActive: boolean;
  isVerified: boolean;
} 