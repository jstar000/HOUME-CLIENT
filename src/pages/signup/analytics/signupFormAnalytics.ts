import { GA_EVENTS } from '@shared/analytics/events';
import { SIGNUP_STEP, type SignupStep } from '@shared/analytics/params/auth';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getLoginSocialParams } from '@shared/analytics/utils/loginEntryRoute';

const signupFormScreenParams = () => ({
  screen_name: SCREEN_NAME.SIGNUP_FORM,
});

const signupStepParams = (signupStep: SignupStep) => ({
  signup_step: signupStep,
});

export const getSignupStep = ({
  isNameSectionValid,
  isNameSubmitted,
  isBirthSectionValid,
}: {
  isNameSectionValid: boolean;
  isNameSubmitted: boolean;
  isBirthSectionValid: boolean;
}): SignupStep => {
  if (isNameSectionValid && isNameSubmitted && isBirthSectionValid) {
    return SIGNUP_STEP.GENDER_SELECT;
  }

  if (isNameSectionValid && isNameSubmitted) {
    return SIGNUP_STEP.BIRTH_INPUT;
  }

  return SIGNUP_STEP.NICKNAME_INPUT;
};

export const trackSignupBrowserBackClick = (signupStep: SignupStep) => {
  trackEvent(GA_EVENTS.signupForm.BROWSER_BACK_CLICK, {
    ...signupFormScreenParams(),
    ...signupStepParams(signupStep),
  });
};

export const trackSignupBrowserBackSwipe = (signupStep: SignupStep) => {
  trackEvent(GA_EVENTS.signupForm.BROWSER_BACK_SWIPE, {
    ...signupFormScreenParams(),
    ...signupStepParams(signupStep),
  });
};

export const trackSignupNicknameFocus = () => {
  trackEvent(
    GA_EVENTS.signupForm.INPUT_NICKNAME_FOCUS,
    signupFormScreenParams()
  );
};

export const trackSignupNickRandomClick = () => {
  trackEvent(
    GA_EVENTS.signupForm.BTN_NICK_RANDOM_CLICK,
    signupFormScreenParams()
  );
};

export const trackSignupNickClearClick = () => {
  trackEvent(
    GA_EVENTS.signupForm.BTN_NICK_CLEAR_CLICK,
    signupFormScreenParams()
  );
};

export const trackSignupBirthFocus = () => {
  trackEvent(GA_EVENTS.signupForm.INPUT_BIRTH_FOCUS, signupFormScreenParams());
};

export const trackSignupErrorNickSignView = () => {
  trackEvent(
    GA_EVENTS.signupForm.ERROR_NICK_SIGN_VIEW,
    signupFormScreenParams()
  );
};

export const trackSignupErrorNickNumView = () => {
  trackEvent(
    GA_EVENTS.signupForm.ERROR_NICK_NUM_VIEW,
    signupFormScreenParams()
  );
};

export const trackSignupErrorBirthIncorrectView = () => {
  trackEvent(
    GA_EVENTS.signupForm.ERROR_BIRTH_INCORRECT_VIEW,
    signupFormScreenParams()
  );
};

export const trackSignupErrorBirthUnder14View = () => {
  trackEvent(
    GA_EVENTS.signupForm.ERROR_BIRTH_UNDER14_VIEW,
    signupFormScreenParams()
  );
};

export const trackSignupGenderClick = () => {
  trackEvent(GA_EVENTS.signupForm.BTNGENDER_CLICK, signupFormScreenParams());
};

export const trackSignupCtaClick = () => {
  trackEvent(GA_EVENTS.signupForm.BTN_CTA, {
    ...signupFormScreenParams(),
    ...getLoginSocialParams(),
  });
};

export const trackSignupNotCompModalView = (signupStep: SignupStep) => {
  trackEvent(GA_EVENTS.signupForm.NOT_COMP_MD_VIEW, {
    ...signupFormScreenParams(),
    ...signupStepParams(signupStep),
  });
};

export const trackSignupNotCompModalKeepClick = (signupStep: SignupStep) => {
  trackEvent(GA_EVENTS.signupForm.NOT_COMP_MD_KEEP_CLICK, {
    ...signupFormScreenParams(),
    ...signupStepParams(signupStep),
  });
};

export const trackSignupNotCompModalQuitClick = (signupStep: SignupStep) => {
  trackEvent(GA_EVENTS.signupForm.NOT_COMP_MD_QUIT_CLICK, {
    ...signupFormScreenParams(),
    ...signupStepParams(signupStep),
  });
};
