'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useStudyStore } from '@/store/useStudyStore';
import { SnackbarNavigation } from './SnackbarNavigation';
import { Dashboard } from './Dashboard';
import { DailyStudyEntry } from './DailyStudyEntry';
import { WeeklyRoutineSection } from './WeeklyRoutine';
import { MockTracker } from './MockTracker';
import { Analytics } from './Analytics';
import { ErrorLog } from './ErrorLog';
import { BackupRestore } from './BackupRestore';

export const MainLayout: React.FC = () => {
  const currentSection = useStudyStore((state) => state.currentSection);
  const isDarkMode = useStudyStore((state) => state.isDarkMode);
  const setDarkMode = useStudyStore((state) => state.setDarkMode);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('jee-study-tracker-dark-mode');
      if (savedDarkMode !== null) {
        const isDark = JSON.parse(savedDarkMode);
        setDarkMode(isDark);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    }
  }, [setDarkMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jee-study-tracker-dark-mode', JSON.stringify(isDarkMode));
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'study':
        return <DailyStudyEntry />;
      case 'routine':
        return <WeeklyRoutineSection />;
      case 'mock':
        return <MockTracker />;
      case 'analytics':
        return <Analytics />;
      case 'error':
        return <ErrorLog />;
      case 'backup':
        return <BackupRestore />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Background Decorations */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <motion.div
          className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.h1
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              📚 JEE Study Tracker
            </motion.h1>

            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="text-yellow-500" size={24} />
              ) : (
                <Moon className="text-gray-700" size={24} />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="relative z-20 max-w-7xl mx-auto pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Snackbar Navigation */}
        <SnackbarNavigation />
      </div>
    </div>
  );
};
