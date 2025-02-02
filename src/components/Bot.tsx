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

const Bots = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [bots, setBots] = useState<Bot[]>([
    {
      id: 'bot1',
      name: 'Bot Principal',
      status: {
        isReady: false,
        isAuthenticated: false,
        displayName: null,
        lastError: null,
        hasFriendToken: false,
        deviceId: null,
        accessToken: null,
        accountId: null,
        expiresAt: null
      }
    },
    {
      id: 'bot2',
      name: 'Bot Secundario',
      status: {
        isReady: false,
        isAuthenticated: false,
        displayName: null,
        lastError: null,
        hasFriendToken: false,
        deviceId: null,
        accessToken: null,
        accountId: null,
        expiresAt: null
      }
    }
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
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Panel de Bots</h1>
      
      <div className="mb-6">
        <div className={`p-4 rounded-lg ${
          bots.every(bot => bot.status.isReady && bot.status.isAuthenticated)
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          <p>
            {bots.every(bot => bot.status.isReady && bot.status.isAuthenticated)
              ? '¡Todos los bots están conectados!'
              : 'Algunos bots no están disponibles en este momento'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Nombre de usuario de Fortnite
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={loading}
            placeholder="Ingresa tu usuario"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded ${
            loading 
              ? 'bg-gray-400'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {bots.map(bot => (
          <div key={bot.id} className="p-4 border rounded">
            <h3 className="font-bold">{bot.name}</h3>
            <p className={bot.status.isReady ? 'text-green-600' : 'text-red-600'}>
              Estado: {bot.status.isReady ? 'Conectado' : 'Desconectado'}
            </p>
            {bot.status.lastError && (
              <p className="text-red-500 text-sm mt-1">
                Error: {bot.status.lastError}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bots;