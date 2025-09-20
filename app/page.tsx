'use client';

import { useState } from 'react';
import { BaseShell } from '../components/BaseShell';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { Dashboard } from '../components/Dashboard';
import { GroupsView } from '../components/GroupsView';
import { ActivitiesView } from '../components/ActivitiesView';
import { AICompanionView } from '../components/AICompanionView';
import { SkillsView } from '../components/SkillsView';

export type ViewType = 'welcome' | 'dashboard' | 'groups' | 'activities' | 'ai' | 'skills';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('welcome');
  const [user, setUser] = useState<any>(null);

  const handleConnect = (userData: any) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomeScreen onConnect={handleConnect} />;
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setCurrentView} />;
      case 'groups':
        return <GroupsView user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'activities':
        return <ActivitiesView user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'ai':
        return <AICompanionView user={user} onBack={() => setCurrentView('dashboard')} />;
      case 'skills':
        return <SkillsView user={user} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <WelcomeScreen onConnect={handleConnect} />;
    }
  };

  return (
    <BaseShell>
      {renderView()}
    </BaseShell>
  );
}
