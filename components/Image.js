import PropTypes from "prop-types"
import { urlFor } from "../sanity"

const Image = ({ identifier, image, alt }) => {
  return (
    <div className={identifier === "main-image" ? "main-image" : "image"}>
      <img src={urlFor(image).auto("format")} alt={alt} />
    </div>
  )
}

Image.propTypes = {
  identifier: PropTypes.oneOf(["main-image", "image"]),
  image: PropTypes.object.isRequired,
  alt: PropTypes.string,
}

Image.defaultProps = {
  identifier: "image",
  alt: "Property image",
}

export default Image
