import { useState } from 'react';
import { Button, Modal } from 'antd';

export default function DocsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>О программе</h1>

      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Показать фото
      </Button>

      <Modal
        title="Фотография"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <img
          src="https://avatars.mds.yandex.net/i?id=52349952fe6c44074f5a8a7d618b4618_l-6371016-images-thumbs&n=13"
          alt="Фото"
          style={{ width: '100%', display: 'block' }}
        />
      </Modal>
    </div>
  );
}