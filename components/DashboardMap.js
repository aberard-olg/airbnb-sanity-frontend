import React from "react"
import PropTypes from "prop-types"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "100vh",
}

const markerIcon =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

const DashboardMap = ({ properties }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const center = {
    lat: properties[0]?.location?.lat ?? 0,
    lng: properties[0]?.location?.lng ?? 0,
  }

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    if (properties.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      properties.forEach((property) => {
        if (property?.location?.lat && property?.location?.lng) {
          bounds.extend({
            lat: property.location.lat,
            lng: property.location.lng,
          })
        }
      })
      map.fitBounds(bounds)
    }
    setMap(map)
  }, [properties])

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
      {properties.map((property) => (
        <Marker
          key={property._id}
          position={{
            lat: property?.location?.lat,
            lng: property?.location?.lng,
          }}
          icon={{
            url: markerIcon,
            anchor: new google.maps.Point(5, 58),
          }}
        />
      ))}
    </GoogleMap>
  )
}

DashboardMap.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      location: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
    })
  ).isRequired,
}

export default React.memo(DashboardMap)
