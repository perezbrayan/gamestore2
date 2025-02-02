import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiConfig } from '../config/api';

interface Bot {
  id: string;
  name: string;
  status: {
    isReady: boolean;
    isAuthenticated: boolean;
    displayName: string | null;
    lastError: string | null;
    hasFriendToken: boolean;
    deviceId: string | null;
    accessToken: string | null;
    accountId: string | null;
    expiresAt: string | null;
  };
}

const Bot: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [bots, setBots] = useState<Bot[]>([
    { id: 'bot1', name: 'Bot 1', status: { isReady: false, isAuthenticated: false, displayName: null, lastError: null, hasFriendToken: false, deviceId: null, accessToken: null, accountId: null, expiresAt: null } },
    { id: 'bot2', name: 'Bot 2', status: { isReady: false, isAuthenticated: false, displayName: null, lastError: null, hasFriendToken: false, deviceId: null, accessToken: null, accountId: null, expiresAt: null } }
  ]);

  useEffect(() => {
    const checkBotsStatus = async () => {
      const updatedBots = await Promise.all(bots.map(async (bot) => {
        try {
          const botId = bot.id; 
          const url = `${apiConfig.botURL}/bot2/api/bot-status?botId=${botId}`;
          console.log(`[${new Date().toISOString()}] Iniciando petición GET a:`, url);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            }
          });
          
          console.log(`[${new Date().toISOString()}] Respuesta para ${bot.name}:`, {
            status: response.status,
            statusText: response.statusText,
            headers: {
              'content-type': response.headers.get('content-type'),
              'access-control-allow-origin': response.headers.get('access-control-allow-origin')
            }
          });

          const responseText = await response.text();
          console.log(`[${new Date().toISOString()}] Contenido de la respuesta para ${bot.name}:`, responseText);
          
          let data;
          try {
            data = JSON.parse(responseText);
          } catch (error) {
            console.error(`[${new Date().toISOString()}] Error parseando JSON para ${bot.name}:`, responseText);
            throw new Error('Error parseando la respuesta del servidor');
          }

          console.log(`[${new Date().toISOString()}] Datos parseados para ${bot.name}:`, data);
          
          if (data.isAuthenticated && !bot.status?.isAuthenticated) {
            toast.success(`${bot.name} se ha autenticado exitosamente!`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
          
          return { 
            ...bot, 
            status: {
              isReady: true,
              isAuthenticated: Boolean(data.isAuthenticated),
              displayName: data.displayName || null,
              lastError: null,
              hasFriendToken: Boolean(data.deviceId),
              deviceId: data.deviceId || null,
              accessToken: null, 
              accountId: data.accountId || null,
              expiresAt: data.expiresAt || null
            }
          };
        } catch (error) {
          console.error(`[${new Date().toISOString()}] Error verificando estado para ${bot.name}:`, error);
          return {
            ...bot,
            status: {
              ...bot.status,
              isReady: false,
              lastError: error instanceof Error ? error.message : 'Error de conexión'
            }
          };
        }
      }));
      setBots(updatedBots);
    };

    checkBotsStatus();

    const interval = setInterval(() => {
      checkBotsStatus();
    }, 30000); 

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Por favor ingresa un nombre de usuario', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiConfig.botURL}/bot2/api/friend-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          username,
          sendFromAllBots: true 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar solicitud');
      }

      if (data.results) {
        data.results.forEach((result: any) => {
          if (result.status === 'success') {
            toast.success(`${result.message} (${result.botId})`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        });
      }

      if (data.errors) {
        data.errors.forEach((error: any) => {
          toast.error(`Error con ${error.botId}: ${error.error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
      }

      setUsername('');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Error al enviar solicitudes de amistad', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#C7CAC6] text-gray-800 pt-24">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
            Panel de Control de Bots
          </h1>
          
          {/* Pasos a Seguir */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 relative">
              <div className="absolute -top-4 left-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Ingresa tu nombre de usuario</h3>
              <p className="text-gray-600">
                Escribe tu nombre de usuario de Fortnite
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 relative">
              <div className="absolute -top-4 left-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">Acepta la solicitud</h3>
              <p className="text-gray-600">
                Acepta la solicitud de amistad en el juego
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 relative">
              <div className="absolute -top-4 left-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">¡Listo para recibir regalos!</h3>
              <p className="text-gray-600">
                Ya puedes recibir regalos de nuestra tienda
              </p>
            </div>
          </div>

          {/* Estado General de los Bots */}
          <div className="mb-8">
            <div className={`p-6 rounded-xl shadow-lg ${
              bots.every(bot => bot.status.isReady && bot.status.isAuthenticated)
                ? 'bg-white border-2 border-green-500/30'
                : 'bg-white border-2 border-yellow-500/30'
            }`}>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Estado del Sistema</h2>
              <p className="text-gray-600">
                {bots.every(bot => bot.status.isReady && bot.status.isAuthenticated)
                  ? '✅ Todos los bots están activos y autenticados'
                  : '⚠️ Algunos bots necesitan atención'}
              </p>
            </div>
          </div>

          {/* Formulario de Envío */}
          <div className="mb-12 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de Usuario de Epic Games
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Ingresa el nombre de usuario"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 transform hover:-translate-y-0.5 shadow-md'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  'Enviar Solicitud de Amistad'
                )}
              </button>
            </form>
          </div>

          {/* Estado Individual de los Bots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bots.map(bot => (
              <div
                key={bot.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{bot.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    bot.status.isAuthenticated
                      ? 'bg-green-100 text-green-700 border border-green-500'
                      : 'bg-red-100 text-red-700 border border-red-500'
                  }`}>
                    {bot.status.isAuthenticated ? 'Autenticado' : 'No Autenticado'}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">Estado: </span>
                    {bot.status.isReady ? 'Listo' : 'No Listo'}
                  </p>
                  {bot.status.displayName && (
                    <p>
                      <span className="font-medium text-gray-700">Nombre: </span>
                      {bot.status.displayName}
                    </p>
                  )}
                  {bot.status.accountId && (
                    <p>
                      <span className="font-medium text-gray-700">ID: </span>
                      <span className="font-mono">{bot.status.accountId}</span>
                    </p>
                  )}
                  {bot.status.expiresAt && (
                    <p>
                      <span className="font-medium text-gray-700">Expira: </span>
                      {new Date(bot.status.expiresAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bot;