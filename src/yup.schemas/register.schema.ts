import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .required("Le prénom est requis"),
  lastName: Yup.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Le nom est requis"),
  email: Yup.string()
    .email("Email invalide")
    .required("L'email est requis"),
  phoneNumber: Yup.string()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, "Numéro de téléphone invalide")
    .optional(),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
});

