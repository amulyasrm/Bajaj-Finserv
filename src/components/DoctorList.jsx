function DoctorList({ doctors, isLoading }) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        Loading doctors...
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        No doctors found matching your criteria.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {doctors.map(doctor => (
        <div
          key={doctor.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          data-testid="doctor-card"
        >
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 flex-shrink-0">
              <img 
                src={doctor.photo || 'https://via.placeholder.com/96'} 
                alt={doctor.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 
                    className="text-xl font-semibold text-gray-900"
                    data-testid="doctor-name"
                  >
                    {doctor.name}
                  </h2>
                  <div 
                    className="text-gray-600 mt-1"
                    data-testid="doctor-specialty"
                  >
                    {doctor.specialities?.[0]?.name || 'General Physician'}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {doctor.qualifications || 'MBBS'}
                  </div>
                  <div 
                    className="text-gray-700 mt-2"
                    data-testid="doctor-experience"
                  >
                    {doctor.experience} yrs exp.
                  </div>
                </div>
                
                <div className="text-right">
                  <div 
                    className="text-xl font-semibold text-gray-900"
                    data-testid="doctor-fee"
                  >
                    ₹{doctor.fees}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-gray-600 text-sm">
                  {doctor.clinic_name && (
                    <div className="flex items-center gap-2 mt-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{doctor.clinic_name}</span>
                    </div>
                  )}
                  {doctor.location && (
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{doctor.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <button className="mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors float-right">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorList;