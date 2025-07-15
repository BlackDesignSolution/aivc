// Análisis de Sentimientos para Conversaciones de Ventas

const SentimentAnalysis = {
  // Analizar el sentimiento de un mensaje usando IA
  async analyzeSentiment(message) {
    try {
      const response = await invokeAIAgent(
        `Analiza el sentimiento del siguiente mensaje de ventas y devuelve un JSON con:
        - sentiment: "positivo", "neutral", "negativo"
        - confidence: número entre 0-100
        - emotions: array de emociones detectadas ["confianza", "entusiasmo", "ansiedad", etc.]
        - tone: "profesional", "casual", "agresivo", "empático"
        - suggestions: array de sugerencias para mejorar
        
        Responde solo con JSON válido, sin texto adicional.`,
        `Mensaje: "${message}"`
      );
      
      return JSON.parse(response);
    } catch (error) {
      console.error('Error en análisis de sentimiento:', error);
      return {
        sentiment: 'neutral',
        confidence: 50,
        emotions: ['neutral'],
        tone: 'profesional',
        suggestions: ['Mensaje procesado con éxito']
      };
    }
  },

  // Analizar conversación completa
  async analyzeConversation(messages) {
    const analysis = {
      overallSentiment: 'neutral',
      sentimentProgression: [],
      emotionalHighlights: [],
      coachingRecommendations: []
    };

    for (const message of messages) {
      if (message.speaker === 'vendor') {
        const sentiment = await this.analyzeSentiment(message.message);
        analysis.sentimentProgression.push({
          timestamp: message.timestamp,
          sentiment: sentiment.sentiment,
          confidence: sentiment.confidence,
          tone: sentiment.tone
        });

        if (sentiment.confidence > 80) {
          analysis.emotionalHighlights.push({
            message: message.message,
            sentiment: sentiment.sentiment,
            emotions: sentiment.emotions
          });
        }

        analysis.coachingRecommendations.push(...sentiment.suggestions);
      }
    }

    // Determinar sentimiento general
    const positiveCount = analysis.sentimentProgression.filter(s => s.sentiment === 'positivo').length;
    const negativeCount = analysis.sentimentProgression.filter(s => s.sentiment === 'negativo').length;
    
    if (positiveCount > negativeCount) {
      analysis.overallSentiment = 'positivo';
    } else if (negativeCount > positiveCount) {
      analysis.overallSentiment = 'negativo';
    }

    return analysis;
  },

  // Generar score emocional
  calculateEmotionalScore(sentimentData) {
    let score = 50; // Base score
    
    const positiveCount = sentimentData.sentimentProgression.filter(s => s.sentiment === 'positivo').length;
    const negativeCount = sentimentData.sentimentProgression.filter(s => s.sentiment === 'negativo').length;
    const totalMessages = sentimentData.sentimentProgression.length;
    
    if (totalMessages > 0) {
      const positiveRatio = positiveCount / totalMessages;
      const negativeRatio = negativeCount / totalMessages;
      
      score = 50 + (positiveRatio * 40) - (negativeRatio * 30);
    }
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }
};