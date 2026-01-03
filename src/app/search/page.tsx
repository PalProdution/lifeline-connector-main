'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Search, AlertCircle } from 'lucide-react';
import { LocationButton } from '@/components/LocationButton';
import { BloodGroupSelect } from '@/components/BloodGroupSelect';
import { DonorCard } from '@/components/DonorCard';
import { PulsingHeart } from '@/components/PulsingHeart';

interface Donor {
  _id: string;
  name: string;
  phone: string;
  bloodGroup: string;
  distance: number;
}

export default function SearchPage() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const handleLocationCaptured = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleSearch = async () => {
    if (!bloodGroup) {
      setError('Please select a blood group');
      return;
    }

    if (!location) {
      setError('Please capture your location first');
      return;
    }

    setError('');
    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/find-donors?lat=${location.lat}&lng=${location.lng}&bloodGroup=${bloodGroup}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setDonors(data.donors);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.');
      setDonors([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-red-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50" />
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
            Find Donors
          </h1>
          <p className="text-slate-600">
            Search for blood donors within 10km of your location.
          </p>
        </section>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 space-y-5 mb-6">
          <div className="space-y-2">
            <label className="text-base font-semibold text-slate-700">
              Blood Group Needed
            </label>
            <BloodGroupSelect value={bloodGroup} onChange={setBloodGroup} />
          </div>

          <div className="space-y-2">
            <label className="text-base font-semibold text-slate-700">
              Your Location
            </label>
            <LocationButton onLocationCaptured={handleLocationCaptured} />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full h-14 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search Donors
          </button>
        </div>

        {isSearching && <PulsingHeart />}

        {!isSearching && hasSearched && donors.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">
              Found {donors.length} donor{donors.length > 1 ? 's' : ''} near you
            </p>
            {donors.map((donor) => (
              <DonorCard
                key={donor._id}
                name={donor.name}
                phone={donor.phone}
                bloodGroup={donor.bloodGroup}
                distance={donor.distance}
              />
            ))}
          </div>
        )}

        {!isSearching && hasSearched && donors.length === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Donors Found</h3>
            <p className="text-slate-600">
              No {bloodGroup} donors found within 10km. Try a different blood group or check back later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
