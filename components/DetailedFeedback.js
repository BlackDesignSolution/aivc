function DetailedFeedback({ progress, onNavigate }) {
  try {
    const chartRefs = React.useRef({});
    const [selectedPeriod, setSelectedPeriod] = React.useState('month');

    // Crear gráfico de tiempo de llamada
    React.useEffect(() => {
      const timeCtx = chartRefs.current.timeChart;
      if (timeCtx) {
        new ChartJS(timeCtx, {
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
              label: 'Tiempo (min)',
              data: [15, 12, 14, 11, 10, 8],
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } }
          }
        });
      }
    }, []);

    // Crear gráfico de evolución de puntajes
    React.useEffect(() => {
      const evolutionCtx = chartRefs.current.evolutionChart;
      if (evolutionCtx) {
        new ChartJS(evolutionCtx, {
          type: 'line',
          data: {
            labels: ['S1', 'S2', 'S3', 'S4'],
            datasets: [{
              label: 'Puntaje',
              data: [18, 22, 25, 28],
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } }
          }
        });
      }
    }, [selectedPeriod]);

    // Crear gráfico de desempeño por período
    React.useEffect(() => {
      const performanceCtx = chartRefs.current.performanceChart;
      if (performanceCtx) {
        new ChartJS(performanceCtx, {
          type: 'bar',
          data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
            datasets: [{
              label: 'Llamadas',
              data: [3, 5, 2, 4, 6],
              backgroundColor: '#8B5CF6'
            }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } }
          }
        });
      }
    }, []);

    const teamRanking = [
      { name: 'Carlos Mendoza', score: 95 },
      { name: 'Ana Rodríguez', score: 88 },
      { name: 'Tú', score: 75, isUser: true },
      { name: 'Luis García', score: 72 }
    ];

    return (
      <div data-name="detailed-feedback" data-file="components/DetailedFeedback.js">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Retroalimentación Detallada</h1>
            <p className="text-gray-600">Análisis completo de tu rendimiento</p>
          </div>
          <button onClick={() => onNavigate('scores')} className="btn-secondary">
            <div className="icon-arrow-left text-lg mr-2"></div>
            Volver
          </button>
        </div>

        {/* Primera Sección - Métricas Principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Puntuación General */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Puntuación General</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Tu Puntuación</span>
                <span>75/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Bueno - Continúa mejorando</p>
          </div>

          {/* Tiempo de Llamada */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiempo de Llamada</h3>
            <div className="h-32">
              <canvas ref={el => chartRefs.current.timeChart = el}></canvas>
            </div>
          </div>

          {/* Áreas de Mejora */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Áreas de Mejora</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Técnicas de cierre</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span>Manejo de objeciones</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>Seguimiento post-venta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Segunda Sección - Evolución y Desempeño */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Evolución de Puntajes */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Evolución de Puntajes</h3>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="week">Semana</option>
                <option value="month">Mes</option>
                <option value="quarter">Trimestre</option>
              </select>
            </div>
            <div className="h-40">
              <canvas ref={el => chartRefs.current.evolutionChart = el}></canvas>
            </div>
          </div>

          {/* Área de Desempeño */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Llamadas por Período</h3>
            <div className="h-40">
              <canvas ref={el => chartRefs.current.performanceChart = el}></canvas>
            </div>
          </div>
        </div>

        {/* Tercera Sección - Análisis Detallado */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Áreas Fuertes */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Áreas Fuertes</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="icon-check text-green-600 mr-2"></div>
                <span className="text-sm">Comunicación clara</span>
              </div>
              <div className="flex items-center">
                <div className="icon-check text-green-600 mr-2"></div>
                <span className="text-sm">Escucha activa</span>
              </div>
              <div className="flex items-center">
                <div className="icon-check text-green-600 mr-2"></div>
                <span className="text-sm">Presentación del producto</span>
              </div>
            </div>
          </div>

          {/* Áreas de Mejora */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Áreas de Mejora</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <div className="icon-arrow-up text-orange-600 mr-2"></div>
                <span className="text-sm">Técnicas de persuasión</span>
              </div>
              <div className="flex items-center">
                <div className="icon-arrow-up text-orange-600 mr-2"></div>
                <span className="text-sm">Manejo de precios</span>
              </div>
              <div className="flex items-center">
                <div className="icon-arrow-up text-orange-600 mr-2"></div>
                <span className="text-sm">Cierre efectivo</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('feedback')}
              className="btn-primary w-full text-sm"
            >
              Ver Recursos para Mejorar
            </button>
          </div>

          {/* Ranking del Equipo */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking del Equipo</h3>
            <div className="space-y-3">
              {teamRanking.map((member, index) => (
                <div key={index} className={`p-2 rounded-lg ${member.isUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${member.isUser ? 'text-blue-900' : 'text-gray-900'}`}>
                      #{index + 1} {member.name}
                    </span>
                    <span className="text-sm font-bold">{member.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${member.isUser ? 'bg-blue-600' : 'bg-gray-400'}`}
                      style={{ width: `${member.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DetailedFeedback component error:', error);
    return null;
  }
}