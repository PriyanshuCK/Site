import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import { retrieveDatabase } from '../api/notion'
import CommandPalette from '../components/CommandPalette'

export default function About({ posts }) {
  return (
    <>
      <PageSEO title={`About - ${siteMetadata.author}`} description="About me" />
      <CommandPalette posts={posts} />

      <div className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-bold">About</h1>
      </div>
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
