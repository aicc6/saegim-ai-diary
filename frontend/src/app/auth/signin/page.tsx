import { Box, Container, Paper, Typography } from '@mui/material';
import SignInForm from '@/components/auth/SignInForm';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import MaterialUIProvider from '@/components/providers/MaterialUIProvider';

export default function SignInPage() {
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
              로그인
            </Typography>
            
            <SignInForm />
            
            <Box sx={{ mt: 2, width: '100%' }}>
              <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                또는
              </Typography>
              <GoogleSignInButton />
            </Box>
            
            <Typography variant="body2" sx={{ mt: 3 }}>
              계정이 없으신가요?{' '}
              <Typography
                component="a"
                href="/auth/signup"
                variant="body2"
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                회원가입
              </Typography>
            </Typography>
          </Paper>
        </Box>
      </Container>
    </MaterialUIProvider>
  );
}