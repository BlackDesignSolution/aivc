function Login({ onLogin }) {
  try {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!email || !password) return;
      
      setIsLoading(true);
      
      // Simular autenticación
      setTimeout(() => {
        onLogin({
          id: Date.now(),
          name: email.split('@')[0],
          email: email,
          joinDate: new Date().toISOString()
        });
        setIsLoading(false);
      }, 1500);
    };

    return (
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: 'url(../img/unir.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        data-name="login" 
        data-file="components/Login.js"
      >
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1433]/80 via-[#171F55]/70 to-[#274272]/60"></div>
        
        {/* Patrón decorativo */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              {/* Imagen del lado izquierdo - Solo visible en md y lg */}
              <div className="hidden md:flex flex-col items-center justify-center text-center">
              </div>

              {/* Formulario de login con efecto glass */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md">
                  <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl">
                    
                    {/* Logo y título */}
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-[#6C90C3] to-[#274272] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl backdrop-blur-sm">
                        <div className="icon-phone text-3xl text-white"></div>
                      </div>
                      <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Simulador de Ventas</h1>
                      <p className="text-[#6C90C3] text-lg font-medium">Entrena tus habilidades de ventas</p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-[#6C90C3] focus:border-[#6C90C3] transition-all duration-300"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-[#6C90C3] focus:border-[#6C90C3] transition-all duration-300"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#6C90C3] to-[#274272] hover:from-[#274272] hover:to-[#0D1433] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Iniciando sesión...
                          </div>
                        ) : (
                          'Iniciar Sesión'
                        )}
                      </button>
                    </form>

                    {/* Nota demo */}
                    <div className="mt-6 text-center">
                      <p className="text-sm text-white/70 backdrop-blur-sm bg-white/10 rounded-lg p-3 border border-white/20">
                        Demo: usa cualquier email y contraseña
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Login component error:', error);
    return null;
  }
}
