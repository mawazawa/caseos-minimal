/*
 * ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗
 * ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
 * ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
 * ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
 * ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝
 * Home Page - Smart Routing to Landing or Dashboard
 */

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import DashboardPage from './dashboard/page';

/**
 * Smart Home Page Router
 *
 * - Unauthenticated users → Landing page (/landing)
 * - Authenticated users → Dashboard
 *
 * This ensures proper user flow and conversion optimization
 */
export default async function HomePage() {
  // Check if user is authenticated
  const session = await auth();

  if (!session) {
    // Redirect unauthenticated users to landing page
    redirect('/landing');
  }

  // Show dashboard for authenticated users
  return <DashboardPage />;
}