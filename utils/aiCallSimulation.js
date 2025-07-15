// AI Call Simulation Engine - Integración con ChatGPT API

const AICallSimulationEngine = {
  apiKey: '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',
  
  // Inicializar simulación con contexto del cliente
  async initializeSimulation(scenario) {
    const systemPrompt = `Eres un cliente ${scenario.personality} en una llamada de ventas. 
    Tu empresa: ${scenario.company}
    Tu rol: ${scenario.role}
    Tu personalidad: ${scenario.description}
    Presupuesto: ${scenario.budget}
    Necesidades: ${scenario.needs}
    Objeciones principales: ${scenario.objections}
    
    Responde como este cliente de manera realista. Sé ${scenario.difficulty === 'hard' ? 'muy exigente y escéptico' : scenario.difficulty === 'medium' ? 'cauteloso pero interesado' : 'receptivo y colaborativo'}.
    Mantén respuestas entre 1-3 oraciones. Usa un tono profesional.`;
    
    return {
      systemPrompt,
      conversationHistory: [],
      currentScore: 0,
      maxScore: 30
    };
  },

  // Enviar mensaje del vendedor y obtener respuesta del cliente IA
  async sendMessage(simulation, vendorMessage) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: simulation.systemPrompt },
            ...simulation.conversationHistory,
            { role: 'user', content: vendorMessage }
          ],
          max_tokens: 150,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const clientResponse = data.choices[0].message.content;

      // Actualizar historial de conversación
      simulation.conversationHistory.push(
        { role: 'user', content: vendorMessage },
        { role: 'assistant', content: clientResponse }
      );

      // Calcular puntuación basada en la calidad del mensaje
      const score = this.calculateMessageScore(vendorMessage);
      simulation.currentScore += score;

      return {
        clientResponse,
        score,
        totalScore: simulation.currentScore,
        feedback: this.generateFeedback(vendorMessage, score)
      };
    } catch (error) {
      console.error('Error en simulación AI:', error);
      return {
        clientResponse: 'Lo siento, tengo que colgar. Llamaré más tarde.',
        score: 0,
        totalScore: simulation.currentScore,
        feedback: 'Error en la conexión. Intenta nuevamente.'
      };
    }
  },

  // Calcular puntuación del mensaje del vendedor
  calculateMessageScore(message) {
    let score = 5; // Puntuación base
    
    // Factores positivos
    if (message.includes('?')) score += 2; // Hace preguntas
    if (message.toLowerCase().includes('necesidad')) score += 2;
    if (message.toLowerCase().includes('beneficio')) score += 2;
    if (message.toLowerCase().includes('entiendo')) score += 1;
    if (message.length > 50 && message.length < 200) score += 1; // Longitud apropiada
    
    // Factores negativos
    if (message.toLowerCase().includes('precio') && !message.includes('valor')) score -= 1;
    if (message.length < 20) score -= 2; // Muy corto
    if (message.length > 300) score -= 1; // Muy largo
    
    return Math.max(0, Math.min(10, score));
  },

  // Generar feedback inmediato
  generateFeedback(message, score) {
    if (score >= 8) {
      return '¡Excelente! Mensaje muy efectivo.';
    } else if (score >= 6) {
      return 'Buen mensaje, pero puede mejorar.';
    } else if (score >= 4) {
      return 'Mensaje promedio, considera ser más específico.';
    } else {
      return 'Necesita mejora. Sé más consultivo.';
    }
  },

  // Escenarios predefinidos para IA
  getAIScenarios() {
    return [
      {
        id: 'ai-startup',
        title: 'Startup Tecnológica',
        company: 'TechFlow Solutions',
        role: 'CEO',
        personality: 'ambicioso pero cauteloso',
        description: 'Líder de startup que busca crecimiento pero cuida cada inversión',
        budget: 'Limitado pero flexible para ROI claro',
        needs: 'Escalabilidad, eficiencia, resultados medibles',
        objections: 'Costo, tiempo de implementación, complejidad',
        difficulty: 'medium'
      },
      {
        id: 'ai-corporate',
        title: 'Corporativo Tradicional',
        company: 'Global Industries Corp',
        role: 'Director de Compras',
        personality: 'formal y meticuloso',
        description: 'Ejecutivo experimentado que valora estabilidad y referencias',
        budget: 'Alto pero requiere justificación detallada',
        needs: 'Confiabilidad, soporte 24/7, compliance',
        objections: 'Cambio de proveedor, riesgos, procesos internos',
        difficulty: 'hard'
      },
      {
        id: 'ai-small-business',
        title: 'Pequeña Empresa',
        company: 'Comercial Familiar S.A.',
        role: 'Propietario',
        personality: 'práctico y directo',
        description: 'Dueño de negocio familiar que busca soluciones simples',
        budget: 'Muy limitado, necesita ver valor inmediato',
        needs: 'Simplicidad, bajo costo, resultados rápidos',
        objections: 'Precio, complejidad, tiempo para aprender',
        difficulty: 'easy'
      }
    ];
  }
};