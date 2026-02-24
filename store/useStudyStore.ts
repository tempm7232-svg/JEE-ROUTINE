import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StudyData, DailyStudy, WeeklyRoutine, MockScore, ErrorLogEntry } from '@/types';

interface StudyStore {
  data: StudyData;
  currentSection: string;
  isDarkMode: boolean;

  // Daily Study Methods
  addDailyStudy: (study: DailyStudy) => void;
  getDailyStudyByDate: (date: string) => DailyStudy | undefined;
  updateDailyStudy: (study: DailyStudy) => void;

  // Routine Methods
  updateWeeklyRoutine: (routine: WeeklyRoutine) => void;
  getWeeklyRoutine: () => WeeklyRoutine;

  // Mock Methods
  addMockScore: (score: MockScore) => void;
  getMockScores: () => MockScore[];

  // Error Log Methods
  addErrorLog: (entry: ErrorLogEntry) => void;
  getErrorLogs: () => ErrorLogEntry[];
  deleteErrorLog: (id: string) => void;

  // Section Navigation
  setCurrentSection: (section: string) => void;

  // Theme
  setDarkMode: (isDark: boolean) => void;

  // Data Management
  exportData: () => string;
  importData: (jsonString: string) => boolean;
  resetAllData: () => void;
}

const initialData: StudyData = {
  dailyStudies: [],
  weeklyRoutine: {
    Monday: { physics: 3, maths: 3, chemistry: 2, recovery: 1, revision: 1 },
    Tuesday: { physics: 3, maths: 3, chemistry: 2, recovery: 1, revision: 1 },
    Wednesday: { physics: 3, maths: 3, chemistry: 2, recovery: 1, revision: 1 },
    Thursday: { physics: 3, maths: 3, chemistry: 2, recovery: 1, revision: 1 },
    Friday: { physics: 3, maths: 3, chemistry: 2, recovery: 1, revision: 1 },
    Saturday: { physics: 4, maths: 4, chemistry: 3, recovery: 1, revision: 2 },
    Sunday: { physics: 3, maths: 3, chemistry: 2, recovery: 1, revision: 2 },
  },
  mockScores: [],
  errorLogs: [],
  lastUpdated: Date.now(),
};

export const useStudyStore = create<StudyStore>()(
  persist(
    (set, get) => ({
      data: initialData,
      currentSection: 'dashboard',
      isDarkMode: false,

      addDailyStudy: (study: DailyStudy) => {
        set((state) => {
          const existingIndex = state.data.dailyStudies.findIndex(
            (s) => s.date === study.date
          );

          let updatedStudies;
          if (existingIndex >= 0) {
            updatedStudies = [...state.data.dailyStudies];
            updatedStudies[existingIndex] = study;
          } else {
            updatedStudies = [...state.data.dailyStudies, study];
          }

          return {
            data: {
              ...state.data,
              dailyStudies: updatedStudies,
              lastUpdated: Date.now(),
            },
          };
        });
      },

      getDailyStudyByDate: (date: string) => {
        const state = get();
        return state.data.dailyStudies.find((s) => s.date === date);
      },

      updateDailyStudy: (study: DailyStudy) => {
        get().addDailyStudy(study);
      },

      updateWeeklyRoutine: (routine: WeeklyRoutine) => {
        set((state) => ({
          data: {
            ...state.data,
            weeklyRoutine: routine,
            lastUpdated: Date.now(),
          },
        }));
      },

      getWeeklyRoutine: () => {
        return get().data.weeklyRoutine;
      },

      addMockScore: (score: MockScore) => {
        set((state) => ({
          data: {
            ...state.data,
            mockScores: [...state.data.mockScores, score],
            lastUpdated: Date.now(),
          },
        }));
      },

      getMockScores: () => {
        return get().data.mockScores;
      },

      addErrorLog: (entry: ErrorLogEntry) => {
        set((state) => ({
          data: {
            ...state.data,
            errorLogs: [...state.data.errorLogs, entry],
            lastUpdated: Date.now(),
          },
        }));
      },

      getErrorLogs: () => {
        return get().data.errorLogs;
      },

      deleteErrorLog: (id: string) => {
        set((state) => ({
          data: {
            ...state.data,
            errorLogs: state.data.errorLogs.filter((log) => log.id !== id),
            lastUpdated: Date.now(),
          },
        }));
      },

      setCurrentSection: (section: string) => {
        set({ currentSection: section });
      },

      setDarkMode: (isDark: boolean) => {
        set({ isDarkMode: isDark });
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      exportData: () => {
        const state = get();
        const backup = {
          version: '1.0.0',
          exportDate: new Date().toISOString(),
          data: state.data,
        };
        return JSON.stringify(backup, null, 2);
      },

      importData: (jsonString: string) => {
        try {
          const parsed = JSON.parse(jsonString);
          if (parsed.data && parsed.data.dailyStudies !== undefined) {
            set((state) => ({
              data: {
                ...parsed.data,
                lastUpdated: Date.now(),
              },
            }));
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      resetAllData: () => {
        set({
          data: initialData,
          currentSection: 'dashboard',
        });
      },
    }),
    {
      name: 'jee-study-tracker',
      version: 1,
    }
  )
);
