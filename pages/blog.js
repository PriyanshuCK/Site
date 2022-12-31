import siteMetadata from '../data/siteMetadata'
import ListLayout from '../layouts/ListLayout'
import { PageSEO } from '../components/SEO'
import { retrieveDatabase } from '../api/notion'

export default function Blog({ blog }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={blog}
        title="Blog"
        typeDescription="A detailed account of my happenings, activities, beliefs, and thoughts"
      />
    </>
  )
}

export async function getStaticProps() {
  const database = await retrieveDatabase()
  const blog = database.filter((post) => {
    return post.properties.type.select.name === 'Blog'
  })
  return {
    props: {
      blog,
    },
    revalidate: 1,
  }
}
