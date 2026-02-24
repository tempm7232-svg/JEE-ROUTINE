'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, SaveIcon } from 'lucide-react';
import { useStudyStore } from '@/store/useStudyStore';
import { ErrorLogEntry } from '@/types';
import { useDebounce, useToast } from '@/hooks';
import { cn } from '@/utils/cn';
import { v4 as uuidv4 } from 'uuid';

export const ErrorLog: React.FC = () => {
  const { toast, showToast } = useToast();
  const addErrorLog = useStudyStore((state) => state.addErrorLog);
  const deleteErrorLog = useStudyStore((state) => state.deleteErrorLog);
  const errorLogs = useStudyStore((state) => state.data.errorLogs);

  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const debouncedContent = useDebounce(content, 1000);

  useEffect(() => {
    if (debouncedContent && debouncedContent.trim()) {
      // Auto-save functionality can be added here if needed
    }
  }, [debouncedContent]);

  const handleAddLog = () => {
    if (!content.trim()) {
      showToast('Please enter some content!', 'error');
      return;
    }

    const newEntry: ErrorLogEntry = {
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      content: content.trim(),
      timestamp: Date.now(),
    };

    addErrorLog(newEntry);
    setContent('');
    setSaved(true);
    showToast('Error log entry added!', 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDeleteLog = (id: string) => {
    deleteErrorLog(id);
    showToast('Entry deleted!', 'success');
  };

  const sortedLogs = [...errorLogs].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Error Log</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Track your mistakes and doubts</p>
      </div>

      {/* Add Log Section */}
      <motion.div
        className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Entry</h3>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe the error or doubt you encountered..."
          rows={5}
          className={cn(
            'w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600',
            'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
            'focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none',
            'resize-none font-medium'
          )}
        />

        <motion.button
          onClick={handleAddLog}
          className={cn(
            'w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2',
            'transition-all duration-300',
            saved
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
          )}
          whileHover={{ scale: saved ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {saved ? (
            <>
              <SaveIcon size={20} />
              Saved!
            </>
          ) : (
            <>
              <Plus size={20} />
              Save Entry
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Logs List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Entries</h3>

        {sortedLogs.length === 0 ? (
          <motion.div
            className="text-center py-12 text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm">No error logs yet. Start documenting!</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {sortedLogs.map((log, index) => (
              <motion.div
                key={log.id}
                className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 group hover:shadow-md transition-all"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-900 dark:text-red-200 mb-2">
                      {new Date(log.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-300 whitespace-pre-wrap break-words">
                      {log.content}
                    </p>
                  </div>

                  <motion.button
                    onClick={() => handleDeleteLog(log.id)}
                    className="flex-shrink-0 p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 opacity-0 group-hover:opacity-100 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {errorLogs.length > 0 && (
        <motion.div
          className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
            Total Entries: <span className="font-bold">{errorLogs.length}</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
