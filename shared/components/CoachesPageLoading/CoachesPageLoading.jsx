import { Skeleton } from 'antd'
import React from 'react'
import affiche from '../../../public/icon/Banniere.png'
import Layout from '../layout/Layout'
import './style.scss'

const CoachesPageLoading = () => {
  const card = () => (
    <div className="coaches-page-loading__body__coaches-list__card">
      <div className="coaches-page-loading__body__coaches-list__card__avatar">
        <Skeleton
          active
          avatar={{ size: 143, shape: 'circle' }}
          paragraph={false}
          title={false}
        />
      </div>
      <div className="coaches-page-loading__body__coaches-list__card__text">
        <Skeleton
          active
          title={{ style: { margin: 'auto' }, width: '50%' }}
          paragraph={{ rows: 3, width: '100%' }}
        />
      </div>
    </div>
  )
  return (
    <Layout>
      <div className="coaches-page-loading">
        <div className="coaches-page-loading__header">
          <img
            className="coaches-page-loading__header__img"
            src={affiche}
            alt="affiche"
          />
        </div>
        <div className="coaches-page-loading__body">
          <div className="coaches-page-loading__body__filter">
            <Skeleton active paragraph title />
            <Skeleton active paragraph title />
            <Skeleton active paragraph title />
            <Skeleton active paragraph title />
          </div>
          <div className="coaches-page-loading__body__coaches-list">
            {card()}
            {card()}
            {card()}
            {card()}
            {card()}
            {card()}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CoachesPageLoading
