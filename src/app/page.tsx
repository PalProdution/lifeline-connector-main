import Link from 'next/link';
import { Heart, Droplets, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-red-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative px-4 py-8 max-w-lg mx-auto">
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">LifeLine</span>
          </div>
        </nav>

        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Save Lives Today
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Find Blood Donors
            <br />
            <span className="text-red-600">in Seconds</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Connect with verified blood donors near you instantly. Every second counts in an emergency.
          </p>
        </section>

        <section className="space-y-4 mb-12">
          <Link
            href="/search"
            className="group flex items-center justify-between w-full h-20 px-6 bg-red-600 hover:bg-red-700 rounded-2xl text-white font-semibold text-lg transition-all shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <span>I Need Blood</span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/register"
            className="group flex items-center justify-between w-full h-20 px-6 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 font-semibold text-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <span>I Want to Donate</span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        <section className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">1,200+</p>
              <p className="text-slate-500 font-medium">Verified Donors</p>
            </div>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="w-12 h-12 mx-auto bg-red-100 rounded-xl flex items-center justify-center mb-2">
              <Droplets className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-sm font-medium text-slate-600">8 Blood Types</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-600">GPS Powered</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-xl flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-600">WhatsApp</p>
          </div>
        </section>

        <footer className="mt-12 text-center">
          <p className="text-sm text-slate-400">
            Made with <Heart className="inline w-4 h-4 text-red-500" /> for humanity
          </p>
        </footer>
      </div>
    </main>
  );
}
