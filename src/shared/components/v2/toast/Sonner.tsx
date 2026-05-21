import { Toaster, type ToasterProps } from 'sonner';

import { TOASTER_DEFAULTS } from '@shared/types/toast';

const MainToaster = (props: ToasterProps) => {
  return (
    <Toaster
      {...TOASTER_DEFAULTS}
      toastOptions={{
        unstyled: true,
      }}
      {...props}
    />
  );
};

export default MainToaster;
