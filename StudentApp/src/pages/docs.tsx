import { useState } from 'react';
import { Button } from 'antd';

export default function DocsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const imageUrl =
    'https://avatars.mds.yandex.net/i?id=52349952fe6c44074f5a8a7d618b4618_l-6371016-images-thumbs&n=13';

  return (
    <div>
      <h1>О программе</h1>

      <p style={{ marginBottom: 16 }}>
        Нажми кнопку ниже, чтобы открыть фото.
      </p>

      <Button type="primary" onClick={() => setIsOpen(true)}>
        Показать фото
      </Button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: 16,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 520,
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 16 }}>Фотография</h3>

            <img
              src={imageUrl}
              alt="Фото"
              style={{ width: '100%', display: 'block', borderRadius: 8 }}
            />

            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <Button type="primary" onClick={() => setIsOpen(false)}>
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}