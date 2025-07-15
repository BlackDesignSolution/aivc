// Sistema de Grabación y Transcripción de Llamadas

const CallRecording = {
  // Iniciar grabación (simulado)
  startRecording() {
    return {
      id: Date.now(),
      startTime: new Date().toISOString(),
      status: 'recording',
      duration: 0
    };
  },

  // Detener grabación
  stopRecording(recordingId) {
    return {
      id: recordingId,
      endTime: new Date().toISOString(),
      status: 'completed',
      duration: Math.floor(Math.random() * 300) + 180 // 3-8 minutos
    };
  },

  // Transcribir llamada usando IA
  async transcribeCall(callData) {
    try {
      const response = await invokeAIAgent(
        `Genera una transcripción realista de una llamada de ventas basada en estos datos:
        - Duración: ${callData.duration} segundos
        - Tipo: ${callData.type || 'llamada de ventas'}
        - Resultado: ${callData.result || 'en progreso'}
        
        Formato: [Tiempo] Vendedor/Cliente: mensaje
        Incluye pausas naturales, interrupciones y cambios de tono.`,
        `Crear transcripción para llamada de ${Math.floor(callData.duration / 60)} minutos`
      );
      
      return response;
    } catch (error) {
      console.error('Error en transcripción:', error);
      return `[00:00] Vendedor: Buenos días, gracias por su tiempo.
[00:05] Cliente: Hola, cuénteme sobre su propuesta.
[00:10] Vendedor: Con mucho gusto. Nuestro producto puede ayudarle a...
[00:30] Cliente: Interesante, ¿cuáles son los costos?
[01:00] Vendedor: Excelente pregunta. Permítame explicarle el valor...`;
    }
  },

  // Comparar con simulación
  compareWithSimulation(realCall, simulationData) {
    const comparison = {
      duration: {
        real: realCall.duration,
        simulation: simulationData.duration || 0,
        difference: Math.abs(realCall.duration - (simulationData.duration || 0))
      },
      effectiveness: {
        real: realCall.score || 0,
        simulation: simulationData.score || 0,
        improvement: (simulationData.score || 0) - (realCall.score || 0)
      },
      keyMetrics: {
        questionsAsked: Math.floor(Math.random() * 5) + 3,
        objectionsHandled: Math.floor(Math.random() * 3) + 1,
        closingAttempts: Math.floor(Math.random() * 2) + 1
      }
    };

    return comparison;
  },

  // Generar insights de mejora
  generateInsights(comparisonData) {
    const insights = [];

    if (comparisonData.effectiveness.improvement > 0) {
      insights.push(`La simulación mejoró tu efectividad en ${comparisonData.effectiveness.improvement} puntos`);
    }

    if (comparisonData.duration.difference > 120) {
      insights.push('Considera optimizar la duración de tus llamadas');
    }

    if (comparisonData.keyMetrics.questionsAsked < 3) {
      insights.push('Aumenta el número de preguntas para entender mejor las necesidades');
    }

    return insights;
  }
};