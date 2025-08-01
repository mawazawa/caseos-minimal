/*
 * ███╗   ██╗███████╗██╗    ██╗     ██████╗ █████╗ ███████╗███████╗
 * ████╗  ██║██╔════╝██║    ██║     ██╔════╝██╔══██╗██╔════╝██╔════╝
 * ██╔██╗ ██║█████╗  ██║ █╗ ██║     ██║     ███████║███████╗█████╗
 * ██║╚██╗██║██╔══╝  ██║███╗██║     ██║     ██╔══██║╚════██║██╔══╝
 * ██║ ╚████║███████╗╚███╔███╔╝     ╚██████╗██║  ██║███████║███████╗
 * ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝       ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝
 * New Case Creation - Legal Matter Setup
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout, PageHeader, PageContent } from '../../components/layout/app-layout';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { ArrowLeft, Save, FileText, Calendar, DollarSign, Scale } from 'lucide-react';

interface NewCaseFormData {
  title: string;
  description: string;
  caseType: string;
  jurisdiction: string;
  courtLevel: string;
  estimatedValue: string;
  urgency: 'low' | 'medium' | 'high';
  opposingParty: string;
  keyDates: {
    filingDeadline?: string;
    hearingDate?: string;
  };
}

export default function NewCasePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<NewCaseFormData>({
    title: '',
    description: '',
    caseType: '',
    jurisdiction: '',
    courtLevel: '',
    estimatedValue: '',
    urgency: 'medium',
    opposingParty: '',
    keyDates: {}
  });

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: keyof NewCaseFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleKeyDateChange = (field: keyof NewCaseFormData['keyDates'], value: string) => {
    setFormData(prev => ({
      ...prev,
      keyDates: {
        ...prev.keyDates,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('📝 Creating new case with data:', formData);
      
      // TODO: Implement actual case creation API call
      // const response = await fetch('/api/cases', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('✅ Case created successfully!');
      router.push('/cases');
    } catch (error) {
      console.error('❌ Error creating case:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const caseTypes = [
    'Small Claims',
    'Contract Dispute',
    'Landlord/Tenant',
    'Family Law',
    'Employment',
    'Personal Injury',
    'Debt Collection',
    'Consumer Rights',
    'Property Dispute',
    'Other'
  ];

  const jurisdictions = [
    'Federal Court',
    'State Court - Superior',
    'State Court - District',
    'Local Municipal Court',
    'Administrative Tribunal',
    'Arbitration Panel'
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Create New Case"
        description="Start a new legal matter and organize your case information."
        actions={
          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              size="sm" 
              leftIcon={<ArrowLeft size={14} />}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              leftIcon={<Save size={14} />}
              onClick={handleSubmit}
              isLoading={isLoading}
              form="new-case-form"
              type="submit"
            >
              Create Case
            </Button>
          </div>
        }
      />

      <PageContent>
        <div className="max-w-4xl mx-auto">
          <form id="new-case-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[var(--color-accent)]" />
                  <CardTitle>Basic Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-[var(--color-text-primary)] text-[var(--font-size-sm)] font-medium mb-2">
                    Case Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                    placeholder="Enter a descriptive title for your case"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[var(--color-text-primary)] text-[var(--font-size-sm)] font-medium mb-2">
                    Case Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                    placeholder="Briefly describe the legal matter"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[var(--color-text-primary)] text-[var(--font-size-sm)] font-medium mb-2">
                      Case Type *
                    </label>
                    <select
                      value={formData.caseType}
                      onChange={(e) => handleInputChange('caseType', e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                      required
                    >
                      <option value="">Select case type</option>
                      {caseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[var(--color-text-primary)] text-[var(--font-size-sm)] font-medium mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Details */}
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Scale size={18} className="text-[var(--color-accent)]" />
                  <CardTitle>Legal Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[var(--color-text-primary)] text-[var(--font-size-sm)] font-medium mb-2">
                      Jurisdiction *
                    </label>
                    <select
                      value={formData.jurisdiction}
                      onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                      required
                    >
                      <option value="">Select jurisdiction</option>
                      {jurisdictions.map(jurisdiction => (
                        <option key={jurisdiction} value={jurisdiction}>{jurisdiction}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[var(--color-text-primary)] text-[var(--font-size-sm)] font-medium mb-2">
                      Opposing Party
                    </label>
                    <input
                      type="text"
                      value={formData.opposingParty}
                      onChange={(e) => handleInputChange('opposingParty', e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                      placeholder="Name of opposing party (if known)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[var(--color-text-primary)] text-[var(--font-size-sm)] font-medium mb-2">
                    Estimated Value at Stake
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                    <input
                      type="text"
                      value={formData.estimatedValue}
                      onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                      placeholder="Enter monetary value (optional)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-[var(--color-accent)]" />
                  <CardTitle>Important Dates</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[var(--color-text-primary)] text-[var(--font-size-sm)] font-medium mb-2">
                      Filing Deadline
                    </label>
                    <input
                      type="date"
                      value={formData.keyDates.filingDeadline || ''}
                      onChange={(e) => handleKeyDateChange('filingDeadline', e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--color-text-primary)] text-[var(--font-size-sm)] font-medium mb-2">
                      Hearing Date
                    </label>
                    <input
                      type="date"
                      value={formData.keyDates.hearingDate || ''}
                      onChange={(e) => handleKeyDateChange('hearingDate', e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </PageContent>
    </AppLayout>
  );
}