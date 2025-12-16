import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  EmergencyData, 
  AssessmentResult, 
  IncidentType, 
  ConsciousStatus, 
  AgeGroup,
  UrgencyLevel,
  AmbulanceType 
} from '@/types/emergency';

interface EmergencyContextType {
  data: EmergencyData;
  result: AssessmentResult | null;
  updateData: (updates: Partial<EmergencyData>) => void;
  calculateResult: () => void;
  resetAll: () => void;
}

const initialData: EmergencyData = {
  incidentType: null,
  isConscious: null,
  ageGroup: null,
  location: '',
  description: '',
  audioUrl: null,
  photoFile: null,
  photoPreviewUrl: null,
};

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

function determineUrgency(data: EmergencyData): { level: UrgencyLevel; ambulance: AmbulanceType } {
  const { incidentType, isConscious, ageGroup } = data;
  
  // High priority conditions
  if (isConscious === 'no') {
    if (incidentType === 'collapse') {
      return { level: 'emergency', ambulance: 'cardiac' };
    }
    return { level: 'emergency', ambulance: 'basic' };
  }
  
  if (incidentType === 'bleeding') {
    return { level: 'emergency', ambulance: 'trauma' };
  }
  
  if (incidentType === 'accident') {
    return { level: 'emergency', ambulance: 'trauma' };
  }
  
  if (incidentType === 'breathing') {
    if (ageGroup === 'elderly' || ageGroup === 'child') {
      return { level: 'emergency', ambulance: 'basic' };
    }
    return { level: 'urgent', ambulance: 'basic' };
  }
  
  if (incidentType === 'collapse' && isConscious === 'yes') {
    return { level: 'urgent', ambulance: 'cardiac' };
  }
  
  // Default for other/unknown
  if (ageGroup === 'elderly' || ageGroup === 'child') {
    return { level: 'urgent', ambulance: 'basic' };
  }
  
  return { level: 'non-emergency', ambulance: 'basic' };
}

function getExplanation(level: UrgencyLevel): string {
  switch (level) {
    case 'emergency':
      return 'Based on your answers, immediate professional help is recommended.';
    case 'urgent':
      return 'This situation requires prompt medical attention.';
    case 'non-emergency':
      return 'The situation appears stable but monitoring is advised.';
  }
}

function getRecommendation(level: UrgencyLevel): string {
  switch (level) {
    case 'emergency':
      return 'Call emergency services immediately';
    case 'urgent':
      return 'Seek medical attention as soon as possible';
    case 'non-emergency':
      return 'Consider visiting a healthcare provider';
  }
}

export function EmergencyProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<EmergencyData>(initialData);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const updateData = (updates: Partial<EmergencyData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const calculateResult = () => {
    const { level, ambulance } = determineUrgency(data);
    setResult({
      urgencyLevel: level,
      explanation: getExplanation(level),
      recommendation: getRecommendation(level),
      ambulanceType: ambulance,
    });
  };

  const resetAll = () => {
    setData(initialData);
    setResult(null);
  };

  return (
    <EmergencyContext.Provider value={{ data, result, updateData, calculateResult, resetAll }}>
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within EmergencyProvider');
  }
  return context;
}
