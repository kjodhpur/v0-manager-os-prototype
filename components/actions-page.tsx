'use client';

import { CheckCircle2, AlertCircle, ArrowDown } from 'lucide-react';
import { useState } from 'react';

export function ActionsPage() {
  const initialActions = [
    {
      id: 1,
      title: 'Schedule urgent 1:1 with Riya S.',
      description: 'Address declining WWI and workload concerns',
      assignee: 'You',
      dueDate: 'Today',
      priority: 'urgent',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Review Sam J. workload distribution',
      description: 'Redistribute tasks to improve balance',
      assignee: 'You',
      dueDate: 'Tomorrow',
      priority: 'high',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Conduct recognition review',
      description: 'Identify employees with low recognition',
      assignee: 'You',
      dueDate: 'This week',
      priority: 'high',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Growth opportunity assignment',
      description: 'Assign stretch work to high performers',
      assignee: 'You',
      dueDate: 'Next week',
      priority: 'medium',
      status: 'pending',
    },
    {
      id: 5,
      title: 'Team engagement survey',
      description: 'Send pulse survey on team connection',
      assignee: 'You',
      dueDate: 'Next week',
      priority: 'medium',
      status: 'pending',
    },
  ];

  const [actions, setActions] = useState(initialActions);

  const handleSnooze = (id: number) => {
    setActions((prev) => {
      const actionIndex = prev.findIndex((a) => a.id === id);
      if (actionIndex === -1) return prev;

      const action = prev[actionIndex];
      const newActions = [...prev];
      newActions.splice(actionIndex, 1);
      newActions.push(action);
      return newActions;
    });
  };

  const handleComplete = (id: number) => {
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'done' } : a)));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="w-4 h-4" />;
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const activateActions = actions.filter((a) => a.status !== 'done');
  const completedActions = actions.filter((a) => a.status === 'done');

  return (
    <div className="w-full min-h-screen p-6 lg:p-12 overflow-x-hidden" style={{ backgroundColor: '#05050a' }}>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-white">Action Queue</h1>
        <p className="text-base text-gray-400">
          {activateActions.length} active {activateActions.length === 1 ? 'action' : 'actions'} prioritized by importance
        </p>
      </div>

      {/* Active Actions */}
      <div className="space-y-4 mb-12">
        {activateActions.length === 0 ? (
          <div
            className="rounded-lg p-8 text-center border border-gray-700"
            style={{ backgroundColor: '#0d0d14' }}
          >
            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-lg font-semibold text-white">All actions complete!</p>
            <p className="text-gray-400 text-sm mt-2">Check completed actions below</p>
          </div>
        ) : (
          activateActions.map((action) => (
            <div
              key={action.id}
              className="rounded-lg border border-gray-700 p-6 transition-all hover:border-gray-600"
              style={{ backgroundColor: '#0d0d14' }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Action Details */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`flex-shrink-0 mt-1 p-1 rounded ${getPriorityColor(action.priority)}`}>
                      {getPriorityIcon(action.priority)}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-white">{action.title}</p>
                      <p className="text-sm text-gray-400 mt-1">{action.description}</p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 mt-3 text-xs">
                    <span
                      className={`px-2 py-1 rounded border ${getPriorityColor(action.priority)}`}
                    >
                      {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)} Priority
                    </span>
                    <span className="text-gray-500">Due: {action.dueDate}</span>
                    <span className="text-gray-500">Assignee: {action.assignee}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 lg:flex-col lg:gap-2">
                  <button
                    onClick={() => handleComplete(action.id)}
                    className="flex-1 lg:flex-none px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50 font-medium text-sm transition-colors"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleSnooze(action.id)}
                    className="flex-1 lg:flex-none px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/50 font-medium text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <ArrowDown className="w-3 h-3" />
                    Snooze
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Completed Actions */}
      {completedActions.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Completed</h2>
          <div className="space-y-3">
            {completedActions.map((action) => (
              <div
                key={action.id}
                className="rounded-lg border border-gray-700/50 p-4 opacity-50"
                style={{ backgroundColor: '#0d0d14' }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-white line-through">{action.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
