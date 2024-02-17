import React from 'react';
import { Button, notification, Space } from 'antd';

const Notification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api.open({
      message: 'Hi, Prantik',
      description:
        'This is the content of the notification.',
    });
  };
  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
      </Space>
    </>
  );
};
export {Notification};