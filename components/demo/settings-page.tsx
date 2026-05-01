'use client';

import { Settings, Bell, Shield, Download, Link2 } from 'lucide-react';
import { useState } from 'react';
import IntegrationsSection from '@/components/demo/settings-components/integrations-section';

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    inApp: true,
    slack: false,
    highRiskAlerts: true,
  });

  const [teamInfo] = useState({
    name: 'HeartMetrics Demo Team',
    members: 5,
    plan: 'Pro',
    status: 'Active',
  });

  const handleNotificationChange = (key: string) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-h-[100vh] min-h-screen p-6 lg:p-12 overflow-x-hidden bg-background">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-foreground flex items-center gap-3">
          <Settings className="w-10 h-10 text-[var(--primary)]" />
          Settings
        </h1>
        <p className="text-base text-muted-foreground">Manage your account, notifications, and preferences</p>
      </div>

      {/* Team Information */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Team Information</h2>
        <div className="rounded-lg border border-border p-6 bg-[var(--neutral)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Team Name</p>
              <p className="text-lg font-semibold text-foreground">{teamInfo.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Team Members</p>
              <p className="text-lg font-semibold text-foreground">{teamInfo.members} people</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Plan</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-foreground">{teamInfo.plan}</p>
                <span className="px-2 py-1 rounded text-xs bg-[var(--healthy)] text-[var(--foreground)]">Active</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">Status</p>
              <p className="text-lg font-semibold text-[var(--healthy)]">{teamInfo.status}</p>
            </div>
          </div>
        </div>
      </div>

      <IntegrationsSection />

      {/* Notification Preferences */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-[var(--primary)]" />
          Notification Preferences
        </h2>
        <div className="rounded-lg border border-border p-6 bg-[var(--neutral)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
              <button
                onClick={() => handleNotificationChange('email')}
                className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                  notificationSettings.email ? 'bg-[var(--healthy)]' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform mt-1 ${
                    notificationSettings.email ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-foreground">In-App Notifications</p>
                <p className="text-sm text-muted-foreground">Show alerts in the dashboard</p>
              </div>
              <button
                onClick={() => handleNotificationChange('inApp')}
                className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                  notificationSettings.inApp ? 'bg-[var(--healthy)]' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform mt-1 ${
                    notificationSettings.inApp ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-foreground">Slack Notifications</p>
                <p className="text-sm text-muted-foreground">Send alerts to Slack</p>
              </div>
              <button
                onClick={() => handleNotificationChange('slack')}
                className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                  notificationSettings.slack ? 'bg-[var(--healthy)]' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform mt-1 ${
                    notificationSettings.slack ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-foreground">High-Risk Alerts</p>
                <p className="text-sm text-muted-foreground">Immediate notification for critical issues</p>
              </div>
              <button
                onClick={() => handleNotificationChange('highRiskAlerts')}
                className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                  notificationSettings.highRiskAlerts ? 'bg-[var(--healthy)]' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform mt-1 ${
                    notificationSettings.highRiskAlerts ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Download className="w-6 h-6 text-[var(--primary)]" />
          Data Management
        </h2>
        <div className="rounded-lg border border-border p-6 bg-[var(--neutral)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-foreground">Export Team Data</p>
                <p className="text-sm text-muted-foreground">Download all team metrics and history as CSV</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--fg)] hover:bg-[var(--primary)]/30 border border-[var(--primary)]/50 font-medium text-sm transition-colors">
                Export
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-foreground">Data Retention</p>
                <p className="text-sm text-muted-foreground">We keep your data for 2 years by default</p>
              </div>
              <span className="text-sm text-muted-foreground">2 Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[var(--primary)]" />
          Privacy & Security
        </h2>
        <div className="rounded-lg border border-border p-6 bg-[var(--neutral)]">
          <div className="space-y-4">
            <a
              href="/privacy"
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors"
            >
              <div>
                <p className="font-medium text-foreground">Privacy Policy</p>
                <p className="text-sm text-muted-foreground">How we handle your data</p>
              </div>
              <span className="text-[var(--primary)]">→</span>
            </a>

            <a
              href="/security"
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors"
            >
              <div>
                <p className="font-medium text-foreground">Security Information</p>
                <p className="text-sm text-muted-foreground">Our security practices and compliance</p>
              </div>
              <span className="text-[var(--primary)]">→</span>
            </a>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
              <div>
                <p className="font-medium text-foreground">SOC 2 Compliance</p>
                <p className="text-sm text-muted-foreground">Verified security and privacy standards</p>
              </div>
              <span className="px-3 py-1 rounded text-xs bg-[var(--healthy)] text-[var(--fg)] font-medium">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
