import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStartAssessment: () => void;
}

export function Hero({ onStartAssessment }: HeroProps) {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-gentle" />
            Emergency Assistance
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Get help fast during a medical emergency
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
          Answer a few quick questions to help emergency responders act faster.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onStartAssessment}
            size="lg"
            className="bg-emergency hover:bg-emergency/90 text-emergency-foreground text-lg px-8 py-6 rounded-xl shadow-lg shadow-emergency/20 transition-all hover:shadow-xl hover:shadow-emergency/30"
          >
            Start Emergency Assessment
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
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 flex items-center gap-8 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">1</span>
          </div>
          <span>Quick Questions</span>
        </div>
        <div className="w-8 h-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">2</span>
          </div>
          <span>Urgency Assessment</span>
        </div>
        <div className="w-8 h-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">3</span>
          </div>
          <span>Get Help</span>
        </div>
      </motion.div>
    </section>
  );
}
