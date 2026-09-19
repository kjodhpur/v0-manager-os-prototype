'use client';

import { Settings, Bell, Shield, Download, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import IntegrationsSection from '@/components/demo/settings-components/integrations-section';
import { EMPLOYEES } from '@/lib/team-data';

const NOTIFICATIONS = [
  { key: 'email', label: 'Email Notifications', hint: 'Receive alerts via email' },
  { key: 'inApp', label: 'In-App Notifications', hint: 'Show alerts in the dashboard' },
  { key: 'slack', label: 'Slack Notifications', hint: 'Send alerts to Slack' },
  { key: 'highRiskAlerts', label: 'High-Risk Alerts', hint: 'Immediate notification for critical issues' },
] as const;

type NotificationKey = (typeof NOTIFICATIONS)[number]['key'];

const TEAM_INFO = {
  name: 'HeartMetrics Demo Team',
  members: EMPLOYEES.length,
  plan: 'Pro',
  status: 'Active',
};

function toCsv(rows: string[][]) {
  return rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>({
    email: true,
    inApp: true,
    slack: false,
    highRiskAlerts: true,
  });
  const [exported, setExported] = useState(false);

  const toggle = (key: NotificationKey) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleExport = () => {
    const header = ['Name', 'Role', 'WWI Score', ...EMPLOYEES[0].components.map((c) => c.name)];
    const rows = EMPLOYEES.map((e) => [
      e.name,
      e.role,
      String(e.wwiScore),
      ...e.components.map((c) => String(c.value)),
    ]);

    const blob = new Blob([toCsv([header, ...rows])], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'heartmetrics-team-export.csv';
    link.click();
    URL.revokeObjectURL(url);

    setExported(true);
    window.setTimeout(() => setExported(false), 4000);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 lg:px-8 lg:py-12">
      <header className="mb-10">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-foreground lg:text-4xl">
          <Settings className="h-8 w-8 text-primary" aria-hidden="true" />
          Settings
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your account, notifications and preferences
        </p>
      </header>

      {/* Team information */}
      <section className="mb-10">
        <h3 className="mb-5 text-xl font-bold text-foreground">Team Information</h3>
        <div className="rounded-xl border border-border bg-card p-6">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="mb-1 text-sm font-medium text-muted-foreground">Team Name</dt>
              <dd className="text-lg font-semibold text-foreground">{TEAM_INFO.name}</dd>
            </div>
            <div>
              <dt className="mb-1 text-sm font-medium text-muted-foreground">Team Members</dt>
              <dd className="text-lg font-semibold text-foreground">{TEAM_INFO.members} people</dd>
            </div>
            <div>
              <dt className="mb-1 text-sm font-medium text-muted-foreground">Plan</dt>
              <dd className="flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">{TEAM_INFO.plan}</span>
                <span className="rounded-full bg-[var(--healthy)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--healthy)]">
                  {TEAM_INFO.status}
                </span>
              </dd>
            </div>
            <div>
              <dt className="mb-1 text-sm font-medium text-muted-foreground">Status</dt>
              <dd className="text-lg font-semibold text-[var(--healthy)]">{TEAM_INFO.status}</dd>
            </div>
          </dl>
        </div>
      </section>

      <IntegrationsSection />

      {/* Notifications */}
      <section className="mb-10">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-foreground">
          <Bell className="h-5 w-5 text-primary" aria-hidden="true" />
          Notification Preferences
        </h3>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            {NOTIFICATIONS.map(({ key, label, hint }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{hint}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications[key]}
                  aria-label={label}
                  onClick={() => toggle(key)}
                  className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    notifications[key] ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      notifications[key] ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data management */}
      <section className="mb-10">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-foreground">
          <Download className="h-5 w-5 text-primary" aria-hidden="true" />
          Data Management
        </h3>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-background p-4">
              <div className="min-w-0">
                <p className="font-medium text-foreground">Export Team Data</p>
                <p className="text-sm text-muted-foreground">
                  Download all team metrics and history as CSV
                </p>
              </div>
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {exported ? 'Downloaded' : 'Export'}
              </button>
              <p role="status" aria-live="polite" className="sr-only">
                {exported ? 'Team data exported as CSV.' : ''}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-4">
              <div>
                <p className="font-medium text-foreground">Data Retention</p>
                <p className="text-sm text-muted-foreground">
                  We keep your data for 2 years by default
                </p>
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">2 Years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & security */}
      <section>
        <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-foreground">
          <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
          Privacy &amp; Security
        </h3>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            {[
              { href: '/privacy', title: 'Privacy Policy', hint: 'How we handle your data' },
              { href: '/security', title: 'Security Information', hint: 'Our security practices' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="min-w-0">
                  <span className="block font-medium text-foreground">{item.title}</span>
                  <span className="block text-sm text-muted-foreground">{item.hint}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              </Link>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-background p-4">
              <div className="min-w-0">
                <p className="font-medium text-foreground">Infrastructure Compliance</p>
                <p className="text-sm text-muted-foreground">
                  Hosted on SOC 2 compliant infrastructure
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Provider-certified
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
