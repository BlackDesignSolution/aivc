function GamificationDashboard({ progress, onNavigate }) {
  try {
    const [achievements, setAchievements] = React.useState([]);
    const [competitions, setCompetitions] = React.useState([]);
    const [leaderboard, setLeaderboard] = React.useState([]);
    const [userRanking, setUserRanking] = React.useState({});

    React.useEffect(() => {
      // Cargar datos de gamificación
      setAchievements(GamificationSystem.achievements);
      setCompetitions(GamificationSystem.getWeeklyCompetitions());
      setLeaderboard(GamificationSystem.getTeamLeaderboard());
      setUserRanking(GamificationSystem.calculateRanking(progress));
    }, [progress]);

    return (
      <div data-name="gamification" data-file="components/GamificationDashboard.js">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard KPI</h1>
          <p className="text-gray-600">Métricas clave de rendimiento y objetivos</p>
        </div>

        {/* Ranking del Usuario */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-${userRanking.color}-100 rounded-xl flex items-center justify-center`}>
                <div className="icon-trophy text-2xl text-orange-600"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{userRanking.rank}</h3>
                <p className="text-gray-600">Nivel {userRanking.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{progress.totalPoints || 0}</p>
              <p className="text-sm text-gray-600">Puntos totales</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Logros */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Logros</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {achievements.map((achievement) => {
                const isUnlocked = progress.unlockedAchievements?.includes(achievement.id);
                return (
                  <div key={achievement.id} className={`p-3 rounded-lg border ${
                    isUnlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isUnlocked ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        <div className={`icon-${achievement.icon} text-white`}></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                      <span className="text-sm font-bold text-blue-600">+{achievement.points}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Competencias Semanales */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Competencias Activas</h3>
            <div className="space-y-4">
              {competitions.map((comp) => (
                <div key={comp.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-blue-900">{comp.name}</h4>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                      {comp.reward} pts
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">{comp.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span>{comp.progress}/{comp.target}</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(comp.progress / comp.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking del Equipo</h3>
          <div className="space-y-3">
            {leaderboard.map((member) => (
              <div key={member.rank} className={`flex items-center p-3 rounded-lg ${
                member.isUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3 flex-1">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    member.rank === 1 ? 'bg-yellow-500 text-white' :
                    member.rank === 2 ? 'bg-gray-400 text-white' :
                    member.rank === 3 ? 'bg-orange-500 text-white' : 'bg-gray-200'
                  }`}>
                    {member.rank}
                  </span>
                  {member.avatar && (
                    <img src={member.avatar} className="w-8 h-8 rounded-full object-cover" />
                  )}
                  <span className={`font-medium ${member.isUser ? 'text-blue-900' : 'text-gray-900'}`}>
                    {member.name}
                  </span>
                </div>
                <span className="font-bold text-gray-900">{member.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('GamificationDashboard component error:', error);
    return null;
  }
}