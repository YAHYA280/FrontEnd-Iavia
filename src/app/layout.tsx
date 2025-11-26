import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/shared/theme";
import { primaryFont, secondaryFont, tertiaryFont } from "@/shared/theme/typography";
import { AuthProvider } from "@/contexts/auth/jwt/auth-provider";

export const metadata: Metadata = {
  title: "IA-VIA - Marketplace des Agents IA",
  description: "Plateforme de découverte et d'utilisation d'agents IA",
  icons: {
    icon: '/logo/iavia-logo.svg',
    apple: '/logo/iavia-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${primaryFont.className} ${secondaryFont.className} ${tertiaryFont.className}`}>
      <head>
        <link rel="icon" href="/logo/iavia-logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
