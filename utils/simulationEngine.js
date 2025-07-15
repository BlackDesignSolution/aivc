// Simulación Engine - Maneja la lógica de las simulaciones de ventas

const SimulationEngine = {
  // Escenarios predefinidos con tres niveles de dificultad
  scenarios: [
    // NIVEL FÁCIL - Clientes receptivos
    {
      id: 1,
      title: 'Convenio con Empresa Familiar',
      customer: 'Ana Martínez - Propietaria',
      company: 'Panadería La Tradicional',
      difficulty: 'easy',
      steps: [
        {
          situation: 'Cliente interesado en servicios de delivery para expandir su negocio.',
          customerMessage: 'Hemos pensado en ofrecer delivery, pero no sabemos cómo empezar.',
          options: [
            { text: 'Perfecto, nuestro sistema de delivery puede aumentar sus ventas hasta un 40%. ¿Le gustaría ver una demostración?', points: 10 },
            { text: 'Tenemos un paquete especial para panaderías como la suya.', points: 7 },
            { text: 'El delivery es muy popular ahora, deberían implementarlo.', points: 4 }
          ]
        },
        {
          situation: 'El cliente quiere conocer los costos del servicio.',
          customerMessage: 'Me interesa, ¿cuáles serían los costos para nosotros?',
          options: [
            { text: 'Entiendo su preocupación. Trabajamos con comisión por venta, así que solo paga cuando vende. ¿Le parece justo?', points: 10 },
            { text: 'Tenemos tarifas muy competitivas en el mercado.', points: 6 },
            { text: 'Los costos se recuperan rápidamente con el aumento de ventas.', points: 5 }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Alianza con Startup',
      customer: 'Luis Fernández - CEO',
      company: 'TechStart Solutions',
      difficulty: 'easy',
      steps: [
        {
          situation: 'Startup buscando servicios de marketing digital para crecer.',
          customerMessage: 'Necesitamos ayuda con marketing digital, pero tenemos presupuesto limitado.',
          options: [
            { text: 'Entiendo perfectamente. Ofrecemos planes escalables que crecen con su empresa. ¿Cuál es su objetivo principal?', points: 10 },
            { text: 'Tenemos paquetes especiales para startups con descuentos.', points: 7 },
            { text: 'El marketing digital es esencial para cualquier startup.', points: 4 }
          ]
        }
      ]
    },

    // NIVEL MEDIO - Clientes con objeciones moderadas
    {
      id: 3,
      title: 'Convenio Corporativo - Retail',
      customer: 'Patricia Ruiz - Directora Comercial',
      company: 'MegaStore Retail',
      difficulty: 'medium',
      steps: [
        {
          situation: 'Cadena de retail evaluando sistema de gestión de inventarios.',
          customerMessage: 'Ya tenemos un sistema funcionando. ¿Por qué deberíamos cambiarnos?',
          options: [
            { text: 'Excelente pregunta. ¿Me permite mostrarle cómo nuestro sistema puede reducir sus pérdidas de inventario en un 25%?', points: 10 },
            { text: 'Nuestro sistema es más moderno y eficiente que los anteriores.', points: 6 },
            { text: 'Muchas empresas como la suya ya se han cambiado a nosotros.', points: 4 }
          ]
        },
        {
          situation: 'Cliente preocupado por la migración de datos.',
          customerMessage: 'El cambio suena complicado. ¿Qué pasa con todos nuestros datos actuales?',
          options: [
            { text: 'Comprendo su preocupación. Incluimos migración completa sin costo adicional y garantizamos cero pérdida de datos.', points: 10 },
            { text: 'Tenemos un equipo especializado en migraciones de datos.', points: 7 },
            { text: 'La migración es un proceso estándar, no hay problema.', points: 3 }
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'Alianza Estratégica - Manufactura',
      customer: 'Roberto Silva - Gerente de Operaciones',
      company: 'IndustriaMax',
      difficulty: 'medium',
      steps: [
        {
          situation: 'Empresa manufacturera evaluando sistema de automatización.',
          customerMessage: 'La automatización suena bien, pero nuestros empleados pueden resistirse al cambio.',
          options: [
            { text: 'Es una preocupación válida. Incluimos capacitación completa y soporte durante la transición. ¿Le gustaría conocer nuestro programa de adopción?', points: 10 },
            { text: 'La automatización es inevitable, es mejor adaptarse ahora.', points: 5 },
            { text: 'Muchas empresas han pasado por esto exitosamente.', points: 6 }
          ]
        }
      ]
    },

    // NIVEL DIFÍCIL - Clientes resistentes y exigentes
    {
      id: 5,
      title: 'Convenio Gubernamental',
      customer: 'Dr. Carmen López - Directora de Compras',
      company: 'Ministerio de Salud',
      difficulty: 'hard',
      steps: [
        {
          situation: 'Institución gubernamental con procesos estrictos de licitación.',
          customerMessage: 'Tenemos procesos muy rigurosos. ¿Cómo sabemos que pueden cumplir con nuestras exigencias?',
          options: [
            { text: 'Comprendo la importancia de la transparencia. Tenemos certificaciones ISO y referencias de 15 gobiernos. ¿Le gustaría revisar nuestro historial?', points: 10 },
            { text: 'Somos una empresa seria con mucha experiencia en el sector público.', points: 5 },
            { text: 'Cumplimos con todos los requisitos legales necesarios.', points: 3 }
          ]
        },
        {
          situation: 'Cliente exige garantías específicas de rendimiento.',
          customerMessage: 'Necesitamos garantías de que el sistema funcionará 24/7 sin fallos.',
          options: [
            { text: 'Absolutamente. Ofrecemos SLA del 99.9% con penalizaciones si no cumplimos, más soporte técnico 24/7. ¿Qué otras garantías necesita?', points: 10 },
            { text: 'Nuestros sistemas son muy confiables, rara vez fallan.', points: 4 },
            { text: 'Podemos discutir las garantías en el contrato.', points: 6 }
          ]
        }
      ]
    },
    {
      id: 6,
      title: 'Alianza con Competidor Indirecto',
      customer: 'Alejandro Morales - VP Estrategia',
      company: 'GlobalTech Corp',
      difficulty: 'hard',
      steps: [
        {
          situation: 'Empresa que ve la propuesta como amenaza a su modelo de negocio.',
          customerMessage: 'Esto podría afectar nuestro modelo actual. ¿Por qué deberíamos arriesgarnos?',
          options: [
            { text: 'Entiendo su cautela. Propongo una alianza que expanda su mercado sin canibalizar el actual. ¿Podríamos explorar sinergias?', points: 10 },
            { text: 'El mercado está cambiando, es mejor adaptarse ahora.', points: 4 },
            { text: 'Podríamos estructurar el acuerdo para minimizar riesgos.', points: 7 }
          ]
        },
        {
          situation: 'Cliente cuestiona la viabilidad a largo plazo.',
          customerMessage: 'Suena interesante, pero ¿cómo sabemos que esto será sostenible en 5 años?',
          options: [
            { text: 'Excelente pregunta estratégica. Basado en análisis de mercado, esta tendencia crecerá 300% en 5 años. ¿Le muestro las proyecciones?', points: 10 },
            { text: 'Nuestro modelo de negocio está diseñado para ser sostenible.', points: 5 },
            { text: 'Muchas empresas ya están apostando por esta dirección.', points: 6 }
          ]
        }
      ]
    },
    {
      id: 7,
      title: 'Convenio Internacional',
      customer: 'Michelle Chen - Global Director',
      company: 'Asia-Pacific Enterprises',
      difficulty: 'hard',
      steps: [
        {
          situation: 'Empresa multinacional con altos estándares de compliance.',
          customerMessage: 'Operamos en 12 países con regulaciones diferentes. ¿Pueden adaptarse a todas?',
          options: [
            { text: 'Absolutamente. Tenemos experiencia en 25 países y un equipo legal especializado en compliance internacional. ¿Cuáles son sus mercados prioritarios?', points: 10 },
            { text: 'Tenemos experiencia internacional y podemos adaptarnos.', points: 6 },
            { text: 'Estamos preparados para trabajar globalmente.', points: 4 }
          ]
        }
      ]
    }
  ],

  // Generar un escenario aleatorio
  getRandomScenario() {
    const randomIndex = Math.floor(Math.random() * this.scenarios.length);
    return this.scenarios[randomIndex];
  },

  // Obtener escenarios por dificultad
  getScenariosByDifficulty(difficulty) {
    return this.scenarios.filter(scenario => scenario.difficulty === difficulty);
  },

  // Obtener escenario aleatorio por nivel de dificultad
  getRandomScenarioByDifficulty(difficulty) {
    const scenariosByDifficulty = this.getScenariosByDifficulty(difficulty);
    if (scenariosByDifficulty.length === 0) return this.getRandomScenario();
    const randomIndex = Math.floor(Math.random() * scenariosByDifficulty.length);
    return scenariosByDifficulty[randomIndex];
  },

  // Calcular puntuación basada en las respuestas
  calculateScore(responses) {
    return responses.reduce((total, response) => total + response.points, 0);
  },

  // Generar retroalimentación basada en la puntuación
  generateFeedback(score, totalQuestions) {
    const percentage = (score / (totalQuestions * 10)) * 100;
    
    if (percentage >= 80) {
      return {
        level: 'Excelente',
        message: '¡Excepcional! Dominas las técnicas de venta.',
        color: 'green'
      };
    } else if (percentage >= 60) {
      return {
        level: 'Bueno',
        message: 'Buen trabajo, pero hay espacio para mejorar.',
        color: 'blue'
      };
    } else {
      return {
        level: 'Necesita mejora',
        message: 'Sigue practicando para mejorar tus habilidades.',
        color: 'orange'
      };
    }
  },

  // Determinar el nivel del usuario basado en llamadas completadas
  calculateUserLevel(completedCalls) {
    return Math.floor(completedCalls / 5) + 1;
  },

  // Verificar si el usuario ha desbloqueado un nuevo nivel
  checkLevelUp(previousCalls, newCalls) {
    const previousLevel = this.calculateUserLevel(previousCalls);
    const newLevel = this.calculateUserLevel(newCalls);
    return newLevel > previousLevel;
  }
};