import { Box, Container, Paper, Typography } from '@mui/material';
import SignUpForm from '@/components/auth/SignUpForm';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import MaterialUIProvider from '@/components/providers/MaterialUIProvider';

export default function SignUpPage() {
  return (
    <MaterialUIProvider>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography component="h1" variant="h5">
              회원가입
            </Typography>
            
            <SignUpForm />
            
            <Box sx={{ mt: 2, width: '100%' }}>
              <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                또는
              </Typography>
              <GoogleSignInButton />
            </Box>
            
            <Typography variant="body2" sx={{ mt: 3 }}>
              이미 계정이 있으신가요?{' '}
              <Typography
                component="a"
                href="/auth/signin"
                variant="body2"
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                로그인
              </Typography>
            </Typography>
          </Paper>
        </Box>
      </Container>
    </MaterialUIProvider>
  );
}