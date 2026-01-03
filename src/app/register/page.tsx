'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Droplets, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LocationButton } from '@/components/LocationButton';
import { BloodGroupSelect } from '@/components/BloodGroupSelect';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLocationCaptured = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !bloodGroup || !location) {
      toast.error('Please fill all fields and capture your location');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          bloodGroup,
          latitude: location.lat,
          longitude: location.lng,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/thank-you');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-red-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative px-4 py-8 max-w-lg mx-auto">
        <nav className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">LifeLine</span>
          </div>
        </nav>

        <section className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Become a Donor
          </h1>
          <p className="text-slate-600">
            Join our community of heroes. Your blood can save lives.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold text-slate-700">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 text-base bg-slate-50 border-2 border-slate-200 focus:border-red-500 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold text-slate-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="h-14 text-base bg-slate-50 border-2 border-slate-200 focus:border-red-500 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold text-slate-700">
                Blood Group
              </Label>
              <BloodGroupSelect value={bloodGroup} onChange={setBloodGroup} />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold text-slate-700">
                Your Location
              </Label>
              <LocationButton onLocationCaptured={handleLocationCaptured} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !location}
            className="w-full h-16 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Registering...
              </>
            ) : (
              'Register as Donor'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          By registering, you agree to be contacted by blood seekers in emergencies.
        </p>
      </div>
    </main>
  );
}
