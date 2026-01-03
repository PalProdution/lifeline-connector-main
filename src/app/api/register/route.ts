import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Donor from '@/models/Donor';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, phone, bloodGroup, latitude, longitude } = body;

    if (!name || !phone || !bloodGroup || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: 'All fields are required including location coordinates' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Phone number must be a valid 10-digit number' },
        { status: 400 }
      );
    }

    const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validBloodGroups.includes(bloodGroup)) {
      return NextResponse.json(
        { error: 'Invalid blood group' },
        { status: 400 }
      );
    }

    const existingDonor = await Donor.findOne({ phone });
    if (existingDonor) {
      return NextResponse.json(
        { error: 'A donor with this phone number already exists' },
        { status: 409 }
      );
    }

    const donor = new Donor({
      name,
      phone,
      bloodGroup,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      isAvailable: true,
    });

    await donor.save();

    return NextResponse.json(
      { message: 'Donor registered successfully', donor },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
