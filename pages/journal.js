import siteMetadata from '../data/siteMetadata'
import ListLayout from '../layouts/ListLayout'
import { PageSEO } from '../components/SEO'
import { retrieveDatabase } from '../api/notion'
import CommandPalette from '../components/CommandPalette'

export default function Journal({ journal, posts }) {
  return (
    <>
      <PageSEO title={`Journal - ${siteMetadata.author}`} description={siteMetadata.description} />
      <CommandPalette posts={posts} />

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
      posts: database,
    },
    revalidate: 1,
  }
}
