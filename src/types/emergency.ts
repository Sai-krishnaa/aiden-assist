export type IncidentType = 'accident' | 'collapse' | 'breathing' | 'bleeding' | 'other';
export type ConsciousStatus = 'yes' | 'no' | 'unsure';
export type AgeGroup = 'child' | 'adult' | 'elderly';
export type UrgencyLevel = 'emergency' | 'urgent' | 'non-emergency';
export type AmbulanceType = 'basic' | 'cardiac' | 'trauma';

export interface EmergencyData {
  incidentType: IncidentType | null;
  isConscious: ConsciousStatus | null;
  ageGroup: AgeGroup | null;
  location: string;
}

export interface AssessmentResult {
  urgencyLevel: UrgencyLevel;
  explanation: string;
  recommendation: string;
  ambulanceType: AmbulanceType;
}

export const incidentLabels: Record<IncidentType, string> = {
  accident: 'Accident',
  collapse: 'Sudden collapse',
  breathing: 'Breathing problem',
  bleeding: 'Severe bleeding',
  other: 'Other',
};

export const consciousLabels: Record<ConsciousStatus, string> = {
  yes: 'Yes',
  no: 'No',
  unsure: 'Not sure',
};

export const ageLabels: Record<AgeGroup, string> = {
  child: 'Child (0-17)',
  adult: 'Adult (18-64)',
  elderly: 'Elderly (65+)',
};

export const ambulanceLabels: Record<AmbulanceType, string> = {
  basic: 'Basic Life Support',
  cardiac: 'Cardiac Life Support',
  trauma: 'Trauma Ambulance',
};

export const urgencyConfig: Record<UrgencyLevel, { label: string; icon: string; className: string }> = {
  emergency: {
    label: 'Emergency',
    icon: '🚨',
    className: 'bg-emergency text-emergency-foreground',
  },
  urgent: {
    label: 'Urgent',
    icon: '⚠️',
    className: 'bg-urgent text-urgent-foreground',
  },
  'non-emergency': {
    label: 'Non-Emergency',
    icon: '🏠',
    className: 'bg-safe text-safe-foreground',
  },
};
