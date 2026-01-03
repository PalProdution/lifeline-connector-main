import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDonor extends Document {
  name: string;
  phone: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  lastDonated?: Date;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DonorSchema = new Schema<IDonor>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^\d{10}$/.test(v);
        },
        message: 'Phone number must be a valid 10-digit number',
      },
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    lastDonated: {
      type: Date,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

DonorSchema.index({ location: '2dsphere' });

const Donor: Model<IDonor> =
  mongoose.models.Donor || mongoose.model<IDonor>('Donor', DonorSchema);

export default Donor;
