'use client';

import { Link2, CheckCircle2, Lock } from 'lucide-react';
import { useState } from 'react';

const initialIntegrations = [
  { id: 'jira',  name: 'Jira',        connected: true,  lastSync: '2 minutes ago', scope: ['Task status and assignees', 'Sprint data', 'Blockers', 'Cycle time'] },
  { id: 'slack', name: 'Slack',       connected: true,  lastSync: '5 minutes ago', scope: ['Team channels', 'Notification preferences'] },
  { id: 'hris',  name: 'HRIS System', connected: false, lastSync: null,            scope: ['Employee directory', 'Org structure', 'Time off'] },
];

export function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [activeTab, setActiveTab] = useState<'integrations' | 'permissions'>('integrations');

  const toggle = (id: string) =>
    setIntegrations((prev) =>
      prev.map((i) => i.id === id ? { ...i, connected: !i.connected, lastSync: !i.connected ? 'just now' : null } : i)
    );

  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Link2 className="w-6 h-6" style={{ color: '#00B8A0' }} />
          Integrations
        </h1>
        <p className="text-sm text-muted-foreground">Connect tools to HeartMetrics for better data insights</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6">
        {(['integrations', 'permissions'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
              activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'integrations' && (
        <div className="space-y-3">
          {integrations.map((integ) => (
            <div key={integ.id} className="rounded-[12px] border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(0,184,160,0.1)' }}>
                      <Link2 className="w-4 h-4" style={{ color: '#00B8A0' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{integ.name}</p>
                      {integ.connected && (
                        <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: '#5DD67A' }}>
                          <CheckCircle2 className="w-3 h-3" />
                          Connected · Last sync: {integ.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-0.5 ml-11">
                    {integ.scope.map((s) => <li key={s}>· {s}</li>)}
                  </ul>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => toggle(integ.id)}
                  className={`flex-shrink-0 relative inline-flex h-7 w-12 rounded-full transition-colors ${integ.connected ? 'bg-primary' : 'bg-border'}`}
                >
                  <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-1 ${integ.connected ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'permissions' && (
        <div className="space-y-4">
          <div className="rounded-[12px] border p-4 mb-4" style={{ borderColor: 'rgba(0,184,160,0.2)', backgroundColor: 'rgba(0,184,160,0.05)' }}>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00B8A0' }} />
              <div>
                <p className="font-semibold text-foreground">Data Privacy & Controls</p>
                <p className="text-sm text-muted-foreground mt-1">Manage what data HeartMetrics can access and how it's used</p>
              </div>
            </div>
          </div>

          {[
            { title: 'Privacy permissions', items: [
              { label: 'Allow email analysis for recognition patterns', checked: true },
              { label: 'Allow meeting analysis for workload metrics', checked: true },
              { label: 'Allow Slack channel monitoring', checked: false },
            ]},
            { title: 'Data controls', items: [
              { label: 'Anonymize personal data in reports', checked: true },
              { label: 'Exclude contractors from analysis', checked: true },
              { label: 'Retain data for compliance audit trail', checked: false },
            ]},
          ].map((section) => (
            <div key={section.title} className="rounded-[12px] border border-border bg-card p-5">
              <p className="font-semibold text-foreground mb-4">{section.title}</p>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <label key={item.label} className="flex items-center gap-3 p-3 rounded-[8px] border border-border cursor-pointer hover:bg-muted/30 transition-colors">
                    <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 rounded accent-primary" />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-8">
        This product uses work-system signals (tasks, meetings, assignments). It does not read private messages by default.
      </p>
    </div>
  );
}
