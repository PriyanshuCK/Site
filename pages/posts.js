import siteMetadata from '../data/siteMetadata'
import ListLayout from '../layouts/ListLayout'
import { PageSEO } from '../components/SEO'
import { retrieveDatabase } from '../api/notion'

export default function Posts({ posts }) {
  const tags = [
    ...new Set(
      posts
        .map((page) => {
          return page.properties.tags.multi_select.map((tag) => {
            return tag.name.toLowerCase()
          })
        })
        .flat()
    ),
  ]
  console.log(tags)
  const newPosts = posts.filter((page) =>
    page.properties.tags.multi_select.map((tag) => tag.name.toLowerCase()).includes('story')
  )
  console.log(newPosts)

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
