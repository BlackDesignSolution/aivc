function CallSimulation({ onComplete, onBack }) {
  try {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [responses, setResponses] = React.useState([]);
    const [score, setScore] = React.useState(0);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = React.useState(null);
    const [scenario, setScenario] = React.useState(null);

    // Seleccionar escenario basado en dificultad
    React.useEffect(() => {
      if (selectedDifficulty && !scenario) {
        const newScenario = SimulationEngine.getRandomScenarioByDifficulty(selectedDifficulty);
        setScenario(newScenario);
      }
    }, [selectedDifficulty, scenario]);

    const handleDifficultySelect = (difficulty) => {
      setSelectedDifficulty(difficulty);
    };

    const getDifficultyInfo = (difficulty) => {
      const difficultyMap = {
        easy: { 
          label: 'Fácil', 
          description: 'Clientes receptivos y interesados',
          color: 'bg-green-500',
          icon: 'smile'
        },
        medium: { 
          label: 'Intermedio', 
          description: 'Clientes con objeciones moderadas',
          color: 'bg-yellow-500',
          icon: 'meh'
        },
        hard: { 
          label: 'Difícil', 
          description: 'Clientes resistentes y exigentes',
          color: 'bg-red-500',
          icon: 'frown'
        }
      };
      return difficultyMap[difficulty];
    };

    // Pantalla de selección de dificultad
    if (!selectedDifficulty) {
      return (
        <div className="min-h-screen p-4" data-name="difficulty-selection" data-file="components/CallSimulation.js">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button onClick={onBack} className="btn-secondary">
                <div className="icon-arrow-left text-lg mr-2"></div>
                Volver
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Selecciona el Nivel de Dificultad</h1>
              <div></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {['easy', 'medium', 'hard'].map((difficulty) => {
                const diffInfo = getDifficultyInfo(difficulty);
                return (
                  <div 
                    key={difficulty}
                    onClick={() => handleDifficultySelect(difficulty)}
                    className="card hover:shadow-xl transition-all cursor-pointer hover:scale-105"
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 ${diffInfo.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <div className={`icon-${diffInfo.icon} text-2xl text-white`}></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{diffInfo.label}</h3>
                      <p className="text-gray-600 mb-4">{diffInfo.description}</p>
                      <div className="text-sm text-gray-500">
                        {SimulationEngine.getScenariosByDifficulty(difficulty).length} escenarios disponibles
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (!scenario) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    const handleResponse = (option) => {
      const newResponses = [...responses, option];
      setResponses(newResponses);
      setScore(score + option.points);

      if (currentStep < scenario.steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsCompleted(true);
        setTimeout(() => {
          onComplete(score + option.points, {
            scenario: scenario.title,
            responses: newResponses
          });
        }, 2000);
      }
    };

    if (isCompleted) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" data-name="simulation-complete" data-file="components/CallSimulation.js">
          <div className="card text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-check text-2xl text-green-600"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Simulación Completada!</h2>
            <p className="text-gray-600 mb-4">Puntuación final: {score + (responses.length > 0 ? responses[responses.length - 1].points : 0)} puntos</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      );
    }

    const currentScenarioStep = scenario.steps[currentStep];

    return (
      <div className="min-h-screen p-4" data-name="simulation" data-file="components/CallSimulation.js">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="btn-secondary">
              <div className="icon-arrow-left text-lg mr-2"></div>
              Volver
            </button>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getDifficultyInfo(scenario.difficulty).color} mr-2`}>
                  {getDifficultyInfo(scenario.difficulty).label}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{scenario.title}</h1>
              <p className="text-gray-600">{scenario.customer} - {scenario.company}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Paso {currentStep + 1} de {scenario.steps.length}</p>
              <p className="text-lg font-semibold text-blue-600">{score} puntos</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / scenario.steps.length) * 100}%` }}
            ></div>
          </div>

          {/* Scenario */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer Side */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <div className="icon-user text-xl text-purple-600"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cliente</h3>
                  <p className="text-sm text-gray-600">{scenario.customer}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Situación:</p>
                <p className="text-gray-800">{currentScenarioStep.situation}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-800 font-medium">
                  "{currentScenarioStep.customerMessage}"
                </p>
              </div>
            </div>

            {/* Response Options */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Selecciona tu respuesta:</h3>
              <div className="space-y-3">
                {currentScenarioStep.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleResponse(option)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <p className="text-gray-800">{option.text}</p>
                    <p className="text-sm text-blue-600 mt-2">{option.points} puntos</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CallSimulation component error:', error);
    return null;
  }
}