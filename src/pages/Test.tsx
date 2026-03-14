import TextHeading from '@/shared/components/v2/textHeading/TextHeading';

export const ComponentTest = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <TextHeading type="MAIN" /> {/* MAIN - off */}
      <TextHeading type="MAIN" showCaption={true} /> {/* MAIN - on */}
      <TextHeading type="SUB" /> {/* SUB - off */}
      <TextHeading type="SUB" showCaption={true} /> {/* SUB - on */}
      {/* POPUP/MODAL - on */}
      <TextHeading type="POPUP/MODAL" showCaption={true} />{' '}
      {/* BOTTOMSHEET - on */}
      <TextHeading type="BOTTOMSHEET" showCaption={true} />{' '}
    </div>
  );
};
