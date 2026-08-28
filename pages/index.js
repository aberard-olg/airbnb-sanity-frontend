import { sanityClient, urlFor } from "../sanity"
import Link from "next/link"
import { isMultiple } from "../utils"
import DashboardMap from "../components/DashboardMap"

const Home = ({ properties }) => {
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <div className="feed">
              {properties.map((property) => (
                <Link key={property._id} href={`property/${property.slug.current}`}>
                  <a className="card">
                    <img
                      src={urlFor(property.mainImage)}
                      alt={property.title}
                    />
                    <p>
                      {property.reviews.length} review
                      {isMultiple(property.reviews.length)}
                    </p>
                    <h3>{property.title}</h3>
                    <h3>
                      <b>£{property.pricePerNight}/per Night</b>
                    </h3>
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="map">
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]'

  try {
    const properties = await sanityClient.fetch(query)

    return {
      props: {
        properties: properties || [],
      },
    }
  } catch (error) {
    // Error fetching properties - return empty list
    return {
      props: {
        properties: [],
      },
    }
  }
}

export default Home
