import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

function FilterPanel({ filters, onChange }) {
  const handleSpecialtyChange = (specialty) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    onChange({ ...filters, specialties: newSpecialties });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Sort Options */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium mb-4" data-testid="filter-header-sort">
          Sort by
        </h3>
        <div className="space-y-2">
          <label className="flex items-center" data-testid="sort-fees">
            <input
              type="radio"
              checked={filters.sortBy === 'fees'}
              onChange={() => onChange({ ...filters, sortBy: 'fees' })}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Price: Low-High</span>
          </label>
          <label className="flex items-center" data-testid="sort-experience">
            <input
              type="radio"
              checked={filters.sortBy === 'experience'}
              onChange={() => onChange({ ...filters, sortBy: 'experience' })}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Experience - Most Experience first</span>
          </label>
        </div>
      </div>

      {/* Filters Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Filters</h3>
          <button
            onClick={() => onChange({
              search: '',
              consultationType: '',
              specialties: [],
              sortBy: ''
            })}
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            Clear All
          </button>
        </div>

        {/* Specialties */}
        <div className="mb-6">
          <h4 className="font-medium mb-3" data-testid="filter-header-speciality">
            Specialities
          </h4>
          <div className="space-y-2">
            {SPECIALTIES.map(specialty => (
              <label
                key={specialty}
                className="flex items-center"
                data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
              >
                <input
                  type="checkbox"
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2">{specialty}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mode of Consultation */}
        <div>
          <h4 className="font-medium mb-3" data-testid="filter-header-moc">
            Mode of consultation
          </h4>
          <RadioGroup
            value={filters.consultationType}
            onChange={value => onChange({ ...filters, consultationType: value })}
            className="space-y-2"
          >
            <RadioGroup.Option value="Video Consult">
              {({ checked }) => (
                <div
                  className={clsx(
                    'flex items-center cursor-pointer',
                    checked && 'text-blue-600'
                  )}
                  data-testid="filter-video-consult"
                >
                  <input
                    type="radio"
                    checked={checked}
                    readOnly
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Video Consultation</span>
                </div>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="In Clinic">
              {({ checked }) => (
                <div
                  className={clsx(
                    'flex items-center cursor-pointer',
                    checked && 'text-blue-600'
                  )}
                  data-testid="filter-in-clinic"
                >
                  <input
                    type="radio"
                    checked={checked}
                    readOnly
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">In-clinic Consultation</span>
                </div>
              )}
            </RadioGroup.Option>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

const SPECIALTIES = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician",
  "Gynaecologist", "ENT", "Diabetologist", "Cardiologist",
  "Physiotherapist", "Endocrinologist", "Orthopaedic", "Ophthalmologist",
  "Gastroenterologist", "Pulmonologist", "Psychiatrist", "Urologist",
  "Dietitian/Nutritionist", "Psychologist", "Sexologist", "Nephrologist",
  "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
];

export default FilterPanel;