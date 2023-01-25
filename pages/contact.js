import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import { retrieveDatabase } from '../api/notion'
import CommandPalette from '../components/CommandPalette'

export default function Contact({ posts }) {
  return (
    <>
      <PageSEO title={`Contact - ${siteMetadata.author}`} description="Contact" />
      <CommandPalette posts={posts} />

      <div className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-bold">Contact</h1>
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
