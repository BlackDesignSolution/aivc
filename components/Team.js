function Team() {
  try {
    const teamMembers = [
      {
        id: 1,
        name: 'Carlos Mendoza',
        role: 'Líder de Ventas',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        performance: 95,
        completedCalls: 45,
        avgScore: 28
      },
      {
        id: 2,
        name: 'Ana Rodríguez',
        role: 'Especialista Senior',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        performance: 88,
        completedCalls: 38,
        avgScore: 25
      },
      {
        id: 3,
        name: 'Luis García',
        role: 'Consultor Junior',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        performance: 72,
        completedCalls: 22,
        avgScore: 19
      }
    ];

    return (
      <div data-name="team" data-file="components/Team.js">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Equipo de Ventas</h1>
          <p className="text-gray-600">Monitorea el progreso y rendimiento del equipo</p>
        </div>

        {/* Team Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Miembros</p>
                <p className="text-3xl font-bold text-blue-600">{teamMembers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="icon-users text-xl text-blue-600"></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Rendimiento Promedio</p>
                <p className="text-3xl font-bold text-green-600">85%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="icon-trending-up text-xl text-green-600"></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Llamadas Totales</p>
                <p className="text-3xl font-bold text-purple-600">105</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="icon-phone text-xl text-purple-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Miembros del Equipo</h2>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{member.performance}%</p>
                    <p className="text-gray-600">Rendimiento</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{member.completedCalls}</p>
                    <p className="text-gray-600">Llamadas</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{member.avgScore}</p>
                    <p className="text-gray-600">Puntaje Prom.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Team component error:', error);
    return null;
  }
}