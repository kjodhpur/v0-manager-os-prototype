'use client';

import { Settings, Bell, Download, Shield } from 'lucide-react';
import { useState } from 'react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, inApp: true, slack: false, highRisk: true });
  const toggle = (k: keyof typeof notifications) => setNotifications((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Settings className="w-6 h-6" style={{ color: '#00B8A0' }} />
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">Manage your account, notifications, and preferences</p>
      </div>

      {/* Team info */}
      <section className="mb-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Team information</h2>
        <div className="rounded-[12px] border border-border bg-card p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Team name',    value: 'HeartMetrics Demo' },
              { label: 'Members',      value: '5 people' },
              { label: 'Plan',         value: 'Pro', badge: 'Active' },
              { label: 'Status',       value: 'Active', green: true },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <div className="flex items-center gap-2">
                  <p className={`font-semibold text-sm ${item.green ? '' : 'text-foreground'}`} style={item.green ? { color: '#5DD67A' } : undefined}>
                    {item.value}
                  </p>
                  {item.badge && (
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(93,214,122,0.15)', color: '#5DD67A' }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Bell className="w-3.5 h-3.5" />
          Notification preferences
        </h2>
        <div className="rounded-[12px] border border-border bg-card p-5 space-y-3">
          {[
            { key: 'email',   label: 'Email notifications',    desc: 'Receive alerts via email' },
            { key: 'inApp',   label: 'In-app notifications',   desc: 'Show alerts in the dashboard' },
            { key: 'slack',   label: 'Slack notifications',    desc: 'Send alerts to Slack' },
            { key: 'highRisk',label: 'High-risk alerts',       desc: 'Immediate notification for critical issues' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-[8px] bg-muted/30 border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button
                onClick={() => toggle(item.key as keyof typeof notifications)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-primary' : 'bg-border'}`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform mt-1 ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Data management */}
      <section className="mb-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Download className="w-3.5 h-3.5" />
          Data management
        </h2>
        <div className="rounded-[12px] border border-border bg-card p-5 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-[8px] bg-muted/30 border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Export team data</p>
              <p className="text-xs text-muted-foreground">Download all team metrics and history as CSV</p>
            </div>
            <button className="px-3 py-1.5 text-xs font-medium rounded transition-colors" style={{ backgroundColor: 'rgba(0,184,160,0.15)', color: '#00B8A0', border: '1px solid rgba(0,184,160,0.3)' }}>
              Export
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-[8px] bg-muted/30 border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Data retention</p>
              <p className="text-xs text-muted-foreground">We keep your data for 2 years by default</p>
            </div>
            <span className="text-xs text-muted-foreground">2 years</span>
          </div>
        </div>
      </section>

      {/* Privacy & security */}
      <section>
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5" />
          Privacy & security
        </h2>
        <div className="rounded-[12px] border border-border bg-card p-5 space-y-3">
          {[
            { label: 'Privacy policy',      desc: 'How we handle your data',                     href: '/privacy' },
            { label: 'Security information', desc: 'Our security practices and compliance',       href: '/security' },
          ].map((link) => (
            <a key={link.label} href={link.href} className="flex items-center justify-between p-3 rounded-[8px] bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">{link.label}</p>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </div>
              <span style={{ color: '#00B8A0' }}>→</span>
            </a>
          ))}
          <div className="flex items-center justify-between p-3 rounded-[8px] bg-muted/30 border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">SOC 2 compliance</p>
              <p className="text-xs text-muted-foreground">Verified security and privacy standards</p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded" style={{ backgroundColor: 'rgba(93,214,122,0.15)', color: '#5DD67A' }}>Verified</span>
          </div>
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
