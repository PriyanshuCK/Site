import siteMetadata from '../data/siteMetadata'
import ListLayout from '../layouts/ListLayout'
import { PageSEO } from '../components/SEO'
import { retrieveDatabase } from '../api/notion'

export default function Journal({ journal }) {
  return (
    <>
      <PageSEO title={`Journal - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={journal}
        title="Journal"
        typeDescription="An informal catalog of what I learn, do & observe each day"
      />
    </>
  )
}

export async function getStaticProps() {
  const database = await retrieveDatabase()
  const journal = database.filter((post) => {
    return post.properties.type.select.name === 'Journal'
  })
  return {
    props: {
      journal,
    },
    revalidate: 1,
  }
}
