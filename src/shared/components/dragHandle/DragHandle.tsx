import * as styles from './DragHandle.css';
import DragHandleIcon from '@/shared/assets/icons/dragHandle.svg?react';

const DragHandle = (props: React.ComponentProps<'div'>) => {
  return (
    <div className={styles.wrapper} {...props}>
      <DragHandleIcon />
    </div>
  );
};

export default DragHandle;
