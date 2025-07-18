import { forwardRef } from 'react';
import * as styles from './DragHandle.css';
import DragHandleIcon from '@/shared/assets/icons/dragHandle.svg?react';

const DragHandle = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  (props, ref) => {
    return (
      <div ref={ref} className={styles.wrapper} {...props}>
        <DragHandleIcon />
      </div>
    );
  }
);

DragHandle.displayName = 'DragHandle';

export default DragHandle;
