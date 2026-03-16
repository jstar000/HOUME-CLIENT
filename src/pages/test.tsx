// ComponentTest.tsx
import BtnIcon from '@components/v2/iconsRenewal/BtnIcon';
import IconsResponsive from '@components/v2/iconsRenewal/IconsResponsive';

const sizes = ['S', 'M', 'L', 'XL'] as const;
const iconSizes = ['40', '32', '24', '20', '16', '14', '12'] as const;

const ComponentTest = () => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}
    >
      {/* BtnIcon - 전체 케이스 */}
      <div>
        <p
          style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}
        >
          BtnIcon
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
              disabled=false / 누르는 동안 PRESSED
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {sizes.map((size) => (
                <BtnIcon key={size} name="Search" size={size} />
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
              disabled=true
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {sizes.map((size) => (
                <BtnIcon key={size} name="Search" size={size} disabled={true} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* IconsResponsive - 사이즈별 */}
      <div>
        <p
          style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}
        >
          IconsResponsive - 사이즈별
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'flex-start',
          }}
        >
          {iconSizes.map((size) => (
            <div
              key={size}
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <p style={{ fontSize: '12px', color: '#888', width: '24px' }}>
                {size}
              </p>
              <IconsResponsive name="Search" size={size} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentTest;
