import { Skeleton } from 'antd'
import React from 'react'
import affiche from '../../../public/icon/Banniere.png'
import Layout from '../layout/Layout'
import './style.scss'

const CoachDetailsPageLoading = () => {
  return (
    <Layout>
      <div className="coach-details-page-loading">
        <div className="coach-details-page-loading__header">
          <img
            className="coach-details-page-loading__header__img"
            src={affiche}
            alt="affiche"
          />
        </div>
        <div className="coach-details-page-loading__body">
          <div className="coach-details-page-loading__body__profile-information">
            <div className="coach-details-page-loading__body__profile-information__avatar">
              <Skeleton
                active
                avatar={{ size: 152, shape: 'circle' }}
                paragraph={false}
                title={false}
              />
            </div>
            <div className="coach-details-page-loading__body__profile-information__text">
              <Skeleton
                active
                title={{ style: { margin: 'auto' }, width: '50%' }}
                paragraph={{ rows: 3, width: '100%' }}
              />
            </div>
          </div>
          <div className="coach-details-page-loading__body__about">
            <div className="coach-details-page-loading__body__about__tabs">
              <Skeleton active paragraph={false} title={{ width: '30%' }} />
            </div>
            <div className="coach-details-page-loading__body__about__section coach-details-page-loading__body__about__information-section">
              <div className="coach-details-page-loading__body__about__section__title">
                <Skeleton active title={{ width: '50%' }} paragraph={false} />
              </div>
              <div className="coach-details-page-loading__body__about__section__body">
                <Skeleton active paragraph={{ rows: 5 }} />
              </div>
            </div>
            <div className="coach-details-page-loading__body__about__section coach-details-page-loading__body__about__regions-section">
              <div className="coach-details-page-loading__body__about__section__title">
                <Skeleton active title={{ width: '50%' }} paragraph={false} />
              </div>
              <div className="coach-details-page-loading__body__about__section__body">
                <Skeleton active paragraph={{ rows: 3 }} />
              </div>
            </div>
            <div className="coach-details-page-loading__body__about__section coach-details-page-loading__body__about__information-section">
              <div className="coach-details-page-loading__body__about__section__title">
                <Skeleton active title={{ width: '50%' }} paragraph={false} />
              </div>
              <div className="coach-details-page-loading__body__about__section__body">
                <Skeleton active paragraph={{ rows: 5 }} />
              </div>
            </div>
            <div className="coach-details-page-loading__body__about__section coach-details-page-loading__body__about__regions-section">
              <div className="coach-details-page-loading__body__about__section__title">
                <Skeleton active title={{ width: '50%' }} paragraph={false} />
              </div>
              <div className="coach-details-page-loading__body__about__section__body">
                <Skeleton active paragraph={{ rows: 2 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CoachDetailsPageLoading
