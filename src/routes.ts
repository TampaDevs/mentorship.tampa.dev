/**
 * Application route definitions
 */
export const routes = {
  /**
   * Public routes accessible without authentication
   */
  public: {
    landingPage: '/',
    about: '/about',
    faq: '/faq',
    contactUs: '/contact',
  },

  /**
   * Onboarding flow routes
   * @param onboardingId - Unique identifier for the onboarding session
   */
  onboarding: {
    start: (onboardingId: string) => `/onboarding/${onboardingId}/start`,
    expertise: (onboardingId: string) => `/onboarding/${onboardingId}/expertise`,
    interests: (onboardingId: string) => `/onboarding/${onboardingId}/interests`,
    preferences: (onboardingId: string) => `/onboarding/${onboardingId}/preferences`,
  },

  /**
   * User dashboard routes
   * @param userId - Unique identifier for the user
   */
  dashboard: {
    home: (userId: string) => `/dashboard/${userId}`,
    suggestions: (userId: string) => `/dashboard/${userId}/suggestions`,
    memberships: (userId: string) => `/dashboard/${userId}/mentorships`,
    notifications: (userId: string) => `/dashboard/${userId}/notifications`,
    profile: (userId: string) => `/dashboard/${userId}/profile`,
  },

  /**
   * Profile management routes
   * @param userId - Unique identifier for the user
   */
  profile: {
    personalDetails: (userId: string) => `/profile/${userId}/personal`,
    skills: (userId: string) => `/profile/${userId}/skills`,
    preferences: (userId: string) => `/profile/${userId}/preferences`,
    notifications: (userId: string) => `/profile/${userId}/notifications`,
  },

  /**
   * Mentorship matching routes
   * @param userId - Unique identifier for the user
   * @param suggestionId - Unique identifier for the mentor/mentee suggestion
   */
  matching: {
    suggestions: (userId: string) => `/matching/${userId}/suggestions`,
    accept: (userId: string, suggestionId: string) => `/matching/${userId}/accept/${suggestionId}`,
    decline: (userId: string, suggestionId: string) => `/matching/${userId}/decline/${suggestionId}`,
  },

  /**
   * Active mentorship management routes
   * @param userId - Unique identifier for the user
   * @param mentorshipId - Unique identifier for the mentorship
   */
  mentorship: {
    details: (userId: string, mentorshipId: string) => `/mentorship/${userId}/${mentorshipId}`,
    messaging: (userId: string, mentorshipId: string) => `/mentorship/${userId}/${mentorshipId}/chat`,
    goals: (userId: string, mentorshipId: string) => `/mentorship/${userId}/${mentorshipId}/goals`,
    status: (userId: string, mentorshipId: string) => `/mentorship/${userId}/${mentorshipId}/status`,
  },
};

