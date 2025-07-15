function IndustryModules({ onNavigate }) {
  try {
    const [industries, setIndustries] = React.useState([]);
    const [selectedIndustry, setSelectedIndustry] = React.useState(null);
    const [scenarios, setScenarios] = React.useState([]);

    React.useEffect(() => {
      setIndustries(IndustryScenarios.getAllIndustries());
    }, []);

    React.useEffect(() => {
      if (selectedIndustry) {
        setScenarios(IndustryScenarios.getIndustryScenarios(selectedIndustry.id));
      }
    }, [selectedIndustry]);

    const startScenario = (scenario) => {
      // Navegar a simulación con escenario específico
      onNavigate('call-simulation', { industryScenario: scenario });
    };

    return (
      <div data-name="industry-modules" data-file="components/IndustryModules.js">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Módulos por Industria</h1>
          <p className="text-gray-600">Entrena con escenarios específicos de tu sector</p>
        </div>

        {!selectedIndustry ? (
          // Vista de selección de industria
          <div className="grid md:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div 
                key={industry.id}
                onClick={() => setSelectedIndustry(industry)}
                className="card hover:shadow-xl transition-all cursor-pointer hover:scale-105"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 bg-${industry.color}-100 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <div className={`icon-${industry.icon} text-2xl text-${industry.color}-600`}></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{industry.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {industry.scenarios.length} escenarios disponibles
                  </p>
                  <div className="flex justify-center space-x-2">
                    {industry.scenarios.map((_, index) => (
                      <div key={index} className={`w-2 h-2 rounded-full bg-${industry.color}-300`}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Vista de escenarios de la industria
          <div>
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setSelectedIndustry(null)}
                className="btn-secondary mr-4"
              >
                <div className="icon-arrow-left text-lg mr-2"></div>
                Volver
              </button>
              <div className="flex items-center">
                <div className={`w-10 h-10 bg-${selectedIndustry.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                  <div className={`icon-${selectedIndustry.icon} text-xl text-${selectedIndustry.color}-600`}></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedIndustry.name}</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{scenario.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      scenario.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      scenario.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {scenario.difficulty === 'easy' ? 'Fácil' :
                       scenario.difficulty === 'medium' ? 'Intermedio' : 'Difícil'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{scenario.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Cliente:</h4>
                    <p className="text-sm text-gray-700">{scenario.client.name}</p>
                    <p className="text-xs text-gray-600">{scenario.client.company}</p>
                  </div>
                  
                  <button 
                    onClick={() => startScenario(scenario)}
                    className="btn-primary w-full"
                  >
                    Iniciar Escenario
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('IndustryModules component error:', error);
    return null;
  }
}
