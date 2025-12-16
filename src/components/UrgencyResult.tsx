import { motion } from 'framer-motion';
import { Phone, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEmergency } from '@/context/EmergencyContext';
import { urgencyConfig, ambulanceLabels } from '@/types/emergency';

interface UrgencyResultProps {
  onViewSummary: () => void;
}

export function UrgencyResult({ onViewSummary }: UrgencyResultProps) {
  const { result } = useEmergency();
  
  if (!result) return null;
  
  const config = urgencyConfig[result.urgencyLevel];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg mx-auto w-full text-center"
      >
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${config.className} rounded-2xl p-8 mb-8 shadow-lg`}
        >
          <span className="text-5xl mb-4 block">{config.icon}</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{config.label}</h1>
          <p className="text-lg opacity-90">{result.explanation}</p>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-6 mb-6 border border-border"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground mb-1">Recommended Action</h3>
              <p className="text-muted-foreground">{result.recommendation}</p>
            </div>
          </div>
        </motion.div>

        {/* Ambulance Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl p-6 mb-8 border border-border"
        >
          <h3 className="font-semibold text-foreground mb-2">Recommended Ambulance Type</h3>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium">
            {ambulanceLabels[result.ambulanceType]}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onViewSummary}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-xl"
          >
            View Dispatch Summary
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 rounded-xl border-2"
            asChild
          >
            <a href="tel:911">
              <Phone className="mr-2 h-5 w-5" />
              Call Emergency Services
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
