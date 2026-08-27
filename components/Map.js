import React from "react"
import PropTypes from "prop-types"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "400px",
}

const markerIcon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

const Map = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const center = {
    lat: location?.lat ?? 0,
    lng: location?.lng ?? 0,
  }

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    if (location?.lat && location?.lng) {
      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend({ lat: location.lat, lng: location.lng })
      map.fitBounds(bounds)
    }
    setMap(map)
  }, [location])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <div>Loading map...</div>
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={{ lat: location?.lat, lng: location?.lng }}
        icon={{
          url: markerIcon,
          anchor: new google.maps.Point(5, 58),
        }}
      />
    </GoogleMap>
  )
}

Map.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
}

Map.defaultProps = {
  location: null,
}

export default React.memo(Map)
