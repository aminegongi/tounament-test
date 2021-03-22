import './clublogo.scss'
import '../../global-style.scss'
import Link from 'next/link'
import routes from '../../../utils/routes'

export default function Clublogo({ images }) {
  return (
    <div className={`${'isporit_max_width'}`}>
      <div className="clubs">Clubs partenaires nous font confiance</div>
      <Link href={routes.SIGN_UP.path}>
        <div className="img_club">
          {images.map((el) => (
            <img
              key={Math.round(Math.random() * Math.random() * 100)}
              alt={el.alt}
              className="image"
              src={el.src}
            />
          ))}
        </div>
      </Link>
    </div>
  )
}
