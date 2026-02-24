'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  FileText, 
  Settings,
  Home
} from 'lucide-react';
import { useStudyStore } from '@/store/useStudyStore';
import { Section } from '@/types';
import { cn } from '@/utils/cn';

const NAVIGATION_ITEMS: Array<{
  id: Section;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={24} /> },
  { id: 'study', label: 'Study Entry', icon: <BookOpen size={24} /> },
  { id: 'routine', label: 'Routine', icon: <Calendar size={24} /> },
  { id: 'mock', label: 'Mocks', icon: <BarChart3 size={24} /> },
  { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={24} /> },
  { id: 'error', label: 'Error Log', icon: <FileText size={24} /> },
  { id: 'backup', label: 'Backup', icon: <Settings size={24} /> },
];

export const SnackbarNavigation: React.FC = () => {
  const currentSection = useStudyStore((state) => state.currentSection);
  const setCurrentSection = useStudyStore((state) => state.setCurrentSection);

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="glass-effect overflow-hidden rounded-full shadow-2xl border border-white/20 dark:border-white/10">
        <div className="flex items-center gap-1 p-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = currentSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={cn(
                    'relative p-3 rounded-full transition-all duration-300 flex items-center justify-center',
                    isActive
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={item.label}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.icon}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
