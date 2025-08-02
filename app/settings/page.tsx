/*
 * ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ ███████╗
 * ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ ██╔════╝
 * ███████╗█████╗     ██║      ██║   ██║██╔██╗ ██║██║  ███╗███████╗
 * ╚════██║██╔══╝     ██║      ██║   ██║██║╚██╗██║██║   ██║╚════██║
 * ███████║███████╗   ██║      ██║   ██║██║ ╚████║╚██████╔╝███████║
 * ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
 * Settings Page - CaseOS Legal AI Platform
 */

'use client';

import { Settings, User, Shield, Bell, Palette } from 'lucide-react';
import { AppLayout, PageHeader, PageContent } from '../components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { ThemeSwitch } from '../components/ui/theme-switch';
import { useTheme } from '../components/theme';

export default function SettingsPage() {
  const { resolvedTheme } = useTheme();

  const settingSections = [
    {
      title: 'Profile Settings',
      description: 'Manage your personal information and preferences',
      icon: <User className="w-5 h-5" />,
    },
    {
      title: 'Privacy & Security',
      description: 'Control your data privacy and account security',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: 'Notifications',
      description: 'Configure how you receive updates and alerts',
      icon: <Bell className="w-5 h-5" />,
    },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <PageContent>
        <div className="space-y-4">
          {/* Theme Settings - Active Section */}
          <Card variant="elevated" padding="lg">
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="text-[var(--color-text-secondary)]">
                  <Palette className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                    Appearance
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                    Choose your preferred theme mode
                  </p>
                  <div className="flex items-center gap-4">
                    <ThemeSwitch />
                    <span className="text-[var(--color-text-secondary)] text-sm">
                      {resolvedTheme === 'dark' ? 'Dark mode' : 'Light mode'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Settings Sections */}
          {settingSections.map((section) => (
            <Card key={section.title} variant="elevated" padding="lg">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="text-[var(--color-text-secondary)]">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                      {section.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm">
                      {section.description}
                    </p>
                  </div>
                  <span className="text-[var(--color-text-tertiary)] text-sm">
                    Coming soon
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="elevated" padding="lg" className="mt-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center">
                <Settings className="w-6 h-6 text-[var(--color-text-tertiary)]" />
              </div>
              <p className="text-[var(--color-text-secondary)]">
                Full settings functionality coming soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </AppLayout>
  );
}