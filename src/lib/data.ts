import type { Patient } from "./types";
import { PlaceHolderImages } from "./placeholder-images";

export const patients: Patient[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    avatarUrl: PlaceHolderImages[0].imageUrl,
    age: 45,
    gender: "Male",
    bloodType: "A+",
    contact: "aarav.sharma@example.com",
    address: "123 MG Road, Bangalore, India",
    allopathicRecords: [
      {
        id: "allo-1",
        condition: "Hypertension",
        diagnosisDate: "2022-01-15",
        medications: [{ id: "med-1", name: "Amlodipine", dosage: "5mg daily" }],
        notes: "Blood pressure is moderately controlled.",
      },
      {
        id: "allo-2",
        condition: "Type 2 Diabetes",
        diagnosisDate: "2021-05-20",
        medications: [
          { id: "med-2", name: "Metformin", dosage: "500mg twice daily" },
        ],
        notes: "Fasting blood sugar levels are stable.",
      },
    ],
    ayushRecords: [
      {
        id: "ayush-1",
        dosha: "Pitta",
        diagnosis: "Agnimandya (digestive impairment)",
        treatment: "Panchakarma therapy suggested.",
        herbs: [{ id: "herb-1", name: "Triphala", form: "Powder" }],
        notes: "Patient reports bloating and indigestion.",
      },
    ],
  },
  {
    id: "2",
    name: "Priya Singh",
    avatarUrl: PlaceHolderImages[1].imageUrl,
    age: 34,
    gender: "Female",
    bloodType: "O-",
    contact: "priya.singh@example.com",
    address: "456 Park Street, Kolkata, India",
    allopathicRecords: [
      {
        id: "allo-3",
        condition: "Migraine",
        diagnosisDate: "2020-03-10",
        medications: [{ id: "med-3", name: "Sumatriptan", dosage: "as needed" }],
        notes: "Experiences aura with headaches.",
      },
    ],
    ayushRecords: [
      {
        id: "ayush-2",
        dosha: "Vata",
        diagnosis: "Shirashoola (headache)",
        treatment: "Shirodhara and Nasya recommended.",
        herbs: [
          { id: "herb-2", name: "Brahmi", form: "Tablet" },
          { id: "herb-3", name: "Ashwagandha", form: "Capsule" },
        ],
        notes: "Stress-induced headaches. Recommends lifestyle changes.",
      },
    ],
  },
  {
    id: "3",
    name: "Rohan Mehta",
    avatarUrl: PlaceHolderImages[2].imageUrl,
    age: 52,
    gender: "Male",
    bloodType: "B+",
    contact: "rohan.mehta@example.com",
    address: "789 Juhu Beach Road, Mumbai, India",
    allopathicRecords: [
      {
        id: "allo-4",
        condition: "Arthritis",
        diagnosisDate: "2019-11-01",
        medications: [
          { id: "med-4", name: "Ibuprofen", dosage: "200mg as needed for pain" },
        ],
        notes: "Joint stiffness, particularly in the mornings.",
      },
    ],
    ayushRecords: [
      {
        id: "ayush-3",
        dosha: "Kapha",
        diagnosis: "Sandhivata (Osteoarthritis)",
        treatment: "Abhyanga (oil massage) with Mahanarayan oil.",
        herbs: [{ id: "herb-4", name: "Guggulu", form: "Tablet" }],
        notes: "Focus on reducing joint inflammation and improving mobility.",
      },
    ],
  },
];
