class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentScreen, setCurrentScreen] = React.useState('login');
    const [user, setUser] = React.useState(null);
    const [userProgress, setUserProgress] = React.useState({
      completedCalls: 0,
      totalScore: 0,
      level: 1,
      badges: []
    });

    const navigateToScreen = (screen) => {
      setCurrentScreen(screen);
    };

    const handleLogin = (userData) => {
      setUser(userData);
      setCurrentScreen('dashboard');
    };

    const handleLogout = () => {
      setUser(null);
      setCurrentScreen('login');
    };

    const updateProgress = (newScore, callData) => {
      setUserProgress(prev => ({
        ...prev,
        completedCalls: prev.completedCalls + 1,
        totalScore: prev.totalScore + newScore,
        level: Math.floor((prev.completedCalls + 1) / 5) + 1
      }));
    };

    const renderCurrentScreen = () => {
      if (currentScreen === 'login') {
        return <Login onLogin={handleLogin} />;
      }
      
      // Saltar introducción y ir directo al dashboard
      if (currentScreen === 'introduction') {
        navigateToScreen('dashboard');
        return null;
      }

      // Para todas las demás pantallas, usar el Layout
      const getScreenComponent = () => {
        switch(currentScreen) {
          case 'dashboard':
            return <MainDashboard 
              user={user} 
              progress={userProgress}
              onNavigate={navigateToScreen}
            />;
          case 'simulation':
            return <SimulationTraining onNavigate={navigateToScreen} />;
          case 'call-simulation':
            return <CallSimulation 
              onComplete={(score, data) => {
                updateProgress(score, data);
                navigateToScreen('feedback');
              }}
              onBack={() => navigateToScreen('simulation')}
            />;
          case 'ai-call-simulation':
            return <AICallSimulation 
              onComplete={(score, data) => {
                updateProgress(score, data);
                navigateToScreen('feedback');
              }}
              onBack={() => navigateToScreen('simulation')}
            />;
          case 'scores':
            return <ScoresDashboard 
              progress={userProgress}
              onNavigate={navigateToScreen}
            />;
          case 'detailed-feedback':
            return <DetailedFeedback 
              progress={userProgress}
              onNavigate={navigateToScreen}
            />;
          case 'feedback':
            return <Feedback 
              onContinue={() => navigateToScreen('dashboard')}
              progress={userProgress}
            />;
          case 'team':
            return <Team />;
          case 'courses':
            return <Courses />;
          case 'gamification':
            return <GamificationDashboard 
              progress={userProgress}
              onNavigate={navigateToScreen}
            />;
          case 'industry':
            return <IndustryModules onNavigate={navigateToScreen} />;
          case 'crm':
            return <CRMIntegration />;
          case 'manual':
            return <UserManual onNavigate={navigateToScreen} />;
          case 'settings':
            return <Settings user={user} />;
          default:
            return <MainDashboard 
              user={user} 
              progress={userProgress}
              onNavigate={navigateToScreen}
            />;
        }
      };

      return (
        <Layout 
          user={user}
          currentScreen={currentScreen}
          onNavigate={navigateToScreen}
          onLogout={handleLogout}
          progress={userProgress}
        >
          {getScreenComponent()}
        </Layout>
      );
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 bg-pattern" data-name="app" data-file="app.js">
        {renderCurrentScreen()}
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);