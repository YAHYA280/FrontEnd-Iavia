import AuthGuard from '@/contexts/auth/guards/auth-guard';
import { DashboardLayout } from '@/layouts/dashboard/dashboard-layout';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
