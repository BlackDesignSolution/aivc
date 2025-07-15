function AICallSimulation({ onComplete, onBack }) {
  try {
    const [currentSimulation, setCurrentSimulation] = React.useState(null);
    const [selectedScenario, setSelectedScenario] = React.useState(null);
    const [conversationHistory, setConversationHistory] = React.useState([]);
    const [vendorMessage, setVendorMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [totalScore, setTotalScore] = React.useState(0);

    const scenarios = AICallSimulationEngine.getAIScenarios();

    // Inicializar simulación cuando se selecciona escenario
    React.useEffect(() => {
      if (selectedScenario && !currentSimulation) {
        const initSimulation = async () => {
          const simulation = await AICallSimulationEngine.initializeSimulation(selectedScenario);
          setCurrentSimulation(simulation);
          
          // Mensaje inicial del cliente
          const initialMessage = {
            speaker: 'client',
            message: `Hola, soy ${selectedScenario.role} de ${selectedScenario.company}. ¿En qué puedo ayudarle?`,
            timestamp: new Date().toLocaleTimeString(),
            score: null
          };
          setConversationHistory([initialMessage]);
        };
        initSimulation();
      }
    }, [selectedScenario, currentSimulation]);

  // Enviar mensaje del vendedor
  const handleSendMessage = async () => {
    if (!vendorMessage.trim() || isLoading) return;

    setIsLoading(true);
    
    // Agregar mensaje del vendedor al historial
    const vendorEntry = {
      speaker: 'vendor',
      message: vendorMessage,
      timestamp: new Date().toLocaleTimeString(),
      score: null
    };
    
    setConversationHistory(prev => [...prev, vendorEntry]);
    const currentMessage = vendorMessage;
    setVendorMessage('');

    try {
      // Simular respuesta del cliente usando IA interna
      const response = await invokeAIAgent(
        `Eres un ${selectedScenario.personality} de ${selectedScenario.company}. 
        Responde como cliente en una llamada de ventas. 
        Mantén el tono ${selectedScenario.difficulty === 'hard' ? 'exigente' : 'profesional'}.
        Responde en 1-2 oraciones máximo.`,
        currentMessage
      );
      
      // Calcular puntuación simple
      const score = Math.floor(Math.random() * 5) + 3;
      
      // Agregar respuesta del cliente
      const clientEntry = {
        speaker: 'client',
        message: response,
        timestamp: new Date().toLocaleTimeString(),
        score: score,
        feedback: score >= 6 ? 'Buen mensaje' : 'Puede mejorar'
      };
      
      setConversationHistory(prev => [...prev, clientEntry]);
      setTotalScore(prev => prev + score);
      
      // Verificar si la simulación debe terminar
      if (conversationHistory.length >= 8 || response.toLowerCase().includes('gracias')) {
        setTimeout(() => {
          setIsCompleted(true);
          onComplete(totalScore + score, {
            scenario: selectedScenario.title,
            messages: conversationHistory.length + 2
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error en simulación:', error);
      // Respuesta de fallback
      const clientEntry = {
        speaker: 'client',
        message: 'Entiendo. ¿Puede darme más detalles?',
        timestamp: new Date().toLocaleTimeString(),
        score: 5,
        feedback: 'Mensaje procesado'
      };
      setConversationHistory(prev => [...prev, clientEntry]);
    }
    
    setIsLoading(false);
  };

    // Pantalla de selección de escenario
    if (!selectedScenario) {
      return (
        <div className="min-h-screen p-4" data-name="ai-scenario-selection" data-file="components/AICallSimulation.js">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button onClick={onBack} className="btn-secondary">
                <div className="icon-arrow-left text-lg mr-2"></div>
                Volver
              </button>
              <h1 className="text-2xl font-bold text-gradient">Simulación con IA</h1>
              <div></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {scenarios.map((scenario) => (
                <div 
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario)}
                  className="card hover:shadow-xl transition-all cursor-pointer hover:scale-105"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#6C90C3] to-[#274272] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <div className="icon-users text-2xl text-white"></div>
                    </div>
                    <h3 className="text-xl font-bold text-[#0D1433] mb-2">{scenario.title}</h3>
                    <p className="text-[#274272] text-sm mb-3">{scenario.company}</p>
                    <p className="text-gray-600 text-xs">{scenario.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (isCompleted) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="card text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="icon-check text-2xl text-green-600"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Simulación Completada!</h2>
            <p className="text-gray-600 mb-4">Puntuación final: {totalScore} puntos</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen p-4" data-name="ai-simulation" data-file="components/AICallSimulation.js">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="btn-secondary">
              <div className="icon-arrow-left text-lg mr-2"></div>
              Volver
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gradient">{selectedScenario.title}</h1>
              <p className="text-[#274272]">Simulación con IA • Puntuación: {totalScore}</p>
            </div>
            <div className="w-20"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Información del Cliente */}
            <div className="card">
              <h3 className="text-lg font-bold text-[#0D1433] mb-4">Información del Cliente</h3>
              <div className="space-y-3 text-sm">
                <div><strong>Empresa:</strong> {selectedScenario.company}</div>
                <div><strong>Rol:</strong> {selectedScenario.role}</div>
                <div><strong>Personalidad:</strong> {selectedScenario.personality}</div>
                <div><strong>Presupuesto:</strong> {selectedScenario.budget}</div>
              </div>
            </div>

            {/* Chat de Conversación */}
            <div className="lg:col-span-2 card">
              <h3 className="text-lg font-bold text-[#0D1433] mb-4">Conversación</h3>
              
              {/* Historial de mensajes */}
              <div className="h-80 overflow-y-auto mb-4 space-y-3 p-4 bg-gray-50 rounded-xl">
                {conversationHistory.map((entry, index) => (
                  <div key={index} className={`flex ${entry.speaker === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-xl ${
                      entry.speaker === 'vendor' 
                        ? 'bg-gradient-to-r from-[#0D1433] to-[#171F55] text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <p className="text-sm">{entry.message}</p>
                      <p className="text-xs opacity-70 mt-1">{entry.timestamp}</p>
                      {entry.score && (
                        <p className="text-xs mt-1 font-medium">
                          +{entry.score} pts • {entry.feedback}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-xl">
                      <div className="animate-pulse text-sm text-gray-500">Cliente escribiendo...</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input para mensaje */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={vendorMessage}
                  onChange={(e) => setVendorMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu respuesta como vendedor..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6C90C3]"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !vendorMessage.trim()}
                  className="btn-primary disabled:opacity-50"
                >
                  <div className="icon-send text-lg"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AICallSimulation component error:', error);
    return null;
  }
}