import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import { FaMoneyBill, FaShoppingBag, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleCardClick = (section: string) => {
    switch(section) {
      case 'vbucks':
        navigate('/admin/vbucks');
        break;
      case 'productos':
        // Futura navegación a productos
        break;
      case 'usuarios':
        navigate('/admin/users');
        break;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#FAFAFA',
      color: '#1a1a1a',
      pt: 12,
      pb: 4
    }}>
      <Container>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 6
        }}>
          <Typography variant="h4" component="h1" sx={{ color: '#1a1a1a' }}>
            PANEL DE ADMINISTRACIÓN
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              background: '#C7CAC6',
              color: '#1a1a1a',
              px: 3,
              py: 1,
              borderRadius: '8px',
              border: '2px solid transparent',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s ease-in-out'
              },
              '&:hover': {
                background: '#4dd5ff',
                color: 'white',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 15px rgba(77, 213, 255, 0.3)',
                '&::before': {
                  left: '100%'
                }
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Gestionar VBucks */}
          <Grid item xs={12} md={4}>
            <Card 
              onClick={() => handleCardClick('vbucks')}
              sx={{ 
                background: '#C7CAC6',
                color: '#1a1a1a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                textAlign: 'center',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(0,184,212,0.1) 0%, rgba(0,229,255,0.1) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out'
                },
                '&:hover': {
                  transform: 'scale(1.05) rotate(1deg)',
                  boxShadow: '0 8px 40px rgba(0,184,212,0.3)',
                  '&::before': {
                    opacity: 1
                  }
                }
              }}
            >
              <Box sx={{ 
                background: 'linear-gradient(135deg, #00b8d4 0%, #00e5ff 100%)',
                p: 2,
                borderRadius: '50%',
                mb: 2,
                boxShadow: '0 4px 20px rgba(0, 184, 212, 0.3)'
              }}>
                <FaMoneyBill size={40} color="#ffffff" />
              </Box>
              <Typography variant="h6" sx={{ mb: 1, textTransform: 'uppercase', color: '#1a1a1a' }}>
                GESTIONAR VBUCKS
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#666666' }}>
                Configura y actualiza las tasas de VBucks
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  background: 'linear-gradient(45deg, #00b8d4 30%, #00e5ff 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00838f 30%, #00b8d4 90%)'
                  }
                }}
              >
                Gestionar VBucks
              </Button>
            </Card>
          </Grid>

          {/* Gestionar Productos */}
          <Grid item xs={12} md={4}>
            <Card 
              onClick={() => handleCardClick('productos')}
              sx={{ 
                background: '#C7CAC6',
                color: '#1a1a1a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                textAlign: 'center',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(0,184,212,0.1) 0%, rgba(0,229,255,0.1) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out'
                },
                '&:hover': {
                  transform: 'scale(1.05) rotate(-1deg)',
                  boxShadow: '0 8px 40px rgba(0,184,212,0.3)',
                  '&::before': {
                    opacity: 1
                  }
                }
              }}
            >
              <Box sx={{ 
                background: 'linear-gradient(135deg, #00b8d4 0%, #00e5ff 100%)',
                p: 2,
                borderRadius: '50%',
                mb: 2,
                boxShadow: '0 4px 20px rgba(0, 184, 212, 0.3)'
              }}>
                <FaShoppingBag size={40} color="#ffffff" />
              </Box>
              <Typography variant="h6" sx={{ mb: 1, textTransform: 'uppercase', color: '#1a1a1a' }}>
                GESTIONAR PRODUCTOS
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#666666' }}>
                Administra los productos de Roblox
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  background: 'linear-gradient(45deg, #00b8d4 30%, #00e5ff 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00838f 30%, #00b8d4 90%)'
                  }
                }}
              >
                Gestionar Productos
              </Button>
            </Card>
          </Grid>

          {/* Gestionar Usuarios */}
          <Grid item xs={12} md={4}>
            <Card 
              onClick={() => handleCardClick('usuarios')}
              sx={{ 
                background: '#C7CAC6',
                color: '#1a1a1a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                textAlign: 'center',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(0,184,212,0.1) 0%, rgba(0,229,255,0.1) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out'
                },
                '&:hover': {
                  transform: 'scale(1.05) rotate(1deg)',
                  boxShadow: '0 8px 40px rgba(0,184,212,0.3)',
                  '&::before': {
                    opacity: 1
                  }
                }
              }}
            >
              <Box sx={{ 
                background: 'linear-gradient(135deg, #00b8d4 0%, #00e5ff 100%)',
                p: 2,
                borderRadius: '50%',
                mb: 2,
                boxShadow: '0 4px 20px rgba(0, 184, 212, 0.3)'
              }}>
                <FaUsers size={40} color="#ffffff" />
              </Box>
              <Typography variant="h6" sx={{ mb: 1, textTransform: 'uppercase', color: '#1a1a1a' }}>
                GESTIONAR USUARIOS
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#666666' }}>
                Administra los usuarios y sus permisos
              </Typography>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  background: 'linear-gradient(45deg, #00b8d4 30%, #00e5ff 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00838f 30%, #00b8d4 90%)'
                  }
                }}
              >
                Gestionar Usuarios
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminPanel;
