function SentimentDashboard() {
  try {
    const [sentimentData, setSentimentData] = React.useState(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const chartRef = React.useRef();

    React.useEffect(() => {
      // Simular datos de sentimiento
      setSentimentData({
        overallScore: 78,
        trends: [
          { day: 'Lun', positive: 65, neutral: 25, negative: 10 },
          { day: 'Mar', positive: 70, neutral: 22, negative: 8 },
          { day: 'Mié', positive: 75, neutral: 20, negative: 5 },
          { day: 'Jue', positive: 78, neutral: 18, negative: 4 },
          { day: 'Vie', positive: 82, neutral: 15, negative: 3 }
        ],
        emotions: {
          confianza: 85,
          entusiasmo: 72,
          empatía: 88,
          profesionalismo: 91
        }
      });
    }, []);

    React.useEffect(() => {
      if (sentimentData && chartRef.current) {
        new ChartJS(chartRef.current, {
          type: 'line',
          data: {
            labels: sentimentData.trends.map(t => t.day),
            datasets: [
              {
                label: 'Positivo',
                data: sentimentData.trends.map(t => t.positive),
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
              },
              {
                label: 'Neutral',
                data: sentimentData.trends.map(t => t.neutral),
                borderColor: '#6B7280',
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
                tension: 0.4
              },
              {
                label: 'Negativo',
                data: sentimentData.trends.map(t => t.negative),
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
    }, [sentimentData]);

    return (
      <div data-name="sentiment-dashboard" data-file="components/SentimentDashboard.js">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Análisis de Sentimientos</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Score General */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Puntuación Emocional</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {sentimentData?.overallScore || 0}%
              </div>
              <p className="text-gray-600">Tono emocional positivo</p>
            </div>
          </div>

          {/* Tendencias */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencias Semanales</h3>
            <div className="h-40">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Emociones Detectadas */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emociones Detectadas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sentimentData && Object.entries(sentimentData.emotions).map(([emotion, score]) => (
              <div key={emotion} className="text-center">
                <div className="text-2xl font-bold text-blue-600">{score}%</div>
                <p className="text-sm text-gray-600 capitalize">{emotion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SentimentDashboard component error:', error);
    return null;
  }
}