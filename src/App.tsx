import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { Navigation } from './components/Navigation';
import { SettingsModal } from './components/SettingsModal';
import { WorkerProfile } from './components/WorkerProfile';
import { AuthButtons } from './components/auth/AuthButtons';
import { WorkerJobsScreen } from './components/WorkerJobsScreen';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ChatBot } from './components/chatbot/ChatBot';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [currentScreen, setCurrentScreen] = useState('home');
  const [showSettings, setShowSettings] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWorkerProfile, setShowWorkerProfile] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentScreen('search');
  };

  const handleWorkerSelect = (worker: any) => {
    setSelectedWorker(worker);
    setShowWorkerProfile(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('home');
    setShowSettings(false);
  };

  const handleLogin = (userData: any) => {
    const userWithPhoto = {
      ...userData,
      image: userData.profilePhoto || userData.image || (
        userData.type === 'user'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
          : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
      )
    };
    setCurrentUser(userWithPhoto);
    if (userWithPhoto.type === 'worker') {
      setCurrentScreen('jobs');
    }
  };

  const handleReturnHome = () => {
    setCurrentScreen('home');
    setShowWorkerProfile(false);
    setSelectedWorker(null);
  };

  const renderScreen = () => {
    if (!currentUser) {
      return (
        <div className="min-h-screen geometric-background flex flex-col items-center justify-center p-4 relative">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="particle" />
          ))}
          
          <div className="text-center mb-8 relative z-10">
            <div className="shine mb-6">
              <h1 className="text-6xl font-bold text-white mb-4 animate-bounce-in">
                BuscaChamba!
              </h1>
            </div>
            <p className="text-2xl text-white/90">
              Encuentra los mejores servicios profesionales
            </p>
          </div>
          <div className="relative z-10">
            <AuthButtons onLogin={handleLogin} />
          </div>
        </div>
      );
    }

    if (currentUser.type === 'admin') {
      return <AdminDashboard onLogout={handleLogout} />;
    }

    if (currentUser.type === 'worker') {
      return <WorkerJobsScreen currentUser={currentUser} onLogout={handleLogout} />;
    }

    if (showWorkerProfile && selectedWorker) {
      return (
        <WorkerProfile
          worker={selectedWorker}
          onBack={() => setShowWorkerProfile(false)}
        />
      );
    }

    switch (currentScreen) {
      case 'search':
        return (
          <SearchScreen 
            searchQuery={searchQuery}
            onSearchUpdate={setSearchQuery}
            onWorkerSelect={handleWorkerSelect}
            onShowProfile={setShowWorkerProfile}
          />
        );
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return (
          <ProfileScreen
            currentUser={currentUser}
            onSettingsClick={() => setShowSettings(true)}
          />
        );
      default:
        return (
          <HomeScreen
            currentUser={currentUser}
            onSettingsClick={() => setShowSettings(true)}
            onScreenChange={setCurrentScreen}
            onSearch={handleSearch}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      
      {currentUser && currentUser.type !== 'worker' && currentUser.type !== 'admin' && (
        <>
          <Navigation
            currentScreen={currentScreen}
            onScreenChange={setCurrentScreen}
            notificationCount={notificationCount}
          />
          <ChatBot currentUser={currentUser} />
        </>
      )}

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;