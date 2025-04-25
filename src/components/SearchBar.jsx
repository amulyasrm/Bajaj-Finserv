import { useState, useEffect, useRef } from 'react';

function SearchBar({ value, onChange, doctors }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    const matches = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 3);

    setSuggestions(matches);
  }, [value, doctors]);

  const handleSuggestionClick = (name) => {
    onChange(name);
    setIsOpen(false);
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          data-testid="autocomplete-input"
        />
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => handleSuggestionClick(doctor.name)}
              className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
              data-testid="suggestion-item"
            >
              <img 
                src={doctor.photo || 'https://via.placeholder.com/40'} 
                alt={doctor.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{doctor.name}</div>
                <div className="text-sm text-gray-600">
                  {doctor.specialities?.[0]?.name || 'General Physician'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;