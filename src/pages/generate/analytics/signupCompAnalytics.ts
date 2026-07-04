import { GA_EVENTS } from '@shared/analytics/events';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { trackEvent } from '@shared/analytics/track';
import { getLoginSocialParams } from '@shared/analytics/utils/loginEntryRoute';

const signupCompScreenParams = () => ({
  screen_name: SCREEN_NAME.SIGNUP_COMP,
});

export const getSignupCompPageViewParams = () => ({
  ...getLoginSocialParams(),
  is_new_user: true,
});

export const trackSignupCompCtaClick = () => {
  trackEvent(GA_EVENTS.signupComp.BTN_CTA, {
    ...signupCompScreenParams(),
    ...getLoginSocialParams(),
  });
};
