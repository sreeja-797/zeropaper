# Zero-Paper Navigation Architecture

## Overview
This document describes the navigation architecture for the Zero-Paper app using Expo Router (file-based routing).

## Directory Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication flow
│   │   ├── _layout.tsx      # Auth stack layout
│   │   ├── splash.tsx      # Splash screen
│   │   ├── role-selection.tsx
│   │   ├── student-login.tsx
│   │   ├── student-signup.tsx
│   │   ├── recruiter-login.tsx
│   │   └── recruiter-signup.tsx
│   ├── (student)/           # Student onboarding flow
│   │   ├── _layout.tsx      # Student stack layout
│   │   ├── basic-details.tsx
│   │   ├── education-details.tsx
│   │   ├── skills-interests.tsx
│   │   ├── projects-experience.tsx
│   │   ├── resume-upload.tsx
│   │   ├── final-review.tsx
│   │   └── qr-generation.tsx
│   ├── (recruiter)/         # Recruiter flow
│   │   ├── _layout.tsx      # Recruiter stack layout
│   │   ├── dashboard.tsx
│   │   ├── qr-scanner.tsx
│   │   └── candidate-profile.tsx
│   └── _layout.tsx          # Root layout with providers
├── context/
│   └── AuthContext.tsx      # Authentication state management
├── components/
│   └── NavigationGuard.tsx  # Route protection logic
├── types/
│   └── navigation.ts       # Navigation type definitions
└── utils/
    └── navigation.ts        # Navigation helper utilities
```

## Navigation Flows

### Authentication Flow
1. **Splash** → **Role Selection**
2. **Role Selection** → **Student Login** or **Recruiter Login**
3. **Login/Signup** → **Student Flow** or **Recruiter Flow** (based on role)

### Student Onboarding Flow
1. **Basic Details** → **Education Details**
2. **Education Details** → **Skills & Interests**
3. **Skills & Interests** → **Projects & Experience**
4. **Projects & Experience** → **Resume Upload**
5. **Resume Upload** → **Final Profile Review**
6. **Final Review** → **QR Code Generation**

### Recruiter Flow
1. **Dashboard** (main hub)
2. **QR Scanner** (scan student QR codes)
3. **Candidate Profile** (view scanned candidate details)

## Usage

### Basic Navigation
```typescript
import { useNavigation } from '@/hooks/useNavigation';

const MyScreen = () => {
  const nav = useNavigation();
  
  return (
    <Button onPress={() => nav.navigateToEducationDetails()}>
      Continue
    </Button>
  );
};
```

### Student Flow Navigation
```typescript
import { useStudentNavigation } from '@/hooks/useNavigation';

const EducationDetailsScreen = () => {
  const nav = useStudentNavigation();
  
  const handleContinue = () => {
    nav.nextStep(ROUTES.EDUCATION_DETAILS); // Automatically goes to next step
  };
  
  return <Button onPress={handleContinue}>Continue</Button>;
};
```

### Recruiter Flow Navigation
```typescript
import { useRecruiterNavigation } from '@/hooks/useNavigation';

const RecruiterDashboardScreen = () => {
  const nav = useRecruiterNavigation();
  
  const handleScan = () => {
    nav.scanAndNavigate();
  };
  
  return <Button onPress={handleScan}>Scan QR Code</Button>;
};
```

### Authentication
```typescript
import { useNavigation } from '@/hooks/useNavigation';

const LoginScreen = () => {
  const nav = useNavigation();
  
  const handleLogin = async () => {
    await nav.loginAsStudent({
      id: '123',
      email: 'student@example.com',
      name: 'John Doe'
    });
  };
  
  return <Button onPress={handleLogin}>Login</Button>;
};
```

## Route Protection

The `NavigationGuard` component automatically:
- Redirects unauthenticated users to splash screen
- Redirects authenticated users to appropriate flow based on role
- Prevents cross-role access (students can't access recruiter routes, etc.)

## Type Safety

All navigation is fully typed using TypeScript. See `src/types/navigation.ts` for complete type definitions.

## Expo Router Compatibility

This architecture uses Expo Router's file-based routing with route groups:
- `(auth)` - Authentication routes
- `(student)` - Student onboarding routes
- `(recruiter)` - Recruiter routes

Parentheses in folder names create route groups that don't affect the URL structure.
