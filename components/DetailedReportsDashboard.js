function DetailedReportsDashboard({ progress }) {
  try {
    const [reportData, setReportData] = React.useState(null);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [selectedPeriod, setSelectedPeriod] = React.useState('month');

    const generateReport = async () => {
      setIsGenerating(true);
      try {
        const report = await DetailedReports.generatePerformanceReport(progress, selectedPeriod);
        setReportData(report);
      } catch (error) {
        console.error('Error generando reporte:', error);
      }
      setIsGenerating(false);
    };

    React.useEffect(() => {
      generateReport();
    }, [selectedPeriod]);

    if (isGenerating) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Generando reporte detallado...</p>
          </div>
        </div>
      );
    }

    return (
      <div data-name="detailed-reports" data-file="components/DetailedReportsDashboard.js">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reportes Detallados</h2>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="week">Semana</option>
              <option value="month">Mes</option>
              <option value="quarter">Trimestre</option>
            </select>
            <button
              onClick={generateReport}
              className="btn-primary"
            >
              Actualizar Reporte
            </button>
          </div>
        </div>

        {reportData && (
          <div className="space-y-6">
            {/* Resumen Ejecutivo */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen Ejecutivo</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{reportData.summary.totalCalls}</div>
                  <p className="text-sm text-gray-600">Total Llamadas</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{reportData.summary.averageScore}</div>
                  <p className="text-sm text-gray-600">Puntuación Promedio</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">+{reportData.summary.improvement}%</div>
                  <p className="text-sm text-gray-600">Mejora</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">#{3}</div>
                  <p className="text-sm text-gray-600">Ranking Equipo</p>
                </div>
              </div>
            </div>

            {/* Métricas Clave */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Rendimiento</h3>
                <div className="space-y-4">
                  {Object.entries(reportData.metrics).map(([metric, data]) => (
                    <div key={metric} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">{data.current}</span>
                        <div className={`icon-${data.trend === 'up' ? 'trending-up' : 'trending-down'} text-sm ${
                          data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparaciones</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>vs. Promedio Industria</span>
                      <span>+7 puntos</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Meta Mensual</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones Personalizadas</h3>
              <div className="space-y-3">
                {reportData.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-medium text-gray-900">{rec.area}</h4>
                    <p className="text-sm text-gray-600 mb-1">{rec.action}</p>
                    <p className="text-sm text-green-600">{rec.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('DetailedReportsDashboard component error:', error);
    return null;
  }
}