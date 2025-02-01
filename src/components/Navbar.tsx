import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, Gamepad2, Home, Gift, Sparkles, Tag, Trash2, MessageSquare, Users } from 'lucide-react';
import logo from '../assets/logo.svg';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavLink = ({ to, icon, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'text-primary-600 bg-primary-50/50 font-medium' 
          : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50/50'
      }`}
    >
      {icon}
      <span className="text-sm">{children}</span>
    </Link>
  );
};

const SearchBar = () => (
  <div className="relative flex-1 max-w-xl">
    <input
      type="text"
      placeholder="Buscar items..."
      className="w-full px-4 py-2.5 pl-11 rounded-xl border border-gray-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all duration-200"
    />
    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
  </div>
);

const CartDropdown = ({ isOpen, cartItems = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Carrito de Compras</h3>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="max-h-96 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 border-b border-gray-100 flex items-center gap-3">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-primary-600 font-semibold">{item.price} V-Bucks</p>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="font-medium text-gray-800">Total:</span>
              <span className="font-bold text-primary-600">1,200 V-Bucks</span>
            </div>
            <Link 
              to="/checkout"
              className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Proceder al Pago
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

const UserDropdown = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg py-2 z-50">
      {/* Usuario no autenticado */}
      <div className="px-4 py-3">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Bienvenido</h3>
          <p className="text-sm text-gray-600 mb-4">Inicia sesión para continuar</p>
          <Link 
            to="/login" 
            className="block w-full px-4 py-2 mb-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link 
            to="/register" 
            className="block w-full px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
          >
            Crear Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [cartCount] = useState(0);
  
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(cartDropdownRef, () => setIsCartOpen(false));
  useClickOutside(userDropdownRef, () => setIsUserOpen(false));

  // Ejemplo de items del carrito - Esto debería venir de tu estado global
  const cartItems = [
    {
      id: 1,
      name: "Skin Legendaria",
      price: 800,
      image: "https://example.com/skin-image.jpg"
    }
  ];

  const navLinks = [
    { to: "/", icon: <Home className="w-5 h-5" />, label: "Inicio" },
    { to: "/crew", icon: <Users className="w-5 h-5" />, label: "Crew" },
    { to: "/bot", icon: <MessageSquare className="w-5 h-5" />, label: "Bot" },
    { to: "/fortnite-shop", icon: <Gamepad2 className="w-5 h-5" />, label: "Fortnite" },
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center gap-1.5"
          >
            <img src={logo} alt="GameStore" className="h-8 w-auto" />
          </Link>

          {/* Search Bar - Centered */}
          <div className="hidden lg:flex flex-1 justify-center mx-6">
            <SearchBar />
          </div>

          {/* Desktop Navigation and Actions - Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} icon={link.icon}>
                  {link.label}
                </NavLink>
              ))}
            </div>
            
            {/* User Menu with Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button 
                className="p-2 hover:bg-gray-50/50 rounded-lg transition-all duration-300"
                onClick={() => {
                  setIsUserOpen(!isUserOpen);
                  setIsCartOpen(false);
                }}
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <UserDropdown isOpen={isUserOpen} />
            </div>
            
            {/* Cart Button with Dropdown */}
            <div className="relative" ref={cartDropdownRef}>
              <button 
                className="p-2 hover:bg-gray-50/50 rounded-lg transition-all duration-300 relative"
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsUserOpen(false);
                }}
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <CartDropdown isOpen={isCartOpen} cartItems={cartItems} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-50/50 rounded-lg transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="space-y-2">
              <div className="px-2 pb-4">
                <SearchBar />
              </div>
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} icon={link.icon}>
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                <Link 
                  to="/perfil" 
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50/50 rounded-lg transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                  <span>Mi Perfil</span>
                </Link>
                <Link 
                  to="/carrito" 
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50/50 rounded-lg transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Carrito</span>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;