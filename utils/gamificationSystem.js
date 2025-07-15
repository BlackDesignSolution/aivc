// Sistema de Gamificación

const GamificationSystem = {
  // Definir logros disponibles
  achievements: [
    {
      id: 'first_call',
      name: 'Primera Llamada',
      description: 'Completa tu primera simulación',
      icon: 'phone',
      points: 10,
      requirement: { type: 'calls_completed', value: 1 }
    },
    {
      id: 'perfect_score',
      name: 'Puntuación Perfecta',
      description: 'Obtén 30 puntos en una simulación',
      icon: 'star',
      points: 50,
      requirement: { type: 'single_score', value: 30 }
    },
    {
      id: 'streak_master',
      name: 'Racha Perfecta',
      description: 'Completa 5 simulaciones seguidas con 25+ puntos',
      icon: 'zap',
      points: 100,
      requirement: { type: 'streak', value: 5, min_score: 25 }
    },
    {
      id: 'industry_expert',
      name: 'Experto de Industria',
      description: 'Domina todos los módulos de una industria',
      icon: 'award',
      points: 200,
      requirement: { type: 'industry_complete', value: 1 }
    }
  ],

  // Calcular logros desbloqueados
  checkAchievements(userProgress, newData) {
    const unlockedAchievements = [];
    
    for (const achievement of this.achievements) {
      if (userProgress.unlockedAchievements?.includes(achievement.id)) continue;
      
      if (this.meetsRequirement(achievement.requirement, userProgress, newData)) {
        unlockedAchievements.push(achievement);
      }
    }
    
    return unlockedAchievements;
  },

  // Verificar si cumple requisito
  meetsRequirement(requirement, userProgress, newData) {
    switch (requirement.type) {
      case 'calls_completed':
        return userProgress.completedCalls >= requirement.value;
      case 'single_score':
        return newData.score >= requirement.value;
      case 'streak':
        return userProgress.currentStreak >= requirement.value;
      case 'industry_complete':
        return userProgress.completedIndustries >= requirement.value;
      default:
        return false;
    }
  },

  // Sistema de ranking
  calculateRanking(userProgress) {
    const totalPoints = userProgress.totalPoints || 0;
    
    if (totalPoints >= 1000) return { rank: 'Maestro de Ventas', level: 10, color: 'purple' };
    if (totalPoints >= 750) return { rank: 'Experto', level: 8, color: 'blue' };
    if (totalPoints >= 500) return { rank: 'Avanzado', level: 6, color: 'green' };
    if (totalPoints >= 250) return { rank: 'Intermedio', level: 4, color: 'orange' };
    if (totalPoints >= 100) return { rank: 'Principiante', level: 2, color: 'yellow' };
    return { rank: 'Novato', level: 1, color: 'gray' };
  },

  // Competencias semanales
  getWeeklyCompetitions() {
    return [
      {
        id: 'weekly_calls',
        name: 'Desafío Semanal',
        description: 'Completa 10 simulaciones esta semana',
        progress: 6,
        target: 10,
        reward: 150,
        endDate: '2024-01-21'
      },
      {
        id: 'perfect_scores',
        name: 'Puntuaciones Perfectas',
        description: 'Obtén 3 puntuaciones de 28+ puntos',
        progress: 1,
        target: 3,
        reward: 200,
        endDate: '2024-01-21'
      }
    ];
  },

  // Leaderboard del equipo
  getTeamLeaderboard() {
    return [
      { rank: 1, name: 'Carlos Mendoza', points: 1250, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50' },
      { rank: 2, name: 'Ana Rodríguez', points: 980, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50' },
      { rank: 3, name: 'Tú', points: 750, avatar: null, isUser: true },
      { rank: 4, name: 'Luis García', points: 620, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' }
    ];
  }
};