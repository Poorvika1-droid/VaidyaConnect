# VaidyaConnect

A comprehensive healthcare platform that integrates AYUSH (traditional Indian medicine) and allopathic medicine systems, enabling seamless data interoperability and AI-powered decision support for healthcare providers.

## 🎯 Overview

VaidyaConnect bridges the gap between traditional AYUSH medicine and modern allopathic healthcare systems, providing a unified platform for patient management, treatment planning, and medical data interoperability. The platform leverages AI to provide intelligent insights, drug interaction checking, and personalized treatment recommendations.

## ✨ Key Features

### Core Functionality

- **Unified Patient Dashboard**: Comprehensive patient profiles displaying both AYUSH and allopathic medical records in an integrated view
- **AYUSH Terminology Translation**: AI-powered translation of AYUSH terms into standardized medical codes (ICD-11) for interoperability
- **Drug Interaction Checker**: Identifies potential interactions between AYUSH and allopathic medications to prevent adverse effects
- **AI-Driven Treatment Suggestions**: Personalized treatment recommendations based on integrated patient data from both medical systems
- **Disease Progression Prediction**: Predictive analytics using machine learning to forecast disease progression and health risks
- **Data Interoperability Layer**: Seamless data exchange between AYUSH and allopathic systems using standardized formats

### AI-Powered Tools

- **Personalized Treatment Suggestions**: Analyzes patient data from both systems to suggest optimal treatment plans
- **Predictive Analytics**: ML-based predictions for disease progression and potential health risks
- **Drug Interaction Analysis**: Real-time checking of medication interactions across both medical systems
- **Terminology Standardization**: Context-aware translation of AYUSH terminology to modern medical codes

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.9** - React framework with App Router
- **React 19.2.1** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - High-quality React components
- **Lucide React** - Icon library

### AI & Backend
- **Genkit** - AI orchestration framework
- **Google Gemini 2.5 Flash** - AI model for medical insights
- **Zod** - Schema validation
- **Firebase** - Backend services

### Development Tools
- **Turbopack** - Fast bundler for development
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google AI API key (for Genkit AI features)
- Firebase project (optional, for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd download
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:9002`

5. **Start Genkit AI server** (in a separate terminal)
   ```bash
   npm run genkit:dev
   ```

## 📜 Available Scripts

- `npm run dev` - Start Next.js development server on port 9002 with Turbopack
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with watch mode for hot reloading
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run typecheck` - Run TypeScript type checking

## 🚢 Deployment

We recommend deploying VaidyaConnect on **Vercel** (first-class support for Next.js):

1. Create a Vercel account and install the Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```
2. From the project root, login and link the project:
   ```bash
   vercel login
   vercel link
   ```
3. Deploy (production):
   ```bash
   vercel --prod
   ```

Alternatively, you can connect the Git repository to Vercel and enable automatic deploys on push to `main`.

Notes & tips:
- Ensure the `GOOGLE_GENAI_API_KEY` and any other secrets are set in Vercel's Environment Variables (Project Settings → Environment Variables).
- The project includes `vercel.json` to ensure the proper `buildCommand` and output directory.
- If you prefer Docker or another host, ask and I can add a Dockerfile and CI workflow.

## 📁 Project Structure

```
src/
├── ai/                          # AI flows and Genkit configuration
│   ├── flows/                   # AI-powered medical analysis flows
│   │   ├── identify-drug-interactions.ts
│   │   ├── predict-disease-progression.ts
│   │   ├── suggest-personalized-treatments.ts
│   │   └── translate-ayush-terminology.ts
│   ├── dev.ts                   # Genkit development entry point
│   └── genkit.ts                # Genkit AI configuration
├── app/                         # Next.js App Router pages
│   ├── patients/                # Patient management pages
│   │   └── [patientId]/         # Individual patient profile
│   ├── tools/                   # Medical tools and utilities
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (patient list)
├── components/                  # React components
│   ├── ui/                      # shadcn/ui components
│   ├── app-header.tsx          # Application header
│   ├── app-sidebar.tsx         # Navigation sidebar
│   └── logo.tsx                # Application logo
├── lib/                         # Utility functions and data
│   ├── actions.ts              # Server actions for AI flows
│   ├── data.ts                 # Sample patient data
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Utility functions
└── hooks/                       # Custom React hooks
```

## 🎨 Design System

The application follows a healthcare-focused design system:

- **Primary Color**: Soft blue (#64B5F6) - Trust and reliability
- **Background**: Light beige (#F5F5DC) - Natural healing aesthetic
- **Accent Color**: Green (#81C784) - Health and integration
- **Typography**: Inter font family for clarity and readability
- **Icons**: Lucide React for consistent, medical-friendly iconography

## 🔐 Environment Variables

Required environment variables:

- `GOOGLE_GENAI_API_KEY` - Google AI API key for Genkit integration

Optional:
- Firebase configuration variables (if using Firebase services)

## 🏥 Features in Detail

### Patient Management
- View comprehensive patient profiles with integrated AYUSH and allopathic records
- Access patient medical history, medications, and treatment plans
- Track conditions across both medical systems

### AI Decision Support
- **Treatment Suggestions**: Get AI-powered recommendations considering both medical systems
- **Disease Prediction**: Forecast potential health risks and disease progression
- **Drug Interactions**: Real-time analysis of medication compatibility
- **Terminology Translation**: Convert AYUSH terms to standardized medical codes

### Data Interoperability
- Unified view of patient data from multiple medical systems
- Standardized data formats for seamless information exchange
- Context-aware translation and mapping between medical terminologies

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

## 📄 License

Private project - All rights reserved

## 🔗 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)
- [shadcn/ui Components](https://ui.shadcn.com)

---

Built with ❤️ for integrated healthcare solutions
