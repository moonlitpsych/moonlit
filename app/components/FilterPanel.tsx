import { InsurancePlan, Language, LANGUAGES, Degree, DEGREES } from '../types';

interface FilterPanelProps {
  filters: {
    insurancePlans: InsurancePlan[];
    languages: Language[];
    acceptingPatients: boolean | null;
    degrees: Degree[];
  };
  onChange: (filters: {
    insurancePlans: InsurancePlan[];
    languages: Language[];
    acceptingPatients: boolean | null;
    degrees: Degree[];
  }) => void;
  availableInsurancePlans: InsurancePlan[];
}

export default function FilterPanel({ filters, onChange, availableInsurancePlans }: FilterPanelProps) {
  const handleInsuranceChange = (plan: InsurancePlan) => {
    const newPlans = filters.insurancePlans.includes(plan)
      ? filters.insurancePlans.filter((p) => p !== plan)
      : [...filters.insurancePlans, plan];
    onChange({ ...filters, insurancePlans: newPlans });
  };

  const handleLanguageChange = (language: Language) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter((l) => l !== language)
      : [...filters.languages, language];
    onChange({ ...filters, languages: newLanguages });
  };

  const handleAcceptingPatientsChange = (value: boolean | null) => {
    onChange({ ...filters, acceptingPatients: value });
  };

  const handleDegreeChange = (degree: Degree) => {
    const newDegrees = filters.degrees.includes(degree)
      ? filters.degrees.filter((d) => d !== degree)
      : [...filters.degrees, degree];
    onChange({ ...filters, degrees: newDegrees });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-text mb-4">Filters</h2>
      
      {/* Insurance Plans */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-text">How to Pay</h3>
          <button
            onClick={() => onChange({ ...filters, insurancePlans: [] })}
            className="text-xs text-primary hover:text-primary/80"
          >
            Deselect all
          </button>
        </div>
        <div className="space-y-2">
          {availableInsurancePlans.map((plan) => (
            <label key={plan} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.insurancePlans.includes(plan)}
                onChange={() => handleInsuranceChange(plan)}
                className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent/30 checked:bg-accent hover:checked:bg-accent"
              />
              <span className="ml-2 text-sm text-text">{plan}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-text">Languages</h3>
          <button
            onClick={() => onChange({ ...filters, languages: [] })}
            className="text-xs text-primary hover:text-primary/80"
          >
            Deselect all
          </button>
        </div>
        <div className="space-y-2">
          {LANGUAGES.map((language) => (
            <label key={language} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.languages.includes(language)}
                onChange={() => handleLanguageChange(language)}
                className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent/30 checked:bg-accent hover:checked:bg-accent"
              />
              <span className="ml-2 text-sm text-text">{language}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Accepting Patients */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-text mb-2">Accepting Patients</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.acceptingPatients === true}
              onChange={() => handleAcceptingPatientsChange(true)}
              className="h-4 w-4 border-gray-300 text-accent focus:ring-accent/30 checked:bg-accent hover:checked:bg-accent"
            />
            <span className="ml-2 text-sm text-text">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.acceptingPatients === false}
              onChange={() => handleAcceptingPatientsChange(false)}
              className="h-4 w-4 border-gray-300 text-accent focus:ring-accent/30 checked:bg-accent hover:checked:bg-accent"
            />
            <span className="ml-2 text-sm text-text">No</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.acceptingPatients === null}
              onChange={() => handleAcceptingPatientsChange(null)}
              className="h-4 w-4 border-gray-300 text-accent focus:ring-accent/30 checked:bg-accent hover:checked:bg-accent"
            />
            <span className="ml-2 text-sm text-text">Show All</span>
          </label>
        </div>
      </div>

      {/* Degrees */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-text">Degrees</h3>
          <button
            onClick={() => onChange({ ...filters, degrees: [] })}
            className="text-xs text-primary hover:text-primary/80"
          >
            Deselect all
          </button>
        </div>
        <div className="space-y-2">
          {DEGREES.map((degree) => (
            <label key={degree} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.degrees.includes(degree)}
                onChange={() => handleDegreeChange(degree)}
                className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent/30 checked:bg-accent hover:checked:bg-accent"
              />
              <span className="ml-2 text-sm text-text">{degree}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 