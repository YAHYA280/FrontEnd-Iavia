'use client';

import React from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import GuestGuard from '@/contexts/auth/guards/guest-guard';
import { useUserStore } from '@/services/stores/user-store';
import { paths } from '@/routes/paths';
import Link from 'next/link';
import { loginValidationSchema } from '@/yup.schemas/login.schema';
import { getUserIpAddress } from '@/utils/ip';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth/jwt/auth-context';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login: contextLogin, error: contextError } = useContext(AuthContext);
  const { isLoading } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const error = contextError;

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      // Récupérer l'adresse IP de l'utilisateur
      const ipAddress = await getUserIpAddress();

      await contextLogin(values.email.trim(), values.password, ipAddress || '');

      // Redirect to returnTo or dashboard
      const returnTo = searchParams.get('returnTo') || paths.dashboard.root;
      router.push(returnTo);
    } catch (error) {
      // Error is handled by the context/store
      console.error('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <GuestGuard>
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Connexion
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      type="email"
                      fullWidth
                      required
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />

                    <Field
                      as={TextField}
                      name="password"
                      label="Mot de passe"
                      type="password"
                      fullWidth
                      required
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting || isLoading}
                      fullWidth
                      startIcon={isSubmitting || isLoading ? <CircularProgress size={20} /> : null}
                    >
                      {isSubmitting || isLoading ? 'Connexion...' : 'Se connecter'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                      <Link href={paths.auth.register}>Pas de compte ? S&apos;inscrire</Link>
                    </Box>
                  </Stack>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
    </GuestGuard>
  );
}
