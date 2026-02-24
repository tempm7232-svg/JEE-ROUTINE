/**
 * Core type definitions for JEE Study Tracking Application
 */

export interface DailyStudy {
  date: string;
  physics: number;
  maths: number;
  chemistry: number;
  recovery: number;
  revision: number;
  problemsSolved: number;
}

export interface WeeklyRoutine {
  [key: string]: {
    physics: number;
    maths: number;
    chemistry: number;
    recovery: number;
    revision: number;
  };
}

export interface MockScore {
  date: string;
  score: number; // out of 300
}

export interface ErrorLogEntry {
  id: string;
  date: string;
  content: string;
  timestamp: number;
}

export interface StudyData {
  dailyStudies: DailyStudy[];
  weeklyRoutine: WeeklyRoutine;
  mockScores: MockScore[];
  errorLogs: ErrorLogEntry[];
  lastUpdated: number;
}

export interface DashboardMetrics {
  todayHours: number;
  weeklyHours: number;
  monthlyHours: number;
  currentStreak: number;
  productivityRating: 'Low' | 'Strong' | 'Elite';
  weakestSubject: string;
  problemsSolvedThisWeek: number;
  hasSevenDayStreak: boolean;
  lowPerformanceDays: number;
}

export type Section = 'dashboard' | 'study' | 'routine' | 'mock' | 'analytics' | 'error' | 'backup';

export interface BackupData {
  version: string;
  exportDate: string;
  data: StudyData;
}
