// Escenarios por Industria

const IndustryScenarios = {
  // Módulos por industria
  industries: {
    technology: {
      name: 'Tecnología',
      icon: 'cpu',
      color: 'blue',
      scenarios: [
        {
          id: 'saas_startup',
          title: 'Venta de SaaS a Startup',
          description: 'Convence a una startup de adoptar tu plataforma',
          difficulty: 'medium',
          client: {
            name: 'Diego Martín - CTO',
            company: 'InnovateTech',
            personality: 'técnico y analítico',
            budget: 'Limitado pero dispuesto a invertir en eficiencia',
            painPoints: ['Escalabilidad', 'Integración', 'Costos operativos']
          }
        },
        {
          id: 'enterprise_software',
          title: 'Software Empresarial',
          description: 'Venta de solución enterprise a gran corporación',
          difficulty: 'hard',
          client: {
            name: 'Carmen López - IT Director',
            company: 'MegaCorp International',
            personality: 'cautelosa y orientada a procesos',
            budget: 'Alto pero con proceso de aprobación complejo',
            painPoints: ['Seguridad', 'Compliance', 'ROI medible']
          }
        }
      ]
    },
    insurance: {
      name: 'Seguros',
      icon: 'shield',
      color: 'green',
      scenarios: [
        {
          id: 'life_insurance',
          title: 'Seguro de Vida Familiar',
          description: 'Venta de póliza a familia joven',
          difficulty: 'easy',
          client: {
            name: 'Roberto y María Silva',
            company: 'Familia Silva',
            personality: 'preocupados por el futuro',
            budget: 'Medio, buscan protección accesible',
            painPoints: ['Protección familiar', 'Costos', 'Simplicidad']
          }
        },
        {
          id: 'business_insurance',
          title: 'Seguro Empresarial',
          description: 'Póliza integral para PyME',
          difficulty: 'medium',
          client: {
            name: 'Andrea Ruiz - CEO',
            company: 'Constructora del Valle',
            personality: 'práctica y orientada a resultados',
            budget: 'Variable según cobertura',
            painPoints: ['Riesgos operativos', 'Costos', 'Cobertura completa']
          }
        }
      ]
    },
    realestate: {
      name: 'Inmobiliario',
      icon: 'home',
      color: 'orange',
      scenarios: [
        {
          id: 'first_home',
          title: 'Primera Vivienda',
          description: 'Venta de departamento a pareja joven',
          difficulty: 'easy',
          client: {
            name: 'Javier y Sofía Morales',
            company: 'Pareja Joven',
            personality: 'emocionados pero indecisos',
            budget: 'Limitado, necesitan financiamiento',
            painPoints: ['Precio', 'Ubicación', 'Financiamiento']
          }
        },
        {
          id: 'investment_property',
          title: 'Propiedad de Inversión',
          description: 'Venta de oficinas a inversionista',
          difficulty: 'hard',
          client: {
            name: 'Alejandro Torres - Inversionista',
            company: 'Torres Capital',
            personality: 'analítico y exigente con ROI',
            budget: 'Alto pero requiere justificación detallada',
            painPoints: ['ROI', 'Ubicación estratégica', 'Potencial de valorización']
          }
        }
      ]
    }
  },

  // Obtener escenarios por industria
  getIndustryScenarios(industryId) {
    return this.industries[industryId]?.scenarios || [];
  },

  // Obtener todas las industrias
  getAllIndustries() {
    return Object.entries(this.industries).map(([id, industry]) => ({
      id,
      ...industry
    }));
  },

  // Obtener escenario específico
  getScenario(industryId, scenarioId) {
    const industry = this.industries[industryId];
    return industry?.scenarios.find(s => s.id === scenarioId);
  }
};