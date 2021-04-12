import React from 'react'
import { Icon, Modal } from 'antd'
import './style.scss'

const IsporitModal = ({
  isVisible,
  onCancel,
  children,
  className,
  footer,
  title,
  ...restProps
}) => {
  return (
    <Modal
      className={`isporit-modal ${className}`}
      visible={isVisible}
      onCancel={onCancel}
      footer={footer}
      title={title}
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

IsporitModal.defaultProps = {
  footer: false,
  title: false,
}

export default IsporitModal
