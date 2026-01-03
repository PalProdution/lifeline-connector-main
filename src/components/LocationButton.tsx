'use client';

import { useState } from 'react';
import { MapPin, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationButtonProps {
  onLocationCaptured: (lat: number, lng: number) => void;
}

export function LocationButton({ onLocationCaptured }: LocationButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMessage('Geolocation is not supported by your browser');
      return;
    }

    setStatus('loading');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationCaptured(latitude, longitude);
        setStatus('success');
      },
      (error) => {
        setStatus('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage('Location access denied. Please enable location services.');
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage('Location information unavailable.');
            break;
          case error.TIMEOUT:
            setErrorMessage('Location request timed out.');
            break;
          default:
            setErrorMessage('An unknown error occurred.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleGetLocation}
        disabled={status === 'loading'}
        className={`w-full h-14 text-base font-semibold transition-all ${
          status === 'success'
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-slate-800 hover:bg-slate-700'
        }`}
      >
        {status === 'loading' && (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Getting Location...
          </>
        )}
        {status === 'idle' && (
          <>
            <MapPin className="mr-2 h-5 w-5" />
            Use My Current Location
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle className="mr-2 h-5 w-5" />
            Location Secured
          </>
        )}
        {status === 'error' && (
          <>
            <MapPin className="mr-2 h-5 w-5" />
            Try Again
          </>
        )}
      </Button>
      {status === 'error' && (
        <p className="text-sm text-red-500 text-center">{errorMessage}</p>
      )}
    </div>
  );
}
