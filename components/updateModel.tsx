import React, {useState} from 'react';
import {Modal, Heading, Link} from 'native-base';
const UpdateModel: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400">
        <Modal.CloseButton />
        <Modal.Header>版本更新</Modal.Header>
        <Modal.Body>
          <Heading size="md">
            <Link
              href="https://www.4399.com"
              isExternal
              _text={{
                color: 'blue.500',
              }}>
              发现新版本, 点击去更新
            </Link>
          </Heading>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateModel;
