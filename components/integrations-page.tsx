'use client';

import { Plug, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { useState } from 'react';

export function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    {
      id: 'jira',
      name: 'Jira',
      icon: 'Plug',
      connected: true,
      lastSync: '2 minutes ago',
      dataScope: ['Task status and assignees', 'Sprint data', 'Blockers', 'Cycle time'],
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: 'Plug',
      connected: true,
      lastSync: '5 minutes ago',
      dataScope: ['Team channels', 'Notification preferences', 'Direct messages'],
    },
    {
      id: 'hris',
      name: 'HRIS System',
      icon: 'Plug',
      connected: false,
      lastSync: null,
      dataScope: ['Employee directory', 'Org structure', 'Time off'],
    },
  ]);

  const [activeTab, setActiveTab] = useState('integrations');
  const [showPermissions, setShowPermissions] = useState(false);

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integ) =>
        integ.id === id
          ? { ...integ, connected: !integ.connected, lastSync: !integ.connected ? 'just now' : null }
          : integ
      )
    );
  };

  return (
    <div className="w-full min-h-screen p-6 lg:p-12 overflow-x-hidden" style={{ backgroundColor: '#05050a' }}>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-white flex items-center gap-3">
          <Plug className="w-10 h-10 text-blue-400" />
          Integrations
        </h1>
        <p className="text-base text-gray-400">Connect tools to HeartMetrics for better data insights</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('integrations')}
          className={`pb-4 px-4 font-medium transition-colors ${
            activeTab === 'integrations'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Integrations
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`pb-4 px-4 font-medium transition-colors ${
            activeTab === 'permissions'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Permissions
        </button>
      </div>

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          {integrations.map((integ) => (
            <div
              key={integ.id}
              className="rounded-lg border border-gray-700 p-6"
              style={{ backgroundColor: '#0d0d14' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Plug className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{integ.name}</h3>
                  </div>

                  {integ.connected && (
                    <div className="flex items-center gap-2 text-sm text-green-400 mb-3">
                      <CheckCircle2 className="w-4 h-4" />
                      Connected • Last sync: {integ.lastSync}
                    </div>
                  )}

                  <div className="text-xs text-gray-400 mt-2">
                    <p className="font-medium mb-2">Data Scope:</p>
                    <ul className="space-y-1">
                      {integ.dataScope.map((scope, idx) => (
                        <li key={idx}>• {scope}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(integ.id)}
                  className={`ml-4 flex-shrink-0 relative inline-flex h-8 w-14 rounded-full transition-colors ${
                    integ.connected ? 'bg-green-600' : 'bg-gray-700'
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

      {/* Permissions Tab */}
      {activeTab === 'permissions' && (
        <div>
          <div className="mb-8 p-6 rounded-lg border border-blue-500/30 bg-blue-500/10" style={{ backgroundColor: '#0d0d14' }}>
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Data Privacy & Controls</h3>
                <p className="text-sm text-gray-400">Manage what data HeartMetrics can access and how it's used</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Privacy Permissions */}
            <div className="rounded-lg border border-gray-700 p-6" style={{ backgroundColor: '#0d0d14' }}>
              <h4 className="text-lg font-semibold text-white mb-4">Privacy Permissions</h4>
              <div className="space-y-3">
                <label className="flex items-center p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-900/50 transition-colors">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="ml-3 text-sm text-gray-300">Allow email analysis for recognition patterns</span>
                </label>
                <label className="flex items-center p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-900/50 transition-colors">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="ml-3 text-sm text-gray-300">Allow meeting analysis for workload metrics</span>
                </label>
                <label className="flex items-center p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-900/50 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="ml-3 text-sm text-gray-300">Allow Slack channel monitoring</span>
                </label>
              </div>
            </div>

            {/* Data Controls */}
            <div className="rounded-lg border border-gray-700 p-6" style={{ backgroundColor: '#0d0d14' }}>
              <h4 className="text-lg font-semibold text-white mb-4">Data Controls</h4>
              <div className="space-y-3">
                <label className="flex items-center p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-900/50 transition-colors">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="ml-3 text-sm text-gray-300">Anonymize personal data in reports</span>
                </label>
                <label className="flex items-center p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-900/50 transition-colors">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="ml-3 text-sm text-gray-300">Exclude contractors from analysis</span>
                </label>
                <label className="flex items-center p-3 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-900/50 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="ml-3 text-sm text-gray-300">Retain data for compliance audit trail</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
