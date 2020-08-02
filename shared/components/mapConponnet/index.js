import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  Circle,
  KmlLayer,
  google,
  Polygon,
  InfoWindow
} from "google-maps-react";
import { Col, Row } from "react-bootstrap";

const mapStyles = {
  width: "100%",
  height: 750
};

const AnyReactComponent = text => <div>{text}</div>;
const customMarkeur = () => {
  return (
    <div style={{ height: 100, width: 100 }}>
      <div>hhhhh</div>
    </div>
  );
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  componentWillMount() {}
  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
    // ...
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 }
    ];
    return (
      <Col>
        <centrer>
          <Map
            google={this.props.google}
            onClick={this.onMapClicked}
            zoom={8}
            style={mapStyles}
            initialCenter={{
              lat: 36.8120527,
              lng: 10.1701918
            }}
            onClick={e => {
              console.log(e);
            }}
          >
            <Polygon
              paths={triangleCoords}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor="#0000FF"
              fillOpacity={0.35}
            />
            <Marker
              onClick={this.onMarkerClick}
              icon={{
                url:
                  "https://lh3.googleusercontent.com/6O1DV3tI0e6GK8D-Aop9fWE3dcwIw51BZmSgRPmmgWvH9jLsgXk2FngaCZOT4t9hXBQ",
                anchor: new this.props.google.maps.Point(50, 50),
                scaledSize: new this.props.google.maps.Size(64, 64)
              }}
              name={"Dolores park"}
              position={{ lat: 37.759703, lng: -122.428093 }}
              color="blue"
            />

            <Marker
              onClick={this.onMarkerClick}
              icon={{
                url:
                  "https://lh3.googleusercontent.com/6O1DV3tI0e6GK8D-Aop9fWE3dcwIw51BZmSgRPmmgWvH9jLsgXk2FngaCZOT4t9hXBQ",
                anchor: new this.props.google.maps.Point(32, 32),
                scaledSize: new this.props.google.maps.Size(64, 64)
              }}
              color="blue"
              name={"Dolores park"}
              position={{ lat: 35.5379144, lng: 9.6439455 }}
            />
            <Marker
              onClick={this.onMarkerClick}
              icon={{
                url:
                  "https://lh3.googleusercontent.com/6O1DV3tI0e6GK8D-Aop9fWE3dcwIw51BZmSgRPmmgWvH9jLsgXk2FngaCZOT4t9hXBQ",
                anchor: new this.props.google.maps.Point(32, 32),
                scaledSize: new this.props.google.maps.Size(64, 64)
              }}
              color="blue"
              name={"Dolores park"}
              position={{ lat: 36.8193106, lng: 10.1210109 }}
            />

            <Marker
              onClick={this.onMarkerClick}
              icon={{
                url:
                  "https://lh3.googleusercontent.com/6O1DV3tI0e6GK8D-Aop9fWE3dcwIw51BZmSgRPmmgWvH9jLsgXk2FngaCZOT4t9hXBQ",
                anchor: new this.props.google.maps.Point(32, 32),
                scaledSize: new this.props.google.maps.Size(64, 64)
              }}
              color="blue"
              name={"Dolores park"}
              position={{ lat: 36.7542972, lng: 10.0741417 }}
            />
            <InfoWindow marker={this.state.activeMarker} visible={true}>
              <div>markeur 1</div>
            </InfoWindow>
          </Map>
        </centrer>
      </Col>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAnzCej7UJQn3bYKw0fYr_7n5FKrDH6o2c",
  language: "fr"
})(MapContainer);