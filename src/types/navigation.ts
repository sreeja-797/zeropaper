/**
 * Navigation Types for Zero-Paper App
 * Defines type-safe navigation parameters and routes
 */

export type RootStackParamList = {
  // Auth Flow
  Splash: undefined;
  RoleSelection: undefined;
  StudentLogin: undefined;
  StudentSignup: undefined;
  RecruiterLogin: undefined;
  RecruiterSignup: undefined;

  // Student Flow
  StudentBasicDetails: undefined;
  EducationDetails: undefined;
  SkillsInterests: undefined;
  ProjectsExperience: undefined;
  ResumeUpload: undefined;
  FinalProfileReview: undefined;
  QRCodeGeneration: undefined;

  // Recruiter Flow
  RecruiterDashboard: undefined;
  QRScanner: undefined;
  CandidateProfileView: {
    candidateId: string;
  };

  // Main App
  Home: undefined;
  Explore: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  RoleSelection: undefined;
  StudentLogin: undefined;
  StudentSignup: undefined;
  RecruiterLogin: undefined;
  RecruiterSignup: undefined;
};

export type StudentStackParamList = {
  StudentBasicDetails: undefined;
  EducationDetails: undefined;
  SkillsInterests: undefined;
  ProjectsExperience: undefined;
  ResumeUpload: undefined;
  FinalProfileReview: undefined;
  QRCodeGeneration: undefined;
};

export type RecruiterStackParamList = {
  RecruiterDashboard: undefined;
  QRScanner: undefined;
  CandidateProfileView: {
    candidateId: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> = {
  navigate: (screen: T, params?: RootStackParamList[T]) => void;
  goBack: () => void;
  replace: (screen: T, params?: RootStackParamList[T]) => void;
  reset: (state: { index: number; routes: { name: T }[] }) => void;
};

export type AuthNavigationProp = NavigationProp<keyof AuthStackParamList>;
export type StudentNavigationProp = NavigationProp<keyof StudentStackParamList>;
export type RecruiterNavigationProp = NavigationProp<keyof RecruiterStackParamList>;
export type MainTabNavigationProp = NavigationProp<keyof MainTabParamList>;

// Route names constants
export const ROUTES = {
  // Auth
  SPLASH: 'Splash',
  ROLE_SELECTION: 'RoleSelection',
  STUDENT_LOGIN: 'StudentLogin',
  STUDENT_SIGNUP: 'StudentSignup',
  RECRUITER_LOGIN: 'RecruiterLogin',
  RECRUITER_SIGNUP: 'RecruiterSignup',

  // Student
  STUDENT_BASIC_DETAILS: 'StudentBasicDetails',
  EDUCATION_DETAILS: 'EducationDetails',
  SKILLS_INTERESTS: 'SkillsInterests',
  PROJECTS_EXPERIENCE: 'ProjectsExperience',
  RESUME_UPLOAD: 'ResumeUpload',
  FINAL_PROFILE_REVIEW: 'FinalProfileReview',
  QR_CODE_GENERATION: 'QRCodeGeneration',

  // Recruiter
  RECRUITER_DASHBOARD: 'RecruiterDashboard',
  QR_SCANNER: 'QRScanner',
  CANDIDATE_PROFILE_VIEW: 'CandidateProfileView',

  // Main
  HOME: 'Home',
  EXPLORE: 'Explore',
} as const;
