'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BloodGroupSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export function BloodGroupSelect({
  value,
  onChange,
  placeholder = 'Select Blood Group',
}: BloodGroupSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-14 text-base bg-white border-2 border-slate-200 focus:border-red-500 rounded-xl">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {bloodGroups.map((group) => (
          <SelectItem key={group} value={group} className="text-base py-3">
            {group}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
