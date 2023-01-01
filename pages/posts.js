import siteMetadata from '../data/siteMetadata'
import ListLayout from '../layouts/ListLayout'
import { PageSEO } from '../components/SEO'
import { retrieveDatabase } from '../api/notion'

export default function Posts({ posts }) {
  return (
    <>
      <PageSEO title={`Posts - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={posts} title="All Posts" typeDescription="" />
    </>
  )
}

export async function getStaticProps() {
  const database = await retrieveDatabase()
  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  }
}
