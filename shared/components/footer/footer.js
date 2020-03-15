import css from './footer.scss'
export default function Footer() {
    return (
      <div className={css.footer_container}>
        <div className={css.logo}>
            <img src="/logo.png" alt="sporit" />
        </div>
        <div className={css.social_media}>
            <a href="" ><img src="/Facebook_logo.png" alt="facebook" /></a> 
            <a href="" ><img src="/Twitter_logo.png" alt="twitter" /></a> 
            <a href="" ><img src="/Instagram_logo.png" alt="instagram" /></a> 
        </div>
      </div>
    );
  }