import  './trust-us.scss'
import Link from 'next/link';
import Ticker from 'react-ticker'

const fakeData = {
  data: [
    {
      name: 'olympia tennis academy ',
      image: 'https://scontent.ftun3-1.fna.fbcdn.net/v/t1.0-9/72658939_2471205603150845_5031113072647864320_n.jpg?_nc_cat=109&_nc_oc=AQncGdWtd3u9MIg4aeZg0GaeKLyZaLJOHIq23QZzfx7M7eTau0n0xI3jRwvuIoao8iI&_nc_ht=scontent.ftun3-1.fna&oh=28d4a4f7d5093517a28f42275d8edd8d&oe=5E23E88E'
    },
    {
      name: 'olympia tennis academy ',
      image: 'https://scontent.ftun3-1.fna.fbcdn.net/v/t1.0-9/73220684_2471210866483652_7872914072792989696_n.jpg?_nc_cat=111&_nc_oc=AQmIabr_s-1HhURdd5qWEPDcr5GL-k47P572JaLTMIiePZFijd1nWP49jUslVZ7PFjo&_nc_ht=scontent.ftun3-1.fna&oh=c6b016afb11fcd42cc7e3d69bfe00c42&oe=5E1ECAF7'
    },
    {
      name: 'olympia tennis academy ',
      image: 'https://scontent.ftun3-1.fna.fbcdn.net/v/t1.0-9/71497846_2461734004098005_5079365552749674496_n.jpg?_nc_cat=108&_nc_oc=AQlLo1mW2Gfa0Qd8YgHD4ruOtNG_ANj8fFClAV8iz3Yvb4VxKtWSobr0JgqB3U55OGI&_nc_ht=scontent.ftun3-1.fna&oh=530e4b62303f7238b7db0c7b4b185248&oe=5E226D5D'
    },
    {
      name: 'olympia tennis academy ',
      image: 'https://scontent.ftun3-1.fna.fbcdn.net/v/t1.0-9/50620540_1653939301375184_8042050258571624448_n.jpg?_nc_cat=105&_nc_oc=AQl09m-S4UiDYcVVUS3RveewO2LXu_EL8JivSkroNp7DjGys71zr3njbfkXcOoXnbgc&_nc_ht=scontent.ftun3-1.fna&oh=9c2783c2c086a39867d60f265777f0f4&oe=5E18C85B'
    },
    {
      name: 'olympia tennis academy ',
      image: 'https://www.est.org.tn/images/Logo-Taraji_200px.png'
    },
    {
      name: 'olympia tennis academy ',
      image: 'https://upload.wikimedia.org/wikipedia/fr/a/a8/Logo_ASM_Clermont_Auvergne_2019.svg'
    },
    {
      name: 'olympia tennis academy ',
      image: 'https://i1.wp.com/naijaquest.com/wp-content/uploads/2019/02/Richest-Football-Clubs-In-Europe.jpg?resize=400%2C421&ssl=1'
    },
    {
      name: 'olympia tennis academy ',
      image: 'https://2.bp.blogspot.com/-AoGSi8yhYNQ/U_x9UDqtLrI/AAAAAAAADxs/FxNN967C4iM/s1600/ShanghaiEastAsia.png'
    },
  ]
}
export default function TrustUs({ title }) {
  return (
    <div className={"trust_us_container"}>
      <h3 className={"h3"}>
        20 {title}
        </h3>
      <div className={"image_container"}>
        <Ticker height={100}>
          {({ index }) => (
            <>
              {
                fakeData.data.map((el, index) => <Link key={index} href={`/profile/${el.name}`}><a><img src={el.image} alt={el.name} /></a></Link>)
              }
            </>
          )}
        </Ticker>
      </div>

    </div>
  );
}