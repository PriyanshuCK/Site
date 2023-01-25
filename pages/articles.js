import siteMetadata from '../data/siteMetadata'
import ListLayout from '../layouts/ListLayout'
import { PageSEO } from '../components/SEO'
import { retrieveDatabase } from '../api/notion'
import CommandPalette from '../components/CommandPalette'

export default function Articles({ articles, posts }) {
  return (
    <>
      <PageSEO title={`Articles - ${siteMetadata.author}`} description={siteMetadata.description} />
      <CommandPalette posts={posts} />
      <ListLayout
        posts={articles}
        title="Articles"
        typeDescription="Articles delineating some facts, ideas, or thoughts"
      />
    </>
  )
}

export async function getStaticProps() {
  const database = await retrieveDatabase()
  const articles = database.filter((post) => {
    return post.properties.type.select.name === 'Articles'
  })
  return {
    props: {
      posts: database,
      articles,
    },
    revalidate: 1,
  }
}
