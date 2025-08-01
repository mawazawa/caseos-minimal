/*
 * ██╗  ██╗███████╗██╗     ██████╗      ██████╗███████╗███╗   ██╗████████╗███████╗██████╗ 
 * ██║  ██║██╔════╝██║     ██╔══██╗    ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
 * ███████║█████╗  ██║     ██████╔╝    ██║     █████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝
 * ██╔══██║██╔══╝  ██║     ██╔═══╝     ██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
 * ██║  ██║███████╗███████╗██║         ╚██████╗███████╗██║ ╚████║   ██║   ███████╗██║  ██║
 * ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝          ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
 * Help Center Page - CaseOS Legal AI Platform
 */

import { HelpCircle, Book, MessageCircle, FileText } from 'lucide-react';
import { AppLayout, PageHeader, PageContent } from '../components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export default function HelpPage() {
  const helpSections = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using CaseOS for your legal matters',
      icon: <Book className="w-5 h-5" />,
    },
    {
      title: 'AI Legal Assistant',
      description: 'How to get the most out of AI-powered legal guidance',
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      title: 'Document Management',
      description: 'Organize and manage your legal documents effectively',
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Help Center"
        description="Get help with using CaseOS effectively"
      />

      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {helpSections.map((section) => (
            <Card key={section.title} variant="elevated" padding="md" className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="text-[var(--color-accent)]">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                      {section.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm">
                      {section.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="elevated" padding="lg">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-[var(--color-text-tertiary)]" />
              </div>
              <p className="text-[var(--color-text-secondary)]">
                FAQ section coming soon. For immediate assistance, please contact support.
              </p>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </AppLayout>
  );
}