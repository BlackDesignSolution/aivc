// Conector CRM

const CRMConnector = {
  // Simular conexión con CRM
  isConnected: false,
  
  // Conectar con CRM
  async connect(crmType, credentials) {
    // Simulación de conexión
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true;
        resolve({
          success: true,
          message: `Conectado exitosamente a ${crmType}`,
          syncedContacts: 150,
          syncedOpportunities: 45
        });
      }, 2000);
    });
  },

  // Obtener clientes del CRM
  async getClients() {
    if (!this.isConnected) return [];
    
    return [
      {
        id: 'crm_001',
        name: 'TechFlow Solutions',
        contact: 'Diego Martín',
        email: 'diego@techflow.com',
        industry: 'technology',
        status: 'prospecto',
        value: 25000,
        lastContact: '2024-01-10'
      },
      {
        id: 'crm_002',
        name: 'Familia Silva',
        contact: 'Roberto Silva',
        email: 'roberto@email.com',
        industry: 'insurance',
        status: 'interesado',
        value: 1200,
        lastContact: '2024-01-08'
      },
      {
        id: 'crm_003',
        name: 'Constructora del Valle',
        contact: 'Andrea Ruiz',
        email: 'andrea@constructora.com',
        industry: 'insurance',
        status: 'negociación',
        value: 8500,
        lastContact: '2024-01-12'
      }
    ];
  },

  // Obtener oportunidades de venta
  async getOpportunities() {
    if (!this.isConnected) return [];
    
    return [
      {
        id: 'opp_001',
        client: 'TechFlow Solutions',
        title: 'Implementación SaaS',
        value: 25000,
        stage: 'Propuesta',
        probability: 70,
        closeDate: '2024-02-15'
      },
      {
        id: 'opp_002',
        client: 'Familia Silva',
        title: 'Seguro de Vida',
        value: 1200,
        stage: 'Demostración',
        probability: 85,
        closeDate: '2024-01-25'
      }
    ];
  },

  // Sincronizar datos de simulación con CRM
  async syncSimulationData(simulationResult) {
    if (!this.isConnected) return false;
    
    // Simular sincronización
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Datos de simulación sincronizados con CRM',
          activityCreated: true
        });
      }, 1000);
    });
  },

  // Crear simulación basada en cliente real
  createSimulationFromClient(client) {
    const industryScenarios = IndustryScenarios.getIndustryScenarios(client.industry);
    const baseScenario = industryScenarios[0]; // Usar primer escenario como base
    
    if (!baseScenario) return null;
    
    return {
      ...baseScenario,
      title: `Simulación - ${client.name}`,
      client: {
        ...baseScenario.client,
        name: client.contact,
        company: client.name,
        realClient: true,
        crmData: client
      }
    };
  }
};