function MainDashboard({ user, progress, onNavigate }) {
  try {
    const chartRefs = React.useRef({});
    const [performanceData] = React.useState({
      tasaCierre: 78,
      tiempoPromedio: 12,
      satisfaccion: 4.8
    });

    // Crear gráfico de progreso (pastel)
    React.useEffect(() => {
      const progressCtx = chartRefs.current.progressChart;
      if (progressCtx) {
        new ChartJS(progressCtx, {
          type: 'doughnut',
          data: {
            labels: ['Completado', 'Restante'],
            datasets: [{
              data: [progress.completedCalls * 20, 100 - (progress.completedCalls * 20)],
              backgroundColor: ['#3B82F6', '#E5E7EB'],
              borderWidth: 0
            }]
          },
          options: {
            cutout: '70%',
            plugins: { legend: { display: false } }
          }
        });
      }
    }, [progress.completedCalls]);

    // Crear gráfico de rendimiento
    React.useEffect(() => {
      const performanceCtx = chartRefs.current.performanceChart;
      if (performanceCtx) {
        new ChartJS(performanceCtx, {
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
              label: 'Rendimiento',
              data: [65, 72, 78, 75, 82, 85],
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, max: 100 }
            }
          }
        });
      }
    }, []);

    const upcomingSessions = [
      { title: 'Entrenamiento Grupal', icon: 'users', time: 'Mañana 10:00 AM' },
      { title: 'Simulación 1:1', icon: 'phone', time: 'Viernes 2:00 PM' },
      { title: 'Técnicas Avanzadas', icon: 'book', time: 'Lunes 9:00 AM' }
    ];

    return (
      <div data-name="dashboard" data-file="components/MainDashboard.js">
        {/* Bienvenida */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Continúa mejorando tus habilidades de ventas con nuestras herramientas de entrenamiento
          </p>
        </div>

        {/* Tarjetas principales con gráficos */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Progreso */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <canvas ref={el => chartRefs.current.progressChart = el}></canvas>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{progress.completedCalls * 20}%</span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600">Nivel {progress.level}</p>
          </div>

          {/* Llamadas Simuladas */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Llamadas Simuladas</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Completadas</span>
                <span>{progress.completedCalls}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(progress.completedCalls / 10) * 100}%` }}
                ></div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('simulation')}
              className="btn-primary w-full"
            >
              Continuar Entrenamiento
            </button>
          </div>

          {/* Retroalimentaciones */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Retroalimentaciones</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Disponibles</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {progress.completedCalls}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revisadas</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  {Math.floor(progress.completedCalls * 0.7)}
                </span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('feedback')}
              className="btn-secondary w-full mt-4"
            >
              Ver Retroalimentaciones
            </button>
          </div>
        </div>

        {/* Segunda sección */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Próximas Sesiones */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Sesiones</h3>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <div className={`icon-${session.icon} text-blue-600`}></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{session.title}</h4>
                    <p className="text-sm text-gray-600">{session.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico de Rendimiento */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento</h3>
            <div className="h-40 mb-4">
              <canvas ref={el => chartRefs.current.performanceChart = el}></canvas>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{performanceData.tasaCierre}%</p>
                <p className="text-xs text-gray-600">Tasa de Cierre</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{performanceData.tiempoPromedio}min</p>
                <p className="text-xs text-gray-600">Tiempo Promedio</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{performanceData.satisfaccion}/5</p>
                <p className="text-xs text-gray-600">Satisfacción</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recomendación Personalizada */}
        <div className="card">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <div className="icon-lightbulb text-xl text-yellow-600"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recomendación Personalizada</h3>
              <p className="text-gray-600 mb-4">
                Basado en tu rendimiento, te recomendamos el módulo "Manejo Avanzado de Objeciones" 
                para mejorar tu tasa de cierre en un 15%.
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => onNavigate('courses')}
                  className="btn-primary"
                >
                  Ver Módulo Recomendado
                </button>
                <button className="btn-secondary">
                  Programar Sesión con Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('MainDashboard component error:', error);
    return null;
  }
}
