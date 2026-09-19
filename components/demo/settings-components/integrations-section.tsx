'use client';

import { Plug, CheckCircle2, Lock } from 'lucide-react';
import { useState } from 'react';

const TABS = [
  { id: 'integrations', label: 'Integrations' },
  { id: 'permissions', label: 'Permissions' },
] as const;

type TabId = (typeof TABS)[number]['id'];

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
      // Work-system signals only — never private message content.
      dataScope: ['Public channel activity', 'Notification preferences', 'Recognition posts'],
    },
    {
      id: 'hris',
      name: 'HRIS System',
      connected: false,
      lastSync: null,
      dataScope: ['Employee directory', 'Org structure', 'Time off'],
    },
  ]);

  const [permissions, setPermissions] = useState({
    meetingLoad: true,
    taskAssignment: true,
    publicRecognition: false,
  });

  const [activeTab, setActiveTab] = useState<TabId>('integrations');

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, connected: !i.connected, lastSync: !i.connected ? 'just now' : null }
          : i,
      ),
    );
  };

  return (
    <section className="mb-10">
      <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-foreground">
        <Plug className="h-5 w-5 text-primary" aria-hidden="true" />
        Integrations
      </h3>

      <div className="mb-6 flex gap-2 border-b border-border" role="tablist" aria-label="Integration settings">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`min-h-[44px] rounded-t-lg px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'integrations' && (
        <div id="panel-integrations" role="tabpanel" aria-labelledby="tab-integrations" className="flex flex-col gap-3">
          {integrations.map((integ) => (
            <div key={integ.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <Plug className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <p className="font-semibold text-foreground">{integ.name}</p>
                  </div>

                  {integ.connected && (
                    <p className="mb-2 flex items-center gap-1.5 text-sm text-[var(--healthy)]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Connected • {integ.lastSync}
                    </p>
                  )}

                  <ul className="space-y-0.5 text-xs text-muted-foreground">
                    {integ.dataScope.map((scope) => (
                      <li key={scope}>• {scope}</li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={integ.connected}
                  aria-label={`${integ.connected ? 'Disconnect' : 'Connect'} ${integ.name}`}
                  onClick={() => handleToggle(integ.id)}
                  className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    integ.connected ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      integ.connected ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'permissions' && (
        <div
          id="panel-permissions"
          role="tabpanel"
          aria-labelledby="tab-permissions"
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" aria-hidden="true" />
            <p className="font-semibold text-foreground">Signal permissions</p>
          </div>

          <p className="mb-4 text-sm text-muted-foreground">
            HeartMetrics reads work-system signals only. Private message content is never accessed.
          </p>

          <div className="flex flex-col gap-1">
            {[
              { key: 'meetingLoad', label: 'Meeting load and calendar density' },
              { key: 'taskAssignment', label: 'Task assignment and workload balance' },
              { key: 'publicRecognition', label: 'Public recognition and shout-outs' },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-2 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <input
                  type="checkbox"
                  checked={permissions[key as keyof typeof permissions]}
                  onChange={() =>
                    setPermissions((prev) => ({
                      ...prev,
                      [key]: !prev[key as keyof typeof permissions],
                    }))
                  }
                  className="h-4 w-4 shrink-0 accent-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
