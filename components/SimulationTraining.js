function SimulationTraining({ onNavigate }) {
  try {
    const [selectedFilter, setSelectedFilter] = React.useState('all');
    const [progress] = React.useState({
      completedSimulations: 8,
      totalSimulations: 15,
      totalScore: 185,
      maxScore: 300,
      lastSimulation: {
        score: 24,
        maxScore: 30,
        positives: ['Excelente apertura', 'Manejo de objeciones'],
        negatives: ['Cierre apresurado', 'Falta seguimiento']
      }
    });

    const filters = [
      { id: 'all', label: 'Todos' },
      { id: 'corporativo', label: 'Corporativo' },
      { id: 'comercio', label: 'Pequeño Comercio' },
      { id: 'indeciso', label: 'Cliente Indeciso' },
      { id: 'precio', label: 'Negociación de Precio' }
    ];

    const scenarios = [
      {
        id: 1,
        title: 'Venta Corporativa B2B',
        description: 'Negociación con empresa multinacional',
        difficulty: 'Avanzado',
        category: 'corporativo',
        duration: '15-20 min'
      },
      {
        id: 2,
        title: 'Tienda Local',
        description: 'Convencer a pequeño comerciante',
        difficulty: 'Intermedio',
        category: 'comercio',
        duration: '10-15 min'
      },
      {
        id: 3,
        title: 'Cliente Dudoso',
        description: 'Manejar cliente con muchas dudas',
        difficulty: 'Intermedio',
        category: 'indeciso',
        duration: '12-18 min'
      },
      {
        id: 4,
        title: 'Objeción de Precio',
        description: 'Justificar valor ante precio alto',
        difficulty: 'Avanzado',
        category: 'precio',
        duration: '8-12 min'
      }
    ];

    const filteredScenarios = selectedFilter === 'all' 
      ? scenarios 
      : scenarios.filter(s => s.category === selectedFilter);

    return (
      <div data-name="simulation-training" data-file="components/SimulationTraining.js">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Entrenamiento de Llamadas Simuladas
          </h1>
          <p className="text-gray-600">
            Practica tus habilidades de ventas en escenarios realistas y recibe retroalimentación instantánea
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Columna 1 - Escenarios */}
          <div className="space-y-6">
            {/* Tipos de Simulación */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Simulación</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => onNavigate('ai-call-simulation')}
                  className="p-4 border-2 border-[#6C90C3] rounded-xl hover:bg-[#6C90C3]/10 transition-all"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#6C90C3] to-[#274272] rounded-lg flex items-center justify-center mr-3">
                      <div className="icon-cpu text-white text-sm"></div>
                    </div>
                    <h4 className="font-semibold text-[#0D1433]">Simulación con IA</h4>
                  </div>
                  <p className="text-sm text-gray-600">Conversaciones dinámicas con inteligencia artificial</p>
                </button>
                
                <button 
                  onClick={() => onNavigate('call-simulation')}
                  className="p-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center mr-3">
                      <div className="icon-list text-white text-sm"></div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Simulación Guiada</h4>
                  </div>
                  <p className="text-sm text-gray-600">Escenarios predefinidos con opciones múltiples</p>
                </button>
              </div>
            </div>

            {/* Escenarios Disponibles */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Escenarios Guiados</h3>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {filters.map(filter => (
                    <option key={filter.id} value={filter.id}>{filter.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-3">
                {filteredScenarios.map(scenario => (
                  <div key={scenario.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{scenario.title}</h4>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {scenario.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{scenario.duration}</span>
                      <button 
                        onClick={() => onNavigate('call-simulation')}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Iniciar Simulación
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna 2 - Progreso y Última Simulación */}
          <div className="space-y-6">
            {/* Tu Progreso */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tu Progreso</h3>
              
              {/* Simulaciones Completadas */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Simulaciones Completadas</span>
                  <span>{progress.completedSimulations}/{progress.totalSimulations}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(progress.completedSimulations / progress.totalSimulations) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Puntuación Total */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Puntuación Total</span>
                  <span>{progress.totalScore}/{progress.maxScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(progress.totalScore / progress.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('scores')}
                className="btn-secondary w-full"
              >
                Ver Estadísticas Completas
              </button>
            </div>

            {/* Última Simulación */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Última Simulación</h3>
              
              {/* Puntuación */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Puntuación Obtenida</span>
                  <span>{progress.lastSimulation.score}/{progress.lastSimulation.maxScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(progress.lastSimulation.score / progress.lastSimulation.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Retroalimentación */}
              <div className="space-y-3 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                    <div className="icon-thumbs-up text-sm mr-2"></div>
                    Aspectos Positivos
                  </h4>
                  <ul className="space-y-1">
                    {progress.lastSimulation.positives.map((positive, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="icon-check text-xs text-green-600 mr-2"></div>
                        {positive}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                    <div className="icon-thumbs-down text-sm mr-2"></div>
                    Áreas de Mejora
                  </h4>
                  <ul className="space-y-1">
                    {progress.lastSimulation.negatives.map((negative, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="icon-x text-xs text-red-600 mr-2"></div>
                        {negative}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('call-simulation')}
                className="btn-primary w-full"
              >
                Repetir Simulación
              </button>
            </div>
          </div>
        </div>

        {/* Nueva Fila - Consejos y Desafíos */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Consejos para Mejorar */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Consejos para Mejorar</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <div className="icon-lightbulb text-xs text-blue-600"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Escucha Activa</h4>
                  <p className="text-xs text-gray-600">Demuestra que entiendes las necesidades del cliente repitiendo sus puntos clave.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <div className="icon-target text-xs text-green-600"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Enfoque en Beneficios</h4>
                  <p className="text-xs text-gray-600">Explica cómo tu producto resuelve problemas específicos del cliente.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <div className="icon-clock text-xs text-purple-600"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Timing del Cierre</h4>
                  <p className="text-xs text-gray-600">Identifica las señales de compra antes de intentar cerrar la venta.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desafíos para Mejora Constante */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Desafíos para Mejora Constante</h3>
            <div className="space-y-3">
              <div className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-orange-800">Desafío Semanal</h4>
                  <span className="text-xs px-2 py-1 bg-orange-200 text-orange-800 rounded-full">Activo</span>
                </div>
                <p className="text-xs text-orange-700">Completa 5 simulaciones sin usar notas de apoyo</p>
                <div className="mt-2">
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-orange-600 mt-1">3/5 completadas</p>
                </div>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-blue-800">Desafío Mensual</h4>
                  <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">Nuevo</span>
                </div>
                <p className="text-xs text-blue-700">Alcanza puntuación promedio de 25+ puntos</p>
                <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700">
                  Aceptar Desafío
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SimulationTraining component error:', error);
    return null;
  }
}