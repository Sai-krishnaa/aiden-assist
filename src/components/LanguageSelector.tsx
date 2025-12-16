import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage, languages, Language } from '@/context/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger 
        className="w-auto min-w-[100px] sm:min-w-[140px] bg-card border-border focus:ring-primary"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border z-50">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="hidden sm:inline">{lang.nativeName}</span>
            <span className="sm:hidden">{lang.code.toUpperCase()}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
