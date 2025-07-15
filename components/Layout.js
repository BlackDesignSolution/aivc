function Layout({ children, user, currentScreen, onNavigate, onLogout, progress }) {
  try {
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'chart-line' },
      { id: 'simulation', label: 'Simulaciones', icon: 'phone' },
      { id: 'scores', label: 'Estadísticas', icon: 'chart-bar' },
      { id: 'feedback', label: 'Retroalimentación', icon: 'message-circle' },
      { id: 'gamification', label: 'KPI', icon: 'trophy' },
      { id: 'industry', label: 'Por Industria', icon: 'briefcase' },
      { id: 'crm', label: 'CRM', icon: 'database' },
      { id: 'team', label: 'Equipo', icon: 'users' },
      { id: 'courses', label: 'Cursos', icon: 'book' },
      { id: 'manual', label: 'Manual', icon: 'help-circle' },
      { id: 'settings', label: 'Configuración', icon: 'settings' }
    ];

    return (
      <div className="min-h-screen bg-gray-50" data-name="layout" data-file="components/Layout.js">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 ${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-white to-slate-50 shadow-2xl z-30 border-r border-gray-200 transition-all duration-300`}>
          {/* Logo */}
          <div className="flex items-center px-6 py-6 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-r from-[#0D1433] to-[#171F55] rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <div className="icon-phone text-xl text-white"></div>
            </div>
            {!isSidebarCollapsed && (
              <h1 className="text-xl font-bold text-gradient">Simulador</h1>
            )}
          </div>

          {/* Navigation */}
          <nav className="mt-8 px-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center px-4 py-4 text-left transition-all duration-300 rounded-xl mb-2 ${
                  currentScreen === item.id
                    ? 'nav-item-active shadow-lg'
                    : 'nav-item'
                }`}
              >
                <div className={`icon-${item.icon} text-lg ${isSidebarCollapsed ? '' : 'mr-4'}`}></div>
                {!isSidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
          {/* Topbar */}
          <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="p-2 rounded-lg hover:bg-gray-100 mr-4 transition-colors"
                >
                  <div className="icon-menu text-xl text-gray-600"></div>
                </button>
                <h2 className="text-2xl font-bold text-gradient capitalize">
                  {menuItems.find(item => item.id === currentScreen)?.label || 'Dashboard'}
                </h2>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#6C90C3]/10 hover:to-[#274272]/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-[#6C90C3] to-[#274272] rounded-xl flex items-center justify-center shadow-md">
                    <div className="icon-user text-white text-lg"></div>
                  </div>
                  <span className="text-sm font-semibold text-[#0D1433]">{user?.name}</span>
                  <div className={`icon-chevron-down text-sm text-[#274272] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`}></div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onNavigate('settings');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="icon-settings text-sm mr-3"></div>
                        Configuración
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <div className="icon-log-out text-sm mr-3"></div>
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {children}
          </div>
        </div>

        {/* Overlay for mobile */}
        {isUserMenuOpen && (
          <div 
            className="fixed inset-0 z-30"
            onClick={() => setIsUserMenuOpen(false)}
          ></div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Layout component error:', error);
    return null;
  }
}