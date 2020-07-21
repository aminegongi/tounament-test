import { Component } from 'react';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import css from './mapclub.scss';
import routes from '../../../utils/routes';
import Link from 'next/link'

class Mapclub extends Component {
  state = {
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 36.81897,
      longitude: 10.16579,
      zoom: 6,

    }
    
  };


  render() {
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiYWNob3VyeWFzc2luZSIsImEiOiJja2I0NGtuMmowYzNjMzVwYngxYTU1bGE4In0.4Jja8qJxReYB7c4rr2kQpA"
        onViewportChange={(viewport) => this.setState({ viewport })}
        {...this.state.viewport} >
       
        <Marker latitude={36.81897} longitude={ 10.16579 } offsetLeft={-20} offsetTop={-10}>
        <div className={css.marker}>
            <img className={css.mappin}  src="../icon/map-pin.svg" />
            <div class={css.pintext}>
                <img src="https://scontent.ftun3-1.fna.fbcdn.net/v/t1.0-9/41394292_2191657484438993_2338673511591051264_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_ohc=gmvyQY2FQ5wAX_lL4Ud&_nc_ht=scontent.ftun3-1.fna&oh=9085761281a54226b1dc0e2c1cf6dd62&oe=5F24B44A" />
                
                <span className={css.pintext__pinclubtitle}>Elite Sports Club</span>
                <div className={css.link}>
                <Link href={routes.CONTACT_US.path}>
                <a>
                <span>S'inscrire</span>
              </a>
              </Link>
              </div>
         </div>
            </div>
        </Marker>

        <Marker latitude={36.83333 } longitude={ 9.83333} offsetLeft={-20} offsetTop={-10}>
        <div className={css.marker}>
            <img className={css.mappin}  src="../icon/map-pin.svg" />
            <div class={css.pintext}>
                <img src="data:image/jpeg;base64,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" />
                
                <span className={css.pintext__pinclubtitle}>A.S.M</span>
                <div className={css.link}>
                <Link href={routes.CONTACT_US.path}>
                <a>
                <span>S'inscrire</span>
              </a>
              </Link>
              </div>
         </div>
            </div>
        </Marker>
        </ReactMapGL>
     
    );
  }
}

export default Mapclub;