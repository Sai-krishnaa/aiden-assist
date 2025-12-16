import { motion } from 'framer-motion';
import { Phone, Heart, Hand, Headphones, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WaitingGuidanceProps {
  onStartOver: () => void;
}

export function WaitingGuidance({ onStartOver }: WaitingGuidanceProps) {
  const tips = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Stay Calm",
      description: "Take slow, deep breaths. Your calm presence helps the patient."
    },
    {
      icon: <Hand className="h-6 w-6" />,
      title: "Keep Patient Still",
      description: "Unless there's immediate danger, avoid moving the patient."
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Follow Instructions",
      description: "If you called emergency services, follow their guidance."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Phone className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            While Help Is On The Way
          </h1>
          <p className="text-muted-foreground">
            Here are some things you can do while waiting
          </p>
        </div>

        {/* Tips */}
        <div className="space-y-4 mb-10">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="bg-card rounded-xl p-6 border border-border flex items-start gap-4"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                {tip.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{tip.title}</h3>
                <p className="text-muted-foreground text-sm">{tip.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-muted rounded-xl p-6 mb-8 text-center"
        >
          <p className="text-muted-foreground text-sm">
            This guidance is general in nature. Always follow specific instructions 
            from emergency services operators when available.
          </p>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-emergency hover:bg-emergency/90 text-emergency-foreground py-6 rounded-xl"
            asChild
          >
            <a href="tel:911">
              <Phone className="mr-2 h-5 w-5" />
              Call Emergency Services
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onStartOver}
            className="py-6 rounded-xl border-2"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Start Over
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
