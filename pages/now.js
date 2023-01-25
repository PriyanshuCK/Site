import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import CommandPalette from '../components/CommandPalette'

export default function Now({ posts }) {
  return (
    <>
      <PageSEO title={`Now - ${siteMetadata.author}`} description="Now" />
      <CommandPalette posts={posts} />

      <div className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-bold">Now</h1>
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
