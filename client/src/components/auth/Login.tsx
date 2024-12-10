// src/components/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
 Container,
 Box,
 TextField,
 Button,
 Typography,
 Link,
 Paper,
 Alert,
 CircularProgress
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/auth.service';

interface LoginFormData {
 email: string;
 password: string;
}

const Login = () => {
 const [formData, setFormData] = useState<LoginFormData>({
   email: '',
   password: ''
 });
 const [error, setError] = useState<string>('');
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const navigate = useNavigate();
 const { login: authLogin } = useAuth();

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    console.log('Attempting login with:', formData);
    const response = await authService.login(formData);
    console.log('Login response:', response);
    authLogin(response.token);
    navigate('/dashboard');
  } catch (err: any) {
    console.error('Login error details:', err.response?.data);
    setError(
      err.response?.data?.message || 
      `Login failed: ${err.message}`
    );
  } finally {
    setIsLoading(false);
  }
};

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };

 return (
   <Container component="main" maxWidth="xs">
     <Box
       sx={{
         marginTop: 8,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center'
       }}
     >
       <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
         <Typography component="h1" variant="h5" align="center" gutterBottom>
           Sign In
         </Typography>
         
         {error && (
           <Alert severity="error" sx={{ mb: 2 }}>
             {error}
           </Alert>
         )}

         <Box component="form" onSubmit={handleSubmit}>
           <TextField
             margin="normal"
             required
             fullWidth
             id="email"
             label="Email Address"
             name="email"
             autoComplete="email"
             autoFocus
             value={formData.email}
             onChange={handleChange}
             disabled={isLoading}
           />
           <TextField
             margin="normal"
             required
             fullWidth
             name="password"
             label="Password"
             type="password"
             id="password"
             autoComplete="current-password"
             value={formData.password}
             onChange={handleChange}
             disabled={isLoading}
           />
           <Button
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
             disabled={isLoading}
           >
             {isLoading ? (
               <CircularProgress size={24} color="inherit" />
             ) : (
               'Sign In'
             )}
           </Button>
           <Box sx={{ textAlign: 'center' }}>
             <Link component={RouterLink} to="/register" variant="body2">
               Don't have an account? Sign Up
             </Link>
           </Box>
         </Box>
       </Paper>
     </Box>
   </Container>
 );
};

export default Login;