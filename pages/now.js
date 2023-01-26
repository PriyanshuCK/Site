import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import CommandPalette from '../components/CommandPalette'
import { retrieveDatabase } from '../api/notion'

export default function Now({ posts }) {
  return (
    <>
      <PageSEO title={`Now - ${siteMetadata.author}`} description="Now" />
      <CommandPalette posts={posts} />
      <div className="lg:mx-auto lg:w-2/3 xl:divide-y-2 xl:divide-primary-200 xl:dark:divide-primary-400">
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                Now
              </h1>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center py-10"></div>
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
