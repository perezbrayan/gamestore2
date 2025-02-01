import React, { useState } from 'react';
import { Bot as BotIcon, Gift, UserPlus, Sparkles, ArrowRight, Shield, Zap, Star, Gamepad, UserCheck } from 'lucide-react';

const Bot = () => {
  const [username, setUsername] = useState('');

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section con diseño asimétrico */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600/5 to-[#FAFAFA] z-0" />
        <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full mb-6">
              <Star className="w-5 h-5" />
              <span className="font-medium">¡Nuevo! Bot GameStore V2.0</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Obtén <span className="text-primary-600">recompensas exclusivas</span> con nuestro Bot
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Conecta tu cuenta de Fortnite y comienza a recibir recompensas únicas, items exclusivos y mucho más.
            </p>
          </div>

          {/* Formulario de conexión con diseño destacado */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                  <BotIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Conectar con Bot</h2>
                  <p className="text-gray-600">Ingresa tus datos para comenzar</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de usuario de Fortnite
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-600 transition-all"
                    placeholder="Ej: Ninja"
                  />
                </div>
                <button className="w-full px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group">
                  <span>Conectar y Recibir Recompensas</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de características con diseño de tarjetas modernas */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Gamepad className="w-8 h-8" />,
              title: "¡Comencemos!",
              description: "Ingresa tu nombre de usuario de Fortnite."
            },
            {
              icon: <UserCheck className="w-8 h-8" />,
              title: " ¡Amistad en el juego!",
              description: "Acepta la solicitud de amistad dentro del juego. "
            },
            {
              icon: <Gift className="w-8 h-8" />,
              title: "¡Regalos para ti!",
              description: "¡Felicidades! Ahora puedes disfrutar de increíbles regalos directamente desde nuestra tienda."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bot; 