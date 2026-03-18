// ComponentTest.tsx
import { useState } from 'react';

import CardProduct from '@components/v2/cardProduct/CardProduct';

const ComponentTest = () => {
  const [isSaved1, setIsSaved1] = useState(false);
  const [isSaved2, setIsSaved2] = useState(false);

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}
    >
      {/* large */}
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          <CardProduct
            title="상품명은 최대 두 줄까지 쓸 수 있어요. 상품명은 최대 두 줄..."
            brand="브랜드명은 최대 한 줄 까지 쓸 수..."
            isSaved={isSaved1}
            onToggleSave={() => setIsSaved1((prev) => !prev)}
            linkHref="https://example.com"
            linkLabel="사이트"
            originalPrice={1000000}
            discountRate={0}
            discountPrice={1000000}
            colorHexes={['#fff', '#999', '#666', '#333']}
            saveCount={1000}
          />
          <CardProduct
            title="상품명은 최대 두 줄까지 쓸 수 있어요. 상품명은 최대 두 줄..."
            brand="브랜드명은 최대 한 줄 까지 쓸 수..."
            isSaved={isSaved2}
            onToggleSave={() => setIsSaved2((prev) => !prev)}
            linkHref="https://example.com"
            linkLabel="사이트"
            discountPrice={1000000}
            colorHexes={['#ccc', '#999', '#666']}
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentTest;
