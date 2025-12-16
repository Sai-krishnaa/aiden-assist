import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Copy, Share2, Check, MapPin, User, AlertCircle, Ambulance, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEmergency } from '@/context/EmergencyContext';
import { 
  urgencyConfig, 
  ambulanceLabels, 
  incidentLabels, 
  consciousLabels, 
  ageLabels 
} from '@/types/emergency';
import { useToast } from '@/hooks/use-toast';

interface DispatchSummaryProps {
  onContinue: () => void;
}

export function DispatchSummary({ onContinue }: DispatchSummaryProps) {
  const { data, result } = useEmergency();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  if (!result || !data.incidentType || !data.isConscious || !data.ageGroup) return null;
  
  const config = urgencyConfig[result.urgencyLevel];

  const generateSummaryText = () => {
    return `EMERGENCY DISPATCH SUMMARY
---
Urgency: ${config.label}
Incident: ${incidentLabels[data.incidentType!]}
Age Group: ${ageLabels[data.ageGroup!]}
Conscious: ${consciousLabels[data.isConscious!]}
Location: ${data.location}
Ambulance: ${ambulanceLabels[result.ambulanceType]}

Note: Patient reported ${incidentLabels[data.incidentType!].toLowerCase()}. ${data.isConscious === 'no' ? 'Patient is not conscious.' : 'Patient is conscious.'} Prepare accordingly.

---
This summary is based on user-provided information and does not constitute medical diagnosis.`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateSummaryText());
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Summary has been copied successfully.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Emergency Dispatch Summary',
          text: generateSummaryText(),
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const preArrivalNote = `Patient reported ${incidentLabels[data.incidentType].toLowerCase()}. ${
    data.isConscious === 'no' 
      ? 'Patient is not conscious - prepare for immediate intervention.' 
      : data.isConscious === 'unsure'
      ? 'Consciousness status uncertain - standby for assessment.'
      : 'Patient is conscious and responsive.'
  } ${
    data.ageGroup === 'child' ? 'Pediatric patient.' : 
    data.ageGroup === 'elderly' ? 'Elderly patient - consider age-related factors.' : ''
  }`;

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto w-full"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
          Dispatch Summary
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Share this information with emergency services
        </p>

        {/* Summary Card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden mb-6">
          {/* Urgency Header */}
          <div className={`${config.className} p-4 flex items-center justify-center gap-3`}>
            <span className="text-2xl">{config.icon}</span>
            <span className="text-xl font-bold">{config.label}</span>
          </div>

          {/* Details Grid */}
          <div className="p-6 space-y-4">
            <SummaryRow
              icon={<AlertCircle className="h-5 w-5" />}
              label="Incident Type"
              value={incidentLabels[data.incidentType]}
            />
            <SummaryRow
              icon={<User className="h-5 w-5" />}
              label="Age Group"
              value={ageLabels[data.ageGroup]}
            />
            <SummaryRow
              icon={<AlertCircle className="h-5 w-5" />}
              label="Conscious"
              value={consciousLabels[data.isConscious]}
            />
            <SummaryRow
              icon={<MapPin className="h-5 w-5" />}
              label="Location"
              value={data.location}
            />
            <SummaryRow
              icon={<Ambulance className="h-5 w-5" />}
              label="Ambulance Type"
              value={ambulanceLabels[result.ambulanceType]}
              highlight
            />
          </div>

          {/* Hospital Note */}
          <div className="border-t border-border p-6 bg-muted/30">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Pre-Arrival Note</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {preArrivalNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <Button
            size="lg"
            className="bg-emergency hover:bg-emergency/90 text-emergency-foreground py-6 rounded-xl"
            asChild
          >
            <a href="tel:911">
              <Phone className="mr-2 h-5 w-5" />
              Call 911
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleCopy}
            className="py-6 rounded-xl border-2"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-5 w-5" />
                Copy Summary
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
            className="py-6 rounded-xl border-2"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>

        {/* Continue Button */}
        <div className="text-center mb-8">
          <Button
            variant="secondary"
            size="lg"
            onClick={onContinue}
            className="px-8 py-6 rounded-xl"
          >
            View Safety Tips While Waiting
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center max-w-md mx-auto">
          This tool does not provide medical diagnosis. Assessment is based on user-provided information only.
        </p>
      </motion.div>
    </div>
  );
}

interface SummaryRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function SummaryRow({ icon, label, value, highlight }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <span className={`font-medium ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </span>
    </div>
  );
}
