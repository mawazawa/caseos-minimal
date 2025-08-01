/*
 * ███████╗██╗  ██╗███████╗██╗     ███████╗████████╗ ██████╗ ███╗   ██╗
 * ██╔════╝██║ ██╔╝██╔════╝██║     ██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║
 * ███████╗█████╔╝ █████╗  ██║     █████╗     ██║   ██║   ██║██╔██╗ ██║
 * ╚════██║██╔═██╗ ██╔══╝  ██║     ██╔══╝     ██║   ██║   ██║██║╚██╗██║
 * ███████║██║  ██╗███████╗███████╗███████╗   ██║   ╚██████╔╝██║ ╚████║
 * ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
 * Skeleton Demo Page - Linear-inspired Loading States
 */

import { AppLayout, PageHeader, PageContent } from '@/app/components/layout/app-layout';
import { SkeletonDemo } from '@/app/components/ui/skeleton-demo';

export default function SkeletonDemoPage() {
  return (
    <AppLayout>
      <PageHeader 
        title="Loading Skeletons" 
        description="Linear-inspired skeleton loading states for smooth user experience"
      />
      <PageContent>
        <SkeletonDemo />
      </PageContent>
    </AppLayout>
  );
}