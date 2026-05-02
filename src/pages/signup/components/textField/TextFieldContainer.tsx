import type { ReactNode } from 'react';

import clsx from 'clsx';

import Icon from '@/shared/components/v2/icon/Icon';

import * as styles from './TextFieldContainer.css';

interface FieldShellProps {
  children: ReactNode;
  isFocused?: boolean;
  isFilled?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const FieldShell = ({
  children,
  isFocused = false,
  isFilled = false,
  isError = false,
  errorMessage,
}: FieldShellProps) => {
  return (
    <div className={styles.fieldWrapper}>
      <div
        className={clsx(
          styles.fieldBox,
          isFocused && styles.focused,
          isFilled,
          isError
        )}
      >
        {children}
      </div>

      {isError && errorMessage ? (
        <p className={styles.errorMessage}>
          <Icon name="WarningFillDanger" size="20" />
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default FieldShell;
