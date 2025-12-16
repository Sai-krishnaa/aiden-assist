import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmergency } from '@/context/EmergencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { LocationMap } from '@/components/LocationMap';
import {
  IncidentType,
  ConsciousStatus,
  AgeGroup,
} from '@/types/emergency';
import { AccessibilityAnnouncer } from '@/components/AccessibilityAnnouncer';

interface EmergencyFormProps {
  onComplete: () => void;
  onBack: () => void;
}

type Step = 'incident' | 'conscious' | 'age' | 'location';
const steps: Step[] = ['incident', 'conscious', 'age', 'location'];

export function EmergencyForm({ onComplete, onBack }: EmergencyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { data, updateData, calculateResult } = useEmergency();
  const { t } = useLanguage();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // audio-recording state
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const stepTitles: Record<Step, string> = {
    incident: t('form.whatHappened'),
    conscious: t('form.isConscious'),
    age: t('form.ageGroup'),
    location: t('form.location'),
  };

  const incidentOptions: { key: IncidentType; label: string }[] = [
    { key: 'accident', label: t('incident.accident') },
    { key: 'collapse', label: t('incident.collapse') },
    { key: 'breathing', label: t('incident.breathing') },
    { key: 'bleeding', label: t('incident.bleeding') },
    { key: 'other', label: t('incident.other') },
  ];

  const consciousOptions: {
  key: ConsciousStatus;
  title: string;
  description: string;
}[] = [
  {
    key: 'yes',
    title: t('conscious.yes'),
    description: t('conscious.yesDesc'), // Patient is awake and responsive
  },
  {
    key: 'no',
    title: t('conscious.no'),
    description: t('conscious.noDesc'), // Patient is unresponsive
  },
  {
    key: 'unsure',
    title: t('conscious.unsure'),
    description: t('conscious.unsureDesc'), // Unable to determine consciousness
  },
];


  const ageOptions: { key: AgeGroup; label: string }[] = [
    { key: 'child', label: t('age.child') },
    { key: 'adult', label: t('age.adult') },
    { key: 'elderly', label: t('age.elderly') },
  ];

  // Focus heading when step changes for screen readers
  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  // ---- Audio recording logic ----
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // [web:23][web:9]
      const mediaRecorder = new MediaRecorder(stream); // [web:36]
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data); // [web:30]
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // [web:30]
        const url = URL.createObjectURL(blob);
        updateData({ audioUrl: url });
        // stop tracks so mic icon disappears
        stream.getTracks().forEach(track => track.stop()); // [web:28][web:25]
      };

      mediaRecorder.start(); // [web:33]
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recording', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop(); // [web:33]
    }
    setIsRecording(false);
  };

  // ---- Image upload / capture ----
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file); // [web:24][web:26]
    updateData({ photoFile: file, photoPreviewUrl: previewUrl });
  };

  // ---- Validation: at least one incident detail ----
  const hasAnyIncidentDetail =
    data.incidentType !== null ||
    !!data.audioUrl ||
    !!data.photoFile ||
    data.description.trim().length > 0;

  const canProceed = () => {
    switch (step) {
      case 'incident':
        return hasAnyIncidentDetail;
      case 'conscious':
        return data.isConscious !== null;
      case 'age':
        return data.ageGroup !== null;
      case 'location':
        return data.location.trim().length > 0;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult();
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };
const fileInputRef = useRef<HTMLInputElement | null>(null);

  const renderIncidentStep = () => (
    <div className="space-y-6">
      {/* Quick options */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          {t('form.chooseAnyOne')}
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          role="radiogroup"
          aria-label={stepTitles.incident}
        >
          {incidentOptions.map(option => (
            <OptionButton
              key={option.key}
              selected={data.incidentType === option.key}
              onClick={() => updateData({ incidentType: option.key })}
              label={option.label}
            />
          ))}
        </div>
      </div>

      {/* Voice recording */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {t('form.voiceOptional')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? 'destructive' : 'outline'}
          >
            {isRecording ? t('form.stopRecording') : t('form.startRecording')}
          </Button>

          {data.audioUrl && (
            <audio
              controls
              src={data.audioUrl}
              className="w-full sm:flex-1"
            />
          )}
        </div>
      </div>

      {/* Photo upload / capture */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {t('form.photoOptional')}
        </p>
        <label className="block">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <Button
  type="button"
  variant="outline"
  className="w-full"
  onClick={() => fileInputRef.current?.click()}
>
  {t('form.uploadOrCapture')}
</Button>

        </label>
        {data.photoPreviewUrl && (
          <img
            src={data.photoPreviewUrl}
            alt={t('form.photoPreviewAlt')}
            className="mt-2 max-h-48 w-full object-contain rounded-lg border"
          />
        )}
      </div>

      {/* Text description */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {t('form.describeWhatHappened')}{' '}
          <span className="text-muted-foreground">
            ({t('form.optional')})
          </span>
        </label>
        <textarea
          value={data.description}
          onChange={e => updateData({ description: e.target.value })}
          rows={3}
          className="w-full rounded-lg border px-3 py-2 text-sm sm:text-base"
          placeholder={t('form.describePlaceholder')}
        />
      </div>

      {/* Helper text about requirement */}
      <p className="text-xs text-muted-foreground">
        {t('form.atLeastOneRequired')}
      </p>
    </div>
  );

  const renderOptions = () => {
    switch (step) {
      case 'incident':
        return renderIncidentStep();

      case 'conscious':
        return (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            role="radiogroup"
            aria-label={stepTitles[step]}
          >
            {consciousOptions.map(option => (
  <OptionButton
    key={option.key}
    selected={data.isConscious === option.key}
    onClick={() => updateData({ isConscious: option.key })}
    title={option.title}
    description={option.description}
  />
))}
          </div>
        );

      case 'age':
        return (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            role="radiogroup"
            aria-label={stepTitles[step]}
          >
            {ageOptions.map(option => (
              <OptionButton
                key={option.key}
                selected={data.ageGroup === option.key}
                onClick={() => updateData({ ageGroup: option.key })}
                label={option.label}
              />
            ))}
          </div>
        );

      case 'location':
  return (
    <div className="space-y-4">
      {/* Location input */}
      <div className="relative">
        <MapPin
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="text"
          placeholder={t('form.locationPlaceholder')}
          value={data.location}
          onChange={(e) => updateData({ location: e.target.value })}
          className="pl-12 py-5 sm:py-6 text-base sm:text-lg rounded-xl"
          autoFocus
          aria-label={t('form.location')}
        />
      </div>

      {/* OpenStreetMap preview */}
      <LocationMap
        location={data.location}
        className="mt-2"
      />

      <p className="text-xs text-muted-foreground">
        Enter an address or use current location to confirm on map
      </p>
    </div>
  );
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col px-4 py-6 sm:py-8">
      <AccessibilityAnnouncer
        message={t('a11y.progressAnnouncement', {
          current: currentStep + 1,
          total: steps.length,
        })}
      />

      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
            <span>
              {t('form.question')} {currentStep + 1} / {steps.length}
            </span>
            <span aria-hidden="true">{Math.round(progress)}%</span>
          </div>
          <div
            className="h-2 bg-muted rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress: ${Math.round(progress)}%`}
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-6 sm:mb-8 text-center focus:outline-none"
            >
              {stepTitles[step]}
            </h2>

            {renderOptions()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            onKeyDown={e => handleKeyDown(e, handleBack)}
            className="text-muted-foreground focus:ring-2 focus:ring-ring"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('form.back')}
          </Button>

          <Button
            onClick={handleNext}
            onKeyDown={e => handleKeyDown(e, handleNext)}
            disabled={!canProceed()}
            className="bg-primary hover:bg-primary/90 px-6 sm:px-8 focus:ring-2 focus:ring-ring"
          >
            {currentStep === steps.length - 1
              ? t('form.getAssessment')
              : t('form.continue')}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  label?: string;
  title?: string;
  description?: string;
}

function OptionButton({
  selected,
  onClick,
  label,
  title,
  description,
}: OptionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      className={`
        w-full p-4 sm:p-5 rounded-xl transition-all border-2 text-left
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        ${
          selected
            ? 'bg-primary/10 border-primary'
            : 'bg-card border-border hover:border-primary/50'
        }
      `}
    >
      {/* Title */}
      <p
        className={`font-semibold ${
          selected ? 'text-primary' : 'text-foreground'
        }`}
      >
        {title ?? label}
      </p>

      {/* Description */}
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </motion.button>
  );
}
