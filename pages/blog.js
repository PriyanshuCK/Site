import siteMetadata from '../data/siteMetadata'
import ListLayout from '../layouts/ListLayout'
import { PageSEO } from '../components/SEO'
import { retrieveDatabase } from '../api/notion'
import CommandPalette from '../components/CommandPalette'

export default function Blog({ blog, posts }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <CommandPalette posts={posts} />

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
      posts: database,

      blog,
    },
    revalidate: 1,
  }
}
