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
  },

  /**
   * Onboarding flow routes
   */
  onboarding: {
    start: () => `/onboarding/start`,
    general: () => `/onboarding/general`,
    expertise: () => `/onboarding/expertise`,
    interests: () => `/onboarding/interests`,
    preferences: () => `/onboarding/preferences`,
  },

  /**
   * User dashboard routes
   */
  dashboard: {
    home: () => `/dashboard/home`,
    suggestions: () => `/dashboard/suggestions`,
    schedule: () => `/dashboard/schedule`,
    mentorships: () => `/dashboard/mentorships`,
    notifications: () => `/dashboard/notifications`,
    profile: () => `/dashboard/profile`,
    settings: () => `/dashboard/settings`,
  },

  /**
   * Mentorship matching routes
   * @param suggestionId - Unique identifier for the mentor/mentee suggestion
   */
  matching: {
    suggestions: () => `/matching/suggestions`,
    accept: (suggestionId: string) => `/matching/accept/${suggestionId}`,
    decline: (suggestionId: string) => `/matching/decline/${suggestionId}`,
  },

  /**
   * Active mentorship management routes
   * @param mentorshipId - Unique identifier for the mentorship
   */
  mentorship: {
    details: (mentorshipId: string) => `/mentorship/${mentorshipId}`,
    messaging: (mentorshipId: string) => `/mentorship/${mentorshipId}/chat`,
    goals: (mentorshipId: string) => `/mentorship/${mentorshipId}/goals`,
    status: (mentorshipId: string) => `/mentorship/${mentorshipId}/status`,
  },

  /**
   * Admin routes
   */
  admin: {
    users: '/admin/users',
    settings: '/admin/settings',
  },
};
