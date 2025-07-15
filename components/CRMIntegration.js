function CRMIntegration() {
  try {
    const [isConnected, setIsConnected] = React.useState(false);
    const [clients, setClients] = React.useState([]);
    const [opportunities, setOpportunities] = React.useState([]);
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [selectedCRM, setSelectedCRM] = React.useState('salesforce');

    const connectToCRM = async () => {
      setIsConnecting(true);
      try {
        const result = await CRMConnector.connect(selectedCRM, {});
        if (result.success) {
          setIsConnected(true);
          const clientData = await CRMConnector.getClients();
          const oppData = await CRMConnector.getOpportunities();
          setClients(clientData);
          setOpportunities(oppData);
        }
      } catch (error) {
        console.error('Error conectando CRM:', error);
      }
      setIsConnecting(false);
    };

    const createSimulationFromClient = (client) => {
      const simulation = CRMConnector.createSimulationFromClient(client);
      if (simulation) {
        alert(`Simulación creada para ${client.name}`);
      }
    };

    return (
      <div data-name="crm-integration" data-file="components/CRMIntegration.js">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Integración CRM</h1>
          <p className="text-gray-600">Conecta tu CRM para entrenar con datos reales</p>
        </div>

        {!isConnected ? (
          <div className="card max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conectar CRM</h3>
            <div className="space-y-4">
              <select
                value={selectedCRM}
                onChange={(e) => setSelectedCRM(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="salesforce">Salesforce</option>
                <option value="hubspot">HubSpot</option>
                <option value="pipedrive">Pipedrive</option>
              </select>
              <button
                onClick={connectToCRM}
                disabled={isConnecting}
                className="btn-primary w-full"
              >
                {isConnecting ? 'Conectando...' : 'Conectar CRM'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clientes</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {clients.map((client) => (
                  <div key={client.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{client.name}</h4>
                        <p className="text-sm text-gray-600">{client.contact}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">
                        ${client.value.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => createSimulationFromClient(client)}
                      className="btn-secondary text-sm w-full"
                    >
                      Crear Simulación
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Oportunidades</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {opportunities.map((opp) => (
                  <div key={opp.id} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900">{opp.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{opp.client}</p>
                    <div className="flex justify-between text-sm">
                      <span>{opp.stage}</span>
                      <span className="font-bold">{opp.probability}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('CRMIntegration component error:', error);
    return null;
  }
}