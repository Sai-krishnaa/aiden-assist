import { Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Provider {
  id: string;
  name: string;
  type: 'Hospital' | 'NGO' | 'Private';
  distance: string;
  phone: string;
}
interface AmbulanceBookingProps {
  onBack: () => void;
  onConfirm: () => void;
}

const MOCK_PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'City Government Hospital',
    type: 'Hospital',
    distance: '2.1 km',
    phone: '108',
  },
  {
    id: '2',
    name: 'Red Cross Ambulance',
    type: 'NGO',
    distance: '3.4 km',
    phone: '18003001919',
  },
  {
    id: '3',
    name: 'LifeCare Emergency Services',
    type: 'Private',
    distance: '1.8 km',
    phone: '9876543210',
  },
];

export function AmbulanceBooking({ onBack, onConfirm }: AmbulanceBookingProps) 
{
  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">Nearby Ambulance Services</h1>
      <p className="text-muted-foreground mb-6">
        Select a provider to call directly
      </p>

      <div className="space-y-4">
        {MOCK_PROVIDERS.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-muted-foreground">
                {p.type} • {p.distance}
              </p>
            </div>

            <Button asChild>
              <a href={`tel:${p.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call
              </a>
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        className="mt-8"
        onClick={onBack}
      >
        ← Back
      </Button>
      
    </div>
  );
}
