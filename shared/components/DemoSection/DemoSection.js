import './DemoSection.scss'
import Link from 'next/link'
import routes from '../../../utils/routes'

export default function DemoSection({
  style,
  title,
  title_two,
  description,
  img,
  link,
}) {
  return (
    <div style={style}>
      <div className="demo_block">
        <div className="demo_semaine">
          {img && <img src={img} alt={title} className="montre" />}
          <div className="demo_plus_text">
            <div> {title}</div>
            <div> {title_two}</div>
          </div>
          <div className="demo_plateforme">{description}</div>
          {link && (
            <Link href={routes.SIGN_UP.path}>
              <button className="gerer_equipe">J'inscris mon club</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
