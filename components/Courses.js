function Courses() {
  try {
    const courses = [
      {
        id: 1,
        title: 'Fundamentos de Ventas',
        description: 'Aprende las bases de las técnicas de venta efectivas',
        duration: '2 horas',
        level: 'Principiante',
        progress: 100,
        status: 'completed'
      },
      {
        id: 2,
        title: 'Manejo de Objeciones',
        description: 'Técnicas avanzadas para superar objeciones de clientes',
        duration: '3 horas',
        level: 'Intermedio',
        progress: 60,
        status: 'in-progress'
      },
      {
        id: 3,
        title: 'Negociación Estratégica',
        description: 'Estrategias de negociación para cerrar grandes acuerdos',
        duration: '4 horas',
        level: 'Avanzado',
        progress: 0,
        status: 'not-started'
      }
    ];

    const getStatusColor = (status) => {
      switch(status) {
        case 'completed': return 'text-green-600 bg-green-100';
        case 'in-progress': return 'text-blue-600 bg-blue-100';
        case 'not-started': return 'text-gray-600 bg-gray-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    const getStatusText = (status) => {
      switch(status) {
        case 'completed': return 'Completado';
        case 'in-progress': return 'En Progreso';
        case 'not-started': return 'No Iniciado';
        default: return 'Desconocido';
      }
    };

    return (
      <div data-name="courses" data-file="components/Courses.js">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cursos de Capacitación</h1>
          <p className="text-gray-600">Mejora tus habilidades con nuestros cursos especializados</p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Cursos Completados</p>
                <p className="text-3xl font-bold text-green-600">1</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="icon-check text-xl text-green-600"></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">En Progreso</p>
                <p className="text-3xl font-bold text-blue-600">1</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="icon-clock text-xl text-blue-600"></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Horas</p>
                <p className="text-3xl font-bold text-purple-600">9</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="icon-book text-xl text-purple-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 mr-3">{course.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {getStatusText(course.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{course.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <div className="icon-clock text-sm mr-1"></div>
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <div className="icon-bar-chart text-sm mr-1"></div>
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <button className="btn-primary ml-4">
                  {course.status === 'completed' ? 'Revisar' : 
                   course.status === 'in-progress' ? 'Continuar' : 'Iniciar'}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progreso</span>
                  <span className="text-gray-900 font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Courses component error:', error);
    return null;
  }
}