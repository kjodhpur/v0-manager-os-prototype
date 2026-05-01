'use client';

import { Link2, CheckCircle2, Lock, RefreshCw, Download, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const initialIntegrations = [
  { id: 'jira',  name: 'Jira',        connected: true,  lastSync: '2 minutes ago', scope: ['Task status and assignees', 'Sprint data', 'Blockers', 'Cycle time'] },
  { id: 'slack', name: 'Slack',       connected: true,  lastSync: '5 minutes ago', scope: ['Team channels', 'Notification preferences'] },
  { id: 'hris',  name: 'HRIS System', connected: false, lastSync: null,            scope: ['Employee directory', 'Org structure', 'Time off'] },
];

const DEMO_CSV = `Name,WHI Score,Workload,Blocked Tasks,Meeting Hours,Recognition Events,Growth %
Riya S.,41,1.8x avg,3,12,0,23%
Sam J.,49,2.2x avg,0,18,2,31%
Diego P.,52,1.2x avg,0,9,3,28%
Olivia K.,71,0.9x avg,0,7,5,45%
Jordan M.,68,1.0x avg,0,8,4,52%
`;

type CheckboxState = Record<string, boolean>;

const INITIAL_CHECKBOXES: CheckboxState = {
  'Allow email analysis for recognition patterns': true,
  'Allow meeting analysis for workload metrics': true,
  'Allow Slack channel monitoring': false,
  'Anonymize personal data in reports': true,
  'Exclude contractors from analysis': true,
  'Retain data for compliance audit trail': false,
};

export function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [activeTab, setActiveTab] = useState<'integrations' | 'permissions'>('integrations');
  const [reconnecting, setReconnecting] = useState<Record<string, boolean>>({});
  const [exportOpen, setExportOpen] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>(INITIAL_CHECKBOXES);

  const toggle = (id: string) =>
    setIntegrations((prev) =>
      prev.map((i) => i.id === id ? { ...i, connected: !i.connected, lastSync: !i.connected ? 'just now' : null } : i)
    );

  const reconnect = (id: string) => {
    setReconnecting((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setReconnecting((prev) => ({ ...prev, [id]: false }));
      setIntegrations((prev) =>
        prev.map((i) => i.id === id ? { ...i, connected: true, lastSync: 'just now' } : i)
      );
    }, 2000);
  };

  const handleExport = () => {
    const blob = new Blob([DEMO_CSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'heartmetrics-team-export.csv';
    a.click();
    URL.revokeObjectURL(url);
    setExportDone(true);
    setTimeout(() => { setExportOpen(false); setExportDone(false); }, 2000);
  };

  const toggleCheckbox = (label: string) =>
    setCheckboxes((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="w-full min-h-screen bg-background p-6 lg:p-8 overflow-x-hidden">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <Link2 className="w-6 h-6" style={{ color: '#00B8A0' }} />
            Integrations
          </h1>
          <p className="text-sm text-muted-foreground">Connect tools to HeartMetrics for better data insights</p>
        </div>
        <button
          onClick={() => { setExportOpen(true); setExportDone(false); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
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
          {integrations.map((integ) => {
            const isReconnecting = reconnecting[integ.id];
            return (
              <div key={integ.id} className="rounded-[12px] border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(0,184,160,0.1)' }}>
                        <Link2 className="w-4 h-4" style={{ color: '#00B8A0' }} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{integ.name}</p>
                        {integ.connected && !isReconnecting && (
                          <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: '#5DD67A' }}>
                            <CheckCircle2 className="w-3 h-3" />
                            Connected · Last sync: {integ.lastSync}
                          </p>
                        )}
                        {isReconnecting && (
                          <p className="text-xs flex items-center gap-1 mt-0.5 text-muted-foreground">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            Reconnecting...
                          </p>
                        )}
                        {!integ.connected && !isReconnecting && (
                          <p className="text-xs text-muted-foreground mt-0.5">Not connected</p>
                        )}
                      </div>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-0.5 ml-11">
                      {integ.scope.map((s) => <li key={s}>· {s}</li>)}
                    </ul>
                    {integ.connected && !isReconnecting && (
                      <button
                        onClick={() => reconnect(integ.id)}
                        className="ml-11 mt-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reconnect
                      </button>
                    )}
                  </div>
                  {/* Toggle */}
                  <button
                    onClick={() => !isReconnecting && toggle(integ.id)}
                    className={`flex-shrink-0 relative inline-flex h-7 w-12 rounded-full transition-colors ${integ.connected ? 'bg-primary' : 'bg-border'} ${isReconnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-1 ${integ.connected ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            );
          })}
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
                <a href="/security" className="text-xs mt-2 inline-flex items-center gap-1 hover:underline" style={{ color: '#00B8A0' }}>
                  View Privacy Policy <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {[
            { title: 'Privacy permissions', items: [
              'Allow email analysis for recognition patterns',
              'Allow meeting analysis for workload metrics',
              'Allow Slack channel monitoring',
            ]},
            { title: 'Data controls', items: [
              'Anonymize personal data in reports',
              'Exclude contractors from analysis',
              'Retain data for compliance audit trail',
            ]},
          ].map((section) => (
            <div key={section.title} className="rounded-[12px] border border-border bg-card p-5">
              <p className="font-semibold text-foreground mb-4">{section.title}</p>
              <div className="space-y-2">
                {section.items.map((label) => (
                  <label key={label} className="flex items-center gap-3 p-3 rounded-[8px] border border-border cursor-pointer hover:bg-muted/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={checkboxes[label] ?? false}
                      onChange={() => toggleCheckbox(label)}
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-sm text-foreground">{label}</span>
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

      {/* Export CSV Modal */}
      {exportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-[16px] p-6 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-bold text-foreground">Export Demo Data</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Download team metrics as CSV</p>
              </div>
              <button onClick={() => setExportOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-[8px] border border-border bg-muted/30 p-3 mb-4 text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Includes:</p>
              <p>· WHI scores for all 5 team members</p>
              <p>· Workload, blocked tasks, meeting hours</p>
              <p>· Recognition events and growth percentages</p>
            </div>

            {exportDone ? (
              <div className="flex items-center gap-2 justify-center py-2 text-sm font-medium" style={{ color: '#5DD67A' }}>
                <CheckCircle2 className="w-4 h-4" />
                Download started!
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Download CSV
                </button>
                <button
                  onClick={() => setExportOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
