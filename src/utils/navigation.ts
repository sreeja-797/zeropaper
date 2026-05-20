import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/types/navigation';

/**
 * Navigation helper utilities for consistent navigation across the app
 */

export const useNavigation = () => {
  const router = useRouter();
  const { login, logout } = useAuth();

  return {
    // Auth navigation
    navigateToSplash: () => router.push(ROUTES.SPLASH),
    navigateToRoleSelection: () => router.push(ROUTES.ROLE_SELECTION),
    navigateToStudentLogin: () => router.push(ROUTES.STUDENT_LOGIN),
    navigateToStudentSignup: () => router.push(ROUTES.STUDENT_SIGNUP),
    navigateToRecruiterLogin: () => router.push(ROUTES.RECRUITER_LOGIN),
    navigateToRecruiterSignup: () => router.push(ROUTES.RECRUITER_SIGNUP),

    // Student navigation
    navigateToStudentBasicDetails: () => router.push(ROUTES.STUDENT_BASIC_DETAILS),
    navigateToEducationDetails: () => router.push(ROUTES.EDUCATION_DETAILS),
    navigateToSkillsInterests: () => router.push(ROUTES.SKILLS_INTERESTS),
    navigateToProjectsExperience: () => router.push(ROUTES.PROJECTS_EXPERIENCE),
    navigateToResumeUpload: () => router.push(ROUTES.RESUME_UPLOAD),
    navigateToFinalProfileReview: () => router.push(ROUTES.FINAL_PROFILE_REVIEW),
    navigateToQRCodeGeneration: () => router.push(ROUTES.QR_CODE_GENERATION),

    // Recruiter navigation
    navigateToRecruiterDashboard: () => router.push(ROUTES.RECRUITER_DASHBOARD),
    navigateToQRScanner: () => router.push(ROUTES.QR_SCANNER),
    navigateToCandidateProfile: (candidateId: string) =>
      router.push(`${ROUTES.CANDIDATE_PROFILE_VIEW}?candidateId=${candidateId}`),

    // Auth actions
    loginAsStudent: async (userData: { id: string; email: string; name?: string }) => {
      await login({ ...userData, role: 'student' });
      router.replace(ROUTES.STUDENT_BASIC_DETAILS);
    },
    loginAsRecruiter: async (userData: { id: string; email: string; name?: string }) => {
      await login({ ...userData, role: 'recruiter' });
      router.replace(ROUTES.RECRUITER_DASHBOARD);
    },
    logout: async () => {
      await logout();
      router.replace(ROUTES.SPLASH);
    },

    // Generic navigation
    goBack: () => router.back(),
    replace: (href: string) => router.replace(href),
  };
};

/**
 * Custom hook for screen-specific navigation helpers
 */
export const useStudentNavigation = () => {
  const nav = useNavigation();

  return {
    ...nav,
    nextStep: (currentStep: string) => {
      const steps = [
        ROUTES.STUDENT_BASIC_DETAILS,
        ROUTES.EDUCATION_DETAILS,
        ROUTES.SKILLS_INTERESTS,
        ROUTES.PROJECTS_EXPERIENCE,
        ROUTES.RESUME_UPLOAD,
        ROUTES.FINAL_PROFILE_REVIEW,
        ROUTES.QR_CODE_GENERATION,
      ];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        nav.replace(steps[currentIndex + 1]);
      }
    },
    previousStep: (currentStep: string) => {
      const steps = [
        ROUTES.STUDENT_BASIC_DETAILS,
        ROUTES.EDUCATION_DETAILS,
        ROUTES.SKILLS_INTERESTS,
        ROUTES.PROJECTS_EXPERIENCE,
        ROUTES.RESUME_UPLOAD,
        ROUTES.FINAL_PROFILE_REVIEW,
        ROUTES.QR_CODE_GENERATION,
      ];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex > 0) {
        nav.replace(steps[currentIndex - 1]);
      }
    },
  };
};

/**
 * Custom hook for recruiter-specific navigation helpers
 */
export const useRecruiterNavigation = () => {
  const nav = useNavigation();

  return {
    ...nav,
    scanAndNavigate: () => {
      nav.navigateToQRScanner();
    },
    viewCandidate: (candidateId: string) => {
      nav.navigateToCandidateProfile(candidateId);
    },
  };
};
