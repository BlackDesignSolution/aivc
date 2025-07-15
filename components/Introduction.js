function Introduction({ onContinue, user }) {
  try {
    const features = [
      {
        icon: 'phone',
        title: 'Llamadas Simuladas',
        description: 'Practica con diferentes escenarios de ventas realistas'
      },
      {
        icon: 'chart-bar',
        title: 'Seguimiento de Progreso',
        description: 'Monitorea tu mejora con métricas detalladas'
      },
      {
        icon: 'award',
        title: 'Sistema de Puntuación',
        description: 'Gana puntos y desbloquea nuevos niveles'
      },
      {
        icon: 'message-circle',
        title: 'Retroalimentación',
        description: 'Recibe consejos personalizados para mejorar'
      }
    ];

    return (
      <div className="min-h-screen flex items-center justify-center p-4" data-name="introduction" data-file="components/Introduction.js">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient mb-4">
              ¡Bienvenido, {user?.name}!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Prepárate para mejorar tus habilidades de ventas con nuestro simulador interactivo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className={`icon-${feature.icon} text-xl text-blue-600`}></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h2>
              <p className="text-blue-100 mb-6">
                Accede a tu dashboard personal y comienza tu primer entrenamiento
              </p>
              <button
                onClick={onContinue}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Introduction component error:', error);
    return null;
  }
}