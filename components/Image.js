import { urlFor } from "../sanity"

const Image = ({ identifier, image, alt = "Property image" }) => {
  return (
    <div className={identifier === "main-image" ? "main-image" : "image"}>
      <img src={urlFor(image).auto("format")} alt={alt} />
    </div>
  )
}

export default Image
