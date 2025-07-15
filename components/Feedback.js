function Feedback({ onContinue, progress }) {
  try {
    const chartRefs = React.useRef({});
    const [categoryAnalysis] = React.useState({
      comunicacionVerbal: 85,
      conocimientoProducto: 72,
      manejoObjeciones: 68,
      tecnicasCierre: 60,
      empatiaCliente: 90
    });

    const [keyMoments] = React.useState([
      { time: '0:45', description: 'Excelente apertura y presentación personal', type: 'good' },
      { time: '2:15', description: 'Identificó correctamente las necesidades del cliente', type: 'good' },
      { time: '4:30', description: 'Perdió oportunidad de hacer pregunta de seguimiento', type: 'warning' },
      { time: '6:20', description: 'Manejo inadecuado de la objeción de precio', type: 'bad' },
      { time: '8:10', description: 'Cierre apresurado sin confirmar interés', type: 'bad' }
    ]);

    const [resources] = React.useState([
      { title: 'Guía de Técnicas de Cierre', type: 'guide', icon: 'book', color: 'bg-blue-100 text-blue-800' },
      { title: 'Video: Manejo de Objeciones', type: 'video', icon: 'play', color: 'bg-red-100 text-red-800' },
      { title: 'Podcast: Psicología de Ventas', type: 'podcast', icon: 'headphones', color: 'bg-purple-100 text-purple-800' },
      { title: 'Webinar: Cierre Consultivo', type: 'webinar', icon: 'monitor', color: 'bg-green-100 text-green-800' }
    ]);

    // Crear gráfico de tiempo de llamada
    React.useEffect(() => {
      const timeCtx = chartRefs.current.timeChart;
      if (timeCtx) {
        new ChartJS(timeCtx, {
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Tu Tiempo',
                data: [15, 12, 14, 11, 10, 12],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
              },
              {
                label: 'Tiempo Óptimo',
                data: [8, 8, 8, 8, 8, 8],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderDash: [5, 5],
                tension: 0.4
              }
            ]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: true, position: 'bottom' } }
          }
        });
      }
    }, []);

    const getScoreColor = (score) => {
      if (score >= 80) return 'bg-green-500';
      if (score >= 60) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    const getMomentColor = (type) => {
      switch(type) {
        case 'good': return 'bg-green-50 border-green-200 text-green-800';
        case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        case 'bad': return 'bg-red-50 border-red-200 text-red-800';
        default: return 'bg-gray-50 border-gray-200 text-gray-800';
      }
    };

    return (
      <div data-name="feedback" data-file="components/Feedback.js">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Retroalimentación Detallada</h1>
          <p className="text-gray-600">Análisis completo de tu última simulación de llamada</p>
        </div>

        {/* Primera Fila - Métricas Principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Puntuación General */}
          <div className="card bg-gradient-to-br from-white to-slate-50">
            <h3 className="text-lg font-bold text-[#0D1433] mb-6">Puntuación General</h3>
            <div className="text-center mb-6">
              <div className="text-5xl font-black text-gradient mb-4">75/100</div>
              <div className="w-full bg-gray-200 rounded-full h-6 shadow-inner">
                <div className="bg-gradient-to-r from-[#6C90C3] to-[#274272] h-6 rounded-full transition-all duration-1000 shadow-lg" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm font-semibold text-[#274272] mt-3">Bueno - Continúa mejorando</p>
            </div>
          </div>

          {/* Tiempo de Llamada */}
          <div className="card bg-gradient-to-br from-white to-blue-50">
            <h3 className="text-lg font-bold text-[#0D1433] mb-4">Tiempo de Llamada</h3>
            <div className="h-40 p-2">
              <canvas ref={el => chartRefs.current.timeChart = el}></canvas>
            </div>
          </div>

          {/* Áreas de Mejora */}
          <div className="card bg-gradient-to-br from-white to-indigo-50">
            <h3 className="text-lg font-bold text-[#0D1433] mb-6">Áreas de Mejora</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm">
                <span className="text-sm font-medium text-[#0D1433]">Técnicas de cierre</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 shadow-sm">Mejora</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm">
                <span className="text-sm font-medium text-[#0D1433]">Manejo de objeciones</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 shadow-sm">Mejora</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm">
                <span className="text-sm font-medium text-[#0D1433]">Comunicación verbal</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 shadow-sm">Óptimo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Segunda Fila - Análisis por Categoría y Momentos Clave */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Análisis por Categoría */}
          <div className="card bg-gradient-to-br from-white to-purple-50">
            <h3 className="text-lg font-bold text-[#0D1433] mb-6">Análisis por Categoría</h3>
            <div className="space-y-5">
              {Object.entries(categoryAnalysis).map(([category, score]) => (
                <div key={category} className="p-3 rounded-xl bg-white shadow-sm">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="capitalize font-semibold text-[#0D1433]">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-bold text-[#274272]">{score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 shadow-sm ${getScoreColor(score)}`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Momentos Clave */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Momentos Clave</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {keyMoments.map((moment, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getMomentColor(moment.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">{moment.time}</div>
                      <div className="text-xs">{moment.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tercera Fila - Recomendaciones y Recursos */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recomendaciones Personalizadas */}
          <div className="card bg-gradient-to-br from-white to-blue-50">
            <h3 className="text-lg font-bold text-[#0D1433] mb-6">Recomendaciones Personalizadas</h3>
            <div className="bg-gradient-to-r from-[#6C90C3]/10 to-[#274272]/10 rounded-xl p-5 mb-6 border border-[#6C90C3]/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#6C90C3] to-[#274272] rounded-xl flex items-center justify-center shadow-lg">
                  <div className="icon-user text-white text-lg"></div>
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1433] mb-2">Supervisor: María González</h4>
                  <p className="text-sm text-[#274272] leading-relaxed">
                    "Enfócate en practicar técnicas de cierre consultivo. Tu comunicación es excelente, 
                    pero necesitas más confianza al momento de cerrar la venta."
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="btn-primary flex-1 text-sm">
                <div className="icon-book text-sm mr-2"></div>
                Cursos Recomendados
              </button>
              <button className="btn-secondary flex-1 text-sm">
                <div className="icon-calendar text-sm mr-2"></div>
                Agendar Práctica
              </button>
            </div>
          </div>

          {/* Recursos Sugeridos */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos Sugeridos</h3>
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${resource.color}`}>
                    <div className={`icon-${resource.icon} text-lg`}></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{resource.title}</h4>
                    <p className="text-xs text-gray-600 capitalize">{resource.type}</p>
                  </div>
                  <div className="icon-chevron-right text-gray-400"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-8">
          <button onClick={onContinue} className="btn-primary">
            Continuar Entrenamiento
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Feedback component error:', error);
    return null;
  }
}
