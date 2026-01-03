'use client';

import { MessageCircle, MapPin } from 'lucide-react';

interface DonorCardProps {
  name: string;
  phone: string;
  bloodGroup: string;
  distance: number;
}

export function DonorCard({ name, phone, bloodGroup, distance }: DonorCardProps) {
  const whatsappMessage = encodeURIComponent(
    `URGENT: Hello ${name}, we need ${bloodGroup} blood urgently. I found you on LifeLine. Can you help?`
  );
  const whatsappUrl = `https://wa.me/91${phone}?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900">{name}</h3>
          <div className="flex items-center text-slate-500 text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{distance} km away</span>
          </div>
        </div>
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-600 text-white">
          {bloodGroup}
        </span>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full h-12 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white font-semibold transition-colors"
      >
        <MessageCircle className="h-5 w-5 mr-2" />
        Chat on WhatsApp
      </a>
    </div>
  );
}
