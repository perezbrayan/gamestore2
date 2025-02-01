import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    console.log('Datos del formulario:', formData);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crear una cuenta
            </h1>
            <p className="text-gray-600">
              Únete a nuestra comunidad de jugadores
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de Nombre de Usuario */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de usuario
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-600 transition-all"
                    placeholder="Ej: JohnDoe123"
                    required
                  />
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                <p className="mt-2 text-sm text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg flex items-start">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  ¡Cuidado! Tienes que usar el mismo nombre de usuario de Epic Games/Fortnite para que se pueda enviar los regalos
                </p>
              </div>

              {/* Campo de Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-600 transition-all"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Campo de Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 pr-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-600 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Campo de Confirmar Contraseña */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 pr-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-600 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Botón de Registro */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Crear cuenta</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Enlaces adicionales */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 