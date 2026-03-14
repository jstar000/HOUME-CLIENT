import TextHeading from '@/shared/components/v2/textHeading/TextHeading';

export const ComponentTest = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
      }}
    >
      <TextHeading type="MAIN" title="제목을 입력하는 공간이에요." />{' '}
      <TextHeading
        type="MAIN"
        showCaption={true}
        title="제목을 입력하는 공간이에요."
        caption="설명을 입력하는 공간이에요."
      />{' '}
      <TextHeading type="SUB" title="제목을 입력하는 공간이에요." />{' '}
      <TextHeading
        type="SUB"
        showCaption={true}
        title="제목을 입력하는 공간이에요."
        caption="설명을 입력하는 공간이에요."
      />{' '}
      <TextHeading
        type="POPUP/MODAL"
        showCaption={true}
        title="제목을 입력하는 공간이에요."
        caption="설명을 입력하는 공간이에요."
      />{' '}
      <TextHeading
        type="BOTTOMSHEET"
        showCaption={true}
        title="제목을 입력하는 공간이에요."
        caption="설명을 입력하는 공간이에요."
      />{' '}
    </div>
  );
};
