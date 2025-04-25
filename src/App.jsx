import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import DoctorList from './components/DoctorList';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';

function App() {
  const [filters, setFilters] = useState({
    search: '',
    consultationType: '',
    specialties: [],
    sortBy: ''
  });

  const { data: doctors = [], isLoading } = useQuery('doctors', async () => {
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return [];
    }
  }, {
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilters = {
      search: params.get('search') || '',
      consultationType: params.get('consultationType') || '',
      specialties: params.getAll('specialty') || [],
      sortBy: params.get('sortBy') || ''
    };
    setFilters(urlFilters);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.consultationType) params.set('consultationType', filters.consultationType);
    filters.specialties.forEach(specialty => params.append('specialty', specialty));
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
  }, [filters]);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = !filters.search || 
      doctor.name.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesConsultationType = !filters.consultationType || 
      doctor.consultationType === filters.consultationType;
    
    const matchesSpecialties = filters.specialties.length === 0 || 
      filters.specialties.some(specialty => 
        doctor.specialities?.some(s => s.name === specialty)
      );
    
    return matchesSearch && matchesConsultationType && matchesSpecialties;
  }).sort((a, b) => {
    if (filters.sortBy === 'fees') {
      // Extract numeric value from fees string and compare
      const aFees = parseInt(a.fees?.replace(/[^\d]/g, '') || '0', 10);
      const bFees = parseInt(b.fees?.replace(/[^\d]/g, '') || '0', 10);
      return aFees - bFees;
    }
    if (filters.sortBy === 'experience') {
      // Extract numeric value from experience string and compare in descending order
      const aExp = parseInt(a.doctor_introduction?.match(/Experience of (\d+)/)?.[1] || '0', 10);
      const bExp = parseInt(b.doctor_introduction?.match(/Experience of (\d+)/)?.[1] || '0', 10);
      return bExp - aExp; // Descending order
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          value={filters.search}
          onChange={search => setFilters(prev => ({ ...prev, search }))}
          doctors={doctors}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <FilterPanel 
            filters={filters}
            onChange={setFilters}
          />
          <div className="lg:col-span-3">
            <DoctorList 
              doctors={filteredDoctors}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;