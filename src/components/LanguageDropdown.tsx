import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Check } from 'lucide-react';

export type Language = 'es' | 'en' | 'fr' | 'de' | 'pt';

interface LanguageOption {
  code: Language;
  label: string;
}

const languages: LanguageOption[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'pt', label: 'PT' }
];

interface LanguageDropdownProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  currentLang,
  onLanguageChange
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xs hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-hidden transition-colors"
      >
        <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <span>{languages.find(l => l.code === currentLang)?.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-28 origin-top-right rounded-lg bg-white dark:bg-gray-800 p-1 shadow-md border border-gray-100 dark:border-gray-700"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    currentLang === lang.code
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{lang.label}</span>
                  {currentLang === lang.code && (
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
