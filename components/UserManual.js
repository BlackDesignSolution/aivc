function UserManual({ onNavigate }) {
  try {
    const [activeSection, setActiveSection] = React.useState('inicio');
    const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);

    const sections = [
      { id: 'inicio', title: 'Primeros Pasos', icon: 'play' },
      { id: 'simulaciones', title: 'Simulaciones', icon: 'phone' },
      { id: 'estadisticas', title: 'Ver Progreso', icon: 'chart-bar' },
      { id: 'configuracion', title: 'Configuración', icon: 'settings' },
      { id: 'consejos', title: 'Consejos', icon: 'lightbulb' }
    ];

    const content = {
      inicio: {
        title: 'Bienvenido al Simulador de Ventas',
        steps: [
          {
            step: '1',
            title: 'Inicia Sesión',
            description: 'Usa cualquier email y contraseña para acceder al sistema',
            tip: 'Es solo una demostración, no necesitas una cuenta real'
          },
          {
            step: '2', 
            title: 'Explora el Dashboard',
            description: 'Revisa tu progreso actual y las opciones disponibles',
            tip: 'El dashboard muestra tu puntuación y llamadas completadas'
          },
          {
            step: '3',
            title: 'Comienza tu Primera Simulación',
            description: 'Ve a "Simulaciones" para practicar tus habilidades de venta',
            tip: 'Recomendamos empezar con el nivel "Fácil"'
          }
        ]
      },
      simulaciones: {
        title: 'Cómo Usar las Simulaciones',
        steps: [
          {
            step: '1',
            title: 'Elige el Tipo de Simulación',
            description: 'Simulación con IA: Conversación dinámica\nSimulación Guiada: Opciones predefinidas',
            tip: 'La IA es más realista, la guiada es mejor para aprender'
          },
          {
            step: '2',
            title: 'Selecciona la Dificultad',
            description: 'Fácil: Clientes receptivos\nIntermedio: Algunas objeciones\nDifícil: Clientes exigentes',
            tip: 'Comienza con "Fácil" y ve subiendo gradualmente'
          },
          {
            step: '3',
            title: 'Mantén la Conversación',
            description: 'Lee la situación del cliente y responde apropiadamente',
            tip: 'Escucha las necesidades antes de presentar soluciones'
          },
          {
            step: '4',
            title: 'Recibe tu Puntuación',
            description: 'Al final obtienes puntos y retroalimentación detallada',
            tip: 'Lee los comentarios para mejorar en la siguiente llamada'
          }
        ]
      },
      estadisticas: {
        title: 'Entender tu Progreso',
        steps: [
          {
            step: '1',
            title: 'Dashboard Principal',
            description: 'Muestra tu progreso general y últimas simulaciones',
            tip: 'Revísalo diariamente para ver tu evolución'
          },
          {
            step: '2',
            title: 'Estadísticas Detalladas',
            description: 'Gráficos de tu rendimiento y comparación con el equipo',
            tip: 'Identifica patrones en tus mejores y peores llamadas'
          },
          {
            step: '3',
            title: 'Retroalimentación',
            description: 'Análisis detallado de tus fortalezas y áreas de mejora',
            tip: 'Enfócate en una habilidad específica cada semana'
          }
        ]
      },
      configuracion: {
        title: 'Personalizar tu Experiencia',
        steps: [
          {
            step: '1',
            title: 'Perfil Personal',
            description: 'Actualiza tu nombre, email y información básica',
            tip: 'Mantén tu perfil actualizado para reportes personalizados'
          },
          {
            step: '2',
            title: 'Esquema de Colores',
            description: 'Elige entre 4 temas visuales diferentes',
            tip: 'Cambia el tema según tu preferencia o estado de ánimo'
          },
          {
            step: '3',
            title: 'Seguridad',
            description: 'Cambia tu contraseña y gestiona la privacidad',
            tip: 'Usa contraseñas fuertes con números y símbolos'
          }
        ]
      },
      consejos: {
        title: 'Consejos para Mejorar',
        steps: [
          {
            step: '💡',
            title: 'Practica Regularmente',
            description: 'Haz al menos 2-3 simulaciones por día',
            tip: 'La constancia es clave para desarrollar habilidades'
          },
          {
            step: '🎯',
            title: 'Enfócate en Debilidades',
            description: 'Identifica tus puntos débiles y trabaja en ellos',
            tip: 'Es mejor ser excelente en pocas cosas que promedio en muchas'
          },
          {
            step: '📊',
            title: 'Analiza tus Datos',
            description: 'Revisa regularmente tus estadísticas y progreso',
            tip: 'Los números no mienten, úsalos para mejorar'
          },
          {
            step: '🤝',
            title: 'Aprende del Equipo',
            description: 'Observa a los mejores vendedores en el ranking',
            tip: 'Pregunta a los líderes sobre sus técnicas exitosas'
          }
        ]
      }
    };

    const generatePDF = async () => {
      setIsGeneratingPDF(true);
      
      try {
        // Simular generación de PDF
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Crear contenido del PDF
        const pdfContent = `
MANUAL DE USUARIO - SIMULADOR DE VENTAS

=== PRIMEROS PASOS ===
1. Inicia Sesión: Usa cualquier email y contraseña para acceder al sistema
2. Explora el Dashboard: Revisa tu progreso actual y las opciones disponibles  
3. Comienza tu Primera Simulación: Ve a "Simulaciones" para practicar

=== SIMULACIONES ===
1. Elige el Tipo: IA (conversación dinámica) o Guiada (opciones predefinidas)
2. Selecciona Dificultad: Fácil, Intermedio o Difícil
3. Mantén la Conversación: Lee la situación y responde apropiadamente
4. Recibe Puntuación: Obtén puntos y retroalimentación detallada

=== VER PROGRESO ===
1. Dashboard Principal: Muestra tu progreso general
2. Estadísticas Detalladas: Gráficos de rendimiento
3. Retroalimentación: Análisis de fortalezas y áreas de mejora

=== CONFIGURACIÓN ===
1. Perfil Personal: Actualiza información básica
2. Esquema de Colores: Elige entre 4 temas visuales
3. Seguridad: Cambia contraseña y gestiona privacidad

=== CONSEJOS ===
• Practica regularmente (2-3 simulaciones por día)
• Enfócate en debilidades identificadas
• Analiza tus datos de rendimiento
• Aprende de los mejores del equipo

Generado el: ${new Date().toLocaleDateString()}
        `;
        
        // Crear blob y descargar
        const blob = new Blob([pdfContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'manual-simulador-ventas.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        alert('Manual descargado exitosamente como archivo de texto');
        
      } catch (error) {
        console.error('Error generando PDF:', error);
        alert('Error al generar el manual');
      }
      
      setIsGeneratingPDF(false);
    };

    return (
      <div data-name="user-manual" data-file="components/UserManual.js">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manual de Usuario</h1>
              <p className="text-gray-600">Guía rápida para dominar el simulador de ventas</p>
            </div>
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="btn-secondary flex items-center"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Generando...
                </>
              ) : (
                <>
                  <div className="icon-download text-lg mr-2"></div>
                  Descargar Manual
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Navegación de secciones */}
          <div className="card lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Secciones</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`icon-${section.icon} text-lg mr-3`}></div>
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contenido de la sección */}
          <div className="lg:col-span-3">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {content[activeSection].title}
              </h2>
              
              <div className="space-y-6">
                {content[activeSection].steps.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 mb-3 whitespace-pre-line">{item.description}</p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="icon-lightbulb text-yellow-600 mr-2"></div>
                          <span className="text-sm text-yellow-800 font-medium">Consejo:</span>
                        </div>
                        <p className="text-sm text-yellow-700 mt-1">{item.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones de acción */}
              <div className="mt-8 flex space-x-4">
                {activeSection === 'inicio' && (
                  <button onClick={() => onNavigate('simulation')} className="btn-primary">
                    <div className="icon-play text-lg mr-2"></div>
                    Comenzar Primera Simulación
                  </button>
                )}
                {activeSection === 'simulaciones' && (
                  <button onClick={() => onNavigate('simulation')} className="btn-primary">
                    <div className="icon-phone text-lg mr-2"></div>
                    Ir a Simulaciones
                  </button>
                )}
                {activeSection === 'estadisticas' && (
                  <button onClick={() => onNavigate('scores')} className="btn-primary">
                    <div className="icon-chart-bar text-lg mr-2"></div>
                    Ver Mis Estadísticas
                  </button>
                )}
                {activeSection === 'configuracion' && (
                  <button onClick={() => onNavigate('settings')} className="btn-primary">
                    <div className="icon-settings text-lg mr-2"></div>
                    Abrir Configuración
                  </button>
                )}
                <button onClick={() => onNavigate('dashboard')} className="btn-secondary">
                  <div className="icon-home text-lg mr-2"></div>
                  Volver al Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UserManual component error:', error);
    return null;
  }
}