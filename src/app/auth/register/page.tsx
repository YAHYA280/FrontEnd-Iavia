"use client";

import React from "react";
import { Box, Container, Card, CardContent, TextField, Typography, Alert, Stack, Button, CircularProgress, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import GuestGuard from "@/contexts/auth/guards/guest-guard";
import { paths } from "@/routes/paths";
import { useUserStore } from "@/services/stores/user-store";
import Link from 'next/link';
import type { AdminDto } from "@/types/user-service.types";
import { registerValidationSchema } from "@/yup.schemas/register.schema";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
}

const initialValues: RegisterFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  street: '',
  zipCode: '',
  city: '',
  country: '',
};

export default function RegisterPage() {
  const { createAdmin, isLoading, error } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const adminData: AdminDto = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phoneNumber: values.phoneNumber.trim() || undefined,
        password: values.password,
        address: {
          street: values.street.trim() || undefined,
          zipCode: values.zipCode.trim() || undefined,
          city: values.city.trim() || undefined,
          country: values.country.trim() || undefined,
        },
      };

      await createAdmin(adminData);
      router.push(paths.auth.login);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <GuestGuard>
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', alignItems: 'center', minHeight: '80vh', py: 4 }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Inscription
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={registerValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form>
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Field
                      as={TextField}
                      name="firstName"
                      label="Prénom"
                      required
                      fullWidth
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                    />
                    <Field
                      as={TextField}
                      name="lastName"
                      label="Nom"
                      required
                      fullWidth
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                    />
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      type="email"
                      required
                      fullWidth
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      as={TextField}
                      name="phoneNumber"
                      label="Numéro de téléphone"
                      fullWidth
                      error={touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                    <Field
                      as={TextField}
                      name="password"
                      label="Mot de passe"
                      type="password"
                      required
                      fullWidth
                      error={touched.password && !!errors.password}
                      helperText={touched.password ? errors.password : 'Min 6 caractères'}
                    />

                    <Field
                      as={TextField}
                      name="confirmPassword"
                      label="Confirmer le mot de passe"
                      type="password"
                      required
                      fullWidth
                      error={touched.confirmPassword && !!errors.confirmPassword}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />

                    <Divider sx={{ my: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Adresse
                      </Typography>
                    </Divider>

                    <Field
                      as={TextField}
                      name="street"
                      label="Rue"
                      fullWidth
                      error={touched.street && !!errors.street}
                      helperText={touched.street && errors.street}
                    />

                    <Field
                      as={TextField}
                      name="zipCode"
                      label="Code postal"
                      fullWidth
                      error={touched.zipCode && !!errors.zipCode}
                      helperText={touched.zipCode && errors.zipCode}
                    />

                    <Field
                      as={TextField}
                      name="city"
                      label="Ville"
                      fullWidth
                      error={touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                    />

                    <Field
                      as={TextField}
                      name="country"
                      label="Pays"
                      fullWidth
                      error={touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading || isSubmitting}
                      fullWidth
                      startIcon={isLoading || isSubmitting ? <CircularProgress size={20} /> : null}
                    >
                      S&apos;inscrire
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                      <Link href={paths.auth.login}>Déjà un compte&nbsp;? Se connecter</Link>
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
