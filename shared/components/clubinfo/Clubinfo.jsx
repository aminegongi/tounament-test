import Link from 'next/link'
import { Empty } from 'antd'
import { isEmpty } from 'lodash'
import routes from '../../../utils/routes'
import css from './clubinfo.scss'

export default function clubinfo({ key, el, img }) {
  return (
    <div className={css.club_info}>
      <img
        className={css.clublist_map__clubinfo__map}
        src={
          el && !isEmpty(el.logo)
            ? el.logo
            : el.website &&
              el.website.contact &&
              el.website.contact.body &&
              !el.website.contact.body.logo == ''
            ? el.website.contact.body.logo
            : img
        }
        alt="map"
      />
      <div className={css.clublist_map__clubinfo__detais__mapcarousel}>
        <div
          className={
            css.clublist_map__clubinfo__detais__mapcarousel__detaisclub
          }
        >
          <div
            className={
              css.clublist_map__clubinfo__detais__mapcarousel__detaisclub__nameclub
            }
          >
            {el.title}
          </div>
          <div
            className={
              css.clublist_map__clubinfo__detais__mapcarousel__detaisclub__lieuclub
            }
          >
            {el && !isEmpty(el.address) ? <div> {el.address}</div> : ''}
            <div>
              {el && !isEmpty(el.city) && !isEmpty(el.country)
                ? `${el.city} ${el.country}`
                : ''}
            </div>
          </div>
        </div>
        <div
          className={
            css.clublist_map__clubinfo__detais__mapcarousel__detaisclub__description
          }
        >
          {el && el.website && el.website.contact && el.website.contact.body
            ? el.website.contact.body.description
            : ''}
        </div>
        <div
          className={
            css.clublist_map__clubinfo__detais__mapcarousel__detaisclub__lien
          }
        >
          <Link href={`/websiteclub/${el.slug}`}>
            <a>Visiter le site web --></a>
          </Link>
        </div>
      </div>
    </div>
  )
}
