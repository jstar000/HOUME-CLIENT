import * as styles from './ProfileSection.css';
import ProfileIcon from '@/shared/assets/icons/me.svg?react';
import CreditBox from '@/shared/components/creditBox/CreditBox';

interface ProfileSectionProps {
  userName: string;
  credit: number;
  onChargeClick: () => void;
}

const ProfileSection = ({
  userName = '사용자 이름',
  credit,
  onChargeClick,
}: ProfileSectionProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.profileBox}>
        <div className={styles.iconWrapper}>
          <ProfileIcon />
        </div>

        <div
          className={styles.creditWrapper}
          onClick={onChargeClick}
          role="button"
        >
          <div className={styles.textArea}>
            <p>또 오셨네요!</p>
            <p>{userName} 님</p>
          </div>
          <CreditBox credit={credit} />
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
