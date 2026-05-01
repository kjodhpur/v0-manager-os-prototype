// components/IntegrationsSection.tsx
'use client';

import { Plug, CheckCircle2, Lock } from 'lucide-react';
import { useState } from 'react';

export default function IntegrationsSection() {
  const [integrations, setIntegrations] = useState([
    {
      id: 'jira',
      name: 'Jira',
      connected: true,
      lastSync: '2 minutes ago',
      dataScope: ['Task status and assignees', 'Sprint data', 'Blockers', 'Cycle time'],
    },
    {
      id: 'slack',
      name: 'Slack',
      connected: true,
      lastSync: '5 minutes ago',
      dataScope: ['Team channels', 'Notification preferences', 'Direct messages'],
    },
    {
      id: 'hris',
      name: 'HRIS System',
      connected: false,
      lastSync: null,
      dataScope: ['Employee directory', 'Org structure', 'Time off'],
    },
  ]);

  const [activeTab, setActiveTab] = useState<'integrations' | 'permissions'>('integrations');

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, connected: !i.connected, lastSync: !i.connected ? 'just now' : null }
          : i
      )
    );
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[var(--fg)] mb-6 flex items-center gap-2">
        <Plug className="w-6 h-6 text-[var(--primary)]" />
        Integrations
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab('integrations')}
          className={`pb-3 px-3 ${
            activeTab === 'integrations'
              ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
              : 'text-[var(--fg-muted)]'
          }`}
        >
          Integrations
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`pb-3 px-3 ${
            activeTab === 'permissions'
              ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
              : 'text-[var(--fg-muted)]'
          }`}
        >
          Permissions
        </button>
      </div>

      {/* Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          {integrations.map((integ) => (
            <div key={integ.id} className="rounded-lg border border-border p-6 bg-[var(--neutral)]">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Plug className="w-4 h-4 text-[var(--primary)]" />
                    <p className="font-semibold">{integ.name}</p>
                  </div>

                  {integ.connected && (
                    <div className="text-sm text-[var(--healthy)]-400 flex items-center gap-1 mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Connected • {integ.lastSync}
                    </div>
                  )}

                  <ul className="text-xs text-[var(--fg-muted)]">
                    {integ.dataScope.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <button
                    onClick={() => handleToggle(integ.id)}
                    className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                        integ.connected ? 'bg-[var(--healthy)]' : 'bg-border'
                    }`}
                    >
                    <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform mt-1 ${
                        integ.connected ? 'translate-x-7' : 'translate-x-1'
                        }`}
                    />
                    </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Permissions */}
      {activeTab === 'permissions' && (
        <div className="rounded-lg border border-border p-6 bg-[var(--neutral)]">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-[var(--primary)]" />
            <p className="font-semibold">Permissions</p>
          </div>

          <div className="space-y-2 text-sm">
            <label className="flex gap-2">
              <input type="checkbox" defaultChecked />
              Allow email analysis
            </label>
            <label className="flex gap-2">
              <input type="checkbox" defaultChecked />
              Allow meeting analysis
            </label>
            <label className="flex gap-2">
              <input type="checkbox" />
              Allow Slack monitoring
            </label>
          </div>
        </div>
      )}
    </div>
  );
}