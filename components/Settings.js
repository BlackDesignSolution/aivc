function Settings({ user }) {
  try {
    const [profile, setProfile] = React.useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      department: 'Ventas',
      notifications: true,
      emailAlerts: true,
      theme: 'light'
    });

    const [colorScheme, setColorScheme] = React.useState('blue');
    const [showPasswordModal, setShowPasswordModal] = React.useState(false);
    const [passwordData, setPasswordData] = React.useState({
      current: '',
      new: '',
      confirm: ''
    });

    const colorSchemes = [
      { id: 'blue', name: 'Azul Corporativo', primary: '#0D1433', secondary: '#6C90C3' },
      { id: 'green', name: 'Verde Natura', primary: '#065F46', secondary: '#10B981' },
      { id: 'purple', name: 'Púrpura Elegante', primary: '#581C87', secondary: '#8B5CF6' },
      { id: 'orange', name: 'Naranja Energético', primary: '#9A3412', secondary: '#F97316' }
    ];

    const handleProfileUpdate = (e) => {
      e.preventDefault();
      alert('Perfil actualizado correctamente');
    };

    const handlePasswordChange = (e) => {
      e.preventDefault();
      if (passwordData.new !== passwordData.confirm) {
        alert('Las contraseñas no coinciden');
        return;
      }
      alert('Contraseña cambiada exitosamente');
      setShowPasswordModal(false);
      setPasswordData({ current: '', new: '', confirm: '' });
    };

    const applyColorScheme = (scheme) => {
      setColorScheme(scheme.id);
      document.documentElement.style.setProperty('--primary', scheme.primary);
      document.documentElement.style.setProperty('--secondary', scheme.secondary);
      alert(`Esquema de color "${scheme.name}" aplicado`);
    };

    return (
      <div data-name="settings" data-file="components/Settings.js">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p className="text-gray-600">Administra tu cuenta y preferencias</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Profile Settings */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Perfil</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="input-field"
                />
              </div>
              <button type="submit" className="btn-primary w-full">Actualizar Perfil</button>
            </form>
          </div>

          {/* Notification Settings */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferencias</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Notificaciones Push</h3>
                  <p className="text-sm text-gray-600">Recibe notificaciones en tiempo real</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={profile.notifications} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Color Scheme */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personalización Visual</h2>
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">Esquema de Colores</h3>
            <div className="grid grid-cols-2 gap-3">
              {colorSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  onClick={() => applyColorScheme(scheme)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                    colorScheme === scheme.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: scheme.primary }}></div>
                    <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: scheme.secondary }}></div>
                    {colorScheme === scheme.id && (
                      <div className="icon-check text-blue-600 text-sm"></div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{scheme.name}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    {scheme.id === 'blue' && 'Profesional y confiable'}
                    {scheme.id === 'green' && 'Natural y calmante'}
                    {scheme.id === 'purple' && 'Creativo y elegante'}
                    {scheme.id === 'orange' && 'Dinámico y energético'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-md font-medium text-gray-700 mb-3">Configuración de Interfaz</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-900">Modo Oscuro</span>
                  <p className="text-xs text-gray-600">Cambia a tema oscuro para reducir fatiga visual</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-900">Sidebar Compacto</span>
                  <p className="text-xs text-gray-600">Mantener sidebar colapsado por defecto</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Seguridad y Privacidad</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Gestión de Contraseña</h3>
              <p className="text-xs text-blue-700 mb-3">Mantén tu cuenta segura con una contraseña fuerte</p>
              <button 
                onClick={() => setShowPasswordModal(true)} 
                className="btn-primary text-sm"
              >
                <div className="icon-key text-sm mr-2"></div>
                Cambiar Contraseña
              </button>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-sm font-semibold text-green-900 mb-2">Respaldo de Datos</h3>
              <p className="text-xs text-green-700 mb-3">Descarga una copia de tu información y progreso</p>
              <button className="btn-secondary text-sm">
                <div className="icon-download text-sm mr-2"></div>
                Exportar Datos
              </button>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="text-sm font-semibold text-red-900 mb-2">Zona Peligrosa</h3>
              <p className="text-xs text-red-700 mb-3">Esta acción no se puede deshacer</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                <div className="icon-trash text-sm mr-2"></div>
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <div className="icon-key text-blue-600"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Cambiar Contraseña</h3>
              </div>
              
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-700">
                  <strong>Consejos:</strong> Usa al menos 8 caracteres, incluye mayúsculas, números y símbolos
                </p>
              </div>
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña actual"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                    className="input-field"
                    minLength="8"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    placeholder="Repite la nueva contraseña"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="flex space-x-3 pt-2">
                  <button type="submit" className="btn-primary flex-1">
                    <div className="icon-check text-sm mr-2"></div>
                    Actualizar
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="btn-secondary flex-1"
                  >
                    <div className="icon-x text-sm mr-2"></div>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Settings component error:', error);
    return null;
  }
}