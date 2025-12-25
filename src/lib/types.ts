export type Patient = {
  id: string;
  name: string;
  avatarUrl: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodType: string;
  contact: string;
  address: string;
  allopathicRecords: AllopathicRecord[];
  ayushRecords: AyushRecord[];
};

export type AllopathicRecord = {
  id: string;
  condition: string;
  diagnosisDate: string;
  medications: Medication[];
  notes: string;
};

export type AyushRecord = {
  id: string;
  dosha: "Vata" | "Pitta" | "Kapha";
  diagnosis: string;
  treatment: string;
  herbs: Herb[];
  notes: string;
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
};

export type Herb = {
  id: string;
  name: string;
  form: string;
};
