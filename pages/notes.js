import siteMetadata from '../data/siteMetadata'
import ListLayout from '../layouts/ListLayout'
import { PageSEO } from '../components/SEO'
import { retrieveDatabase } from '../api/notion'

export default function Notes({ notes }) {
  return (
    <>
      <PageSEO
        title={`Book Notes - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout
        posts={notes}
        title="Book Notes"
        typeDescription="Personally crafted notes of the non-fiction books I've read"
      />
    </>
  )
}

export async function getStaticProps() {
  const database = await retrieveDatabase()
  const notes = database.filter((post) => {
    return post.properties.type.select.name === 'Book Notes'
  })
  return {
    props: {
      notes,
    },
    revalidate: 1,
  }
}
