function CallRecordingDashboard() {
  try {
    const [recordings, setRecordings] = React.useState([]);
    const [isRecording, setIsRecording] = React.useState(false);
    const [currentRecording, setCurrentRecording] = React.useState(null);

    React.useEffect(() => {
      // Simular grabaciones existentes
      setRecordings([
        {
          id: 1,
          date: '2024-01-15',
          duration: 420,
          client: 'TechStart Solutions',
          result: 'Exitosa',
          transcription: '[00:00] Vendedor: Buenos días...'
        },
        {
          id: 2,
          date: '2024-01-14',
          duration: 315,
          client: 'Global Corp',
          result: 'Seguimiento',
          transcription: '[00:00] Vendedor: Gracias por atender...'
        }
      ]);
    }, []);

    const startRecording = () => {
      const recording = CallRecording.startRecording();
      setCurrentRecording(recording);
      setIsRecording(true);
    };

    const stopRecording = async () => {
      if (currentRecording) {
        const completed = CallRecording.stopRecording(currentRecording.id);
        const transcription = await CallRecording.transcribeCall(completed);
        
        const newRecording = {
          ...completed,
          client: 'Cliente Demo',
          result: 'Completada',
          transcription: transcription
        };
        
        setRecordings(prev => [newRecording, ...prev]);
        setIsRecording(false);
        setCurrentRecording(null);
      }
    };

    return (
      <div data-name="call-recording" data-file="components/CallRecordingDashboard.js">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Grabación de Llamadas</h2>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <div className={`icon-${isRecording ? 'stop' : 'mic'} text-lg mr-2`}></div>
            {isRecording ? 'Detener Grabación' : 'Iniciar Grabación'}
          </button>
        </div>

        {isRecording && (
          <div className="card mb-6 bg-red-50 border-red-200">
            <div className="flex items-center justify-center">
              <div className="animate-pulse w-4 h-4 bg-red-600 rounded-full mr-3"></div>
              <span className="text-red-800 font-medium">Grabando llamada en curso...</span>
            </div>
          </div>
        )}

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Grabaciones</h3>
          <div className="space-y-4">
            {recordings.map((recording) => (
              <div key={recording.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{recording.client}</h4>
                    <p className="text-sm text-gray-600">
                      {recording.date} • {Math.floor(recording.duration / 60)}:{(recording.duration % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    recording.result === 'Exitosa' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {recording.result}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 font-mono">
                    {recording.transcription.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CallRecordingDashboard component error:', error);
    return null;
  }
}