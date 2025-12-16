import { useNavigate } from 'react-router-dom';
import { UrgencyResult } from '@/components/UrgencyResult';

export function UrgencyResultWrapper() {
  const navigate = useNavigate();

  return (
    <UrgencyResult
      onViewSummary={() => navigate('/summary')}
      onBookAmbulance={() => navigate('/booking')}
    />
  );
}
