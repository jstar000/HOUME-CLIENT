import { Toaster } from 'sonner';

import { TOASTER_DEFAULTS, TOASTER_ID } from '@shared/types/toast';

const MainToaster = () => {
  return (
    <>
      <Toaster
        id={TOASTER_ID.TOP}
        position="top-center"
        offset={{ top: '4rem' }}
        toastOptions={{ unstyled: true }}
        {...TOASTER_DEFAULTS}
      />
      <Toaster
        id={TOASTER_ID.BOTTOM_8}
        position="bottom-center"
        offset={{ bottom: '8rem' }}
        toastOptions={{ unstyled: true }}
        {...TOASTER_DEFAULTS}
      />
      <Toaster
        id={TOASTER_ID.BOTTOM_4}
        position="bottom-center"
        offset={{ bottom: '4rem' }}
        toastOptions={{ unstyled: true }}
        {...TOASTER_DEFAULTS}
      />
    </>
  );
};

export default MainToaster;
