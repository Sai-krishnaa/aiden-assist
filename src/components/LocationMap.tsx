import { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface LocationMapProps {
  location: string;
  className?: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

export function LocationMap({ location, className = '' }: LocationMapProps) {
  const { t } = useLanguage();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Try to geocode the location using Nominatim (free, no API key needed)
  useEffect(() => {
    if (!location || location.trim().length < 3) {
      setCoordinates(null);
      return;
    }

    const geocodeLocation = async () => {
      setLoading(true);
      setError(false);
      
      try {
       const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(
    `${location}, India`
  )}`,
  {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'EmergencyAssist-MVP/1.0 (contact: dev@local)',
    },
  }
);

        
        if (!response.ok) throw new Error('Geocoding failed');
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(geocodeLocation, 500);
    return () => clearTimeout(debounce);
  }, [location]);

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(false);
          setLoading(false);
        },
        () => {
          setError(true);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  };

  // Generate OpenStreetMap embed URL
  const getMapUrl = () => {
    if (!coordinates) return '';
    const zoom = 15;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.01},${coordinates.lat - 0.01},${coordinates.lng + 0.01},${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat},${coordinates.lng}`;
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-border ${className}`}>
      {/* Header */}
      <div className="bg-muted/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm text-foreground">{t('summary.patientLocation')}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGetCurrentLocation}
          className="text-xs"
          aria-label="Get current location"
        >
          <Navigation className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Use Current</span>
        </Button>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative w-full h-40 sm:h-48 bg-muted"
        role="img"
        aria-label={`Map showing location: ${location}`}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-pulse flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Loading map...</span>
            </div>
          </div>
        )}
        
        {!loading && error && (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-4">
    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
    <p className="text-sm text-muted-foreground text-center">
      We couldn’t pinpoint this location
    </p>
    <p className="text-xs text-muted-foreground/70 mt-1 text-center">
      Try adding city name or use current location
    </p>
  </div>
)}

        
        {!loading && !error && coordinates && (
          <iframe
            src={getMapUrl()}
            className="w-full h-full border-0"
            title={`Map showing location: ${location}`}
            loading="lazy"
          />
        )}
        
        {!loading && !error && !coordinates && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-4">
            <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Enter a location to see map
            </p>
          </div>
        )}
      </div>

      {/* Location Text */}
      <div className="px-4 py-3 bg-card border-t border-border">
        <p className="text-sm text-muted-foreground truncate" title={location}>
          📍 {location || 'No location specified'}
        </p>
      </div>
    </div>
  );
}
