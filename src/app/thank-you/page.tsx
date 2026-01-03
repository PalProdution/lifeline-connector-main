import Link from 'next/link';
import { CheckCircle, Heart, Droplets, Home } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative px-4 py-8 max-w-lg mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="w-14 h-14 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            You're now a registered blood donor
          </p>
          <p className="text-slate-500">
            Your generosity can save up to 3 lives with a single donation.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-red-500" />
            <span className="text-lg font-semibold text-slate-900">What happens next?</span>
          </div>
          <ul className="text-left space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-red-600">1</span>
              <span>Blood seekers in your area can now find you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-red-600">2</span>
              <span>They'll contact you via WhatsApp in emergencies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-red-600">3</span>
              <span>You decide if you're available to donate</span>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="mt-12 flex items-center justify-center gap-2">
          <Droplets className="w-5 h-5 text-red-500" />
          <span className="text-sm text-slate-500">LifeLine - Connecting donors with those in need</span>
        </div>
      </div>
    </main>
  );
}
