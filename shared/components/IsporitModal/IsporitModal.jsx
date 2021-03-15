import React from 'react'
import { Icon, Modal } from 'antd'
import './style.scss'

const IsporitModal = ({
  isVisible,
  onCancel,
  children,
  className,
  ...restProps
}) => {
  return (
    <Modal
      className={`isporit-modal ${className}`}
      visible={isVisible}
      onCancel={onCancel}
      footer={false}
      title={false}
      closeIcon={
        <div className="isporit-modal__close-icon-container">
          <Icon className="isporit-modal__close-icon" type="close" />
        </div>
      }
      {...restProps}
    >
      {children}
    </Modal>
  )
}

export default IsporitModal
