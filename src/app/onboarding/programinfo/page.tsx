'use client';

import { useOnboardingStore } from '../onboarding-store';
import { useEffect, useState } from 'react';
import MentorForm from './mentorForm';
import MenteeForm from './menteeForm';

const OnboardingProgramInfoPage = () => {
  const { generalForm } = useOnboardingStore();
  const [userType, setUserType] = useState<null | 'mentor' | 'mentee' | 'both'>(null);
  const [mentorFormCompleted, setMentorFormCompleted] = useState(false);
  const [menteeFormCompleted, setMenteeFormCompleted] = useState(false);
  const [showMentorForm, setShowMentorForm] = useState(false);
  const [showMenteeForm, setShowMenteeForm] = useState(false);

  useEffect(() => {
    // Determine whether user wants to be a mentor, mentee, or both
    // used to determine what forms to show
    if (generalForm) {
      if (generalForm.userType.includes('mentee') && generalForm.userType.includes('mentor')) {
        setUserType('both');
      } else if (generalForm.userType.includes('mentee')) {
        setUserType('mentee');
      } else if (generalForm.userType.includes('mentor')) {
        setUserType('mentor');
      }
    }
  }, [generalForm]);

  useEffect(() => {
    if (userType === 'both') {
      console.log('yes');
      if (mentorFormCompleted && menteeFormCompleted) {
        // If both forms are completed
        window.location.replace('/onboarding/preferences');
      } else if (mentorFormCompleted) {
        // If mentor form is completed but mentee form is not
        setShowMenteeForm(true);
        setShowMentorForm(false);
      } else setShowMentorForm(true);
    } else if (userType === 'mentor') {
      if (mentorFormCompleted) {
        window.location.replace('/onboarding/preferences');
      } else setShowMentorForm(true);
    } else if (userType === 'mentee') {
      if (menteeFormCompleted) {
        window.location.replace('/onboarding/preferences');
      } else setShowMenteeForm(true);
    }
  }, [mentorFormCompleted, menteeFormCompleted, userType]);

  if (!userType) return null;
  return (
    <>
      {showMentorForm && <MentorForm setMentorFormCompleted={setMentorFormCompleted} />}
      {showMenteeForm && <MenteeForm setMenteeFormCompleted={setMenteeFormCompleted} />}
    </>
  );
};

export default OnboardingProgramInfoPage;
