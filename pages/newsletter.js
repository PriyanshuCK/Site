import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import { retrieveDatabase } from '../api/notion'
import CommandPalette from '../components/CommandPalette'

export default function About({ posts }) {
  return (
    <>
      <PageSEO
        title={`Newsletter - ${siteMetadata.author}`}
        description="Sharing my learnings and valuable insights from the content I consume"
      />
      <CommandPalette posts={posts} />
      <div class="lg:mx-auto lg:w-2/3 xl:divide-y-2 xl:divide-primary-200 xl:dark:divide-primary-400">
        <header class="pt-6 xl:pb-6">
          <div class="space-y-1 text-center">
            <div>
              <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                Thursday Thoughts
              </h1>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center py-10">
          <iframe
            className="mx-auto w-1/2"
            src="https://priyanshuck.substack.com/embed"
            width="480"
            height="320"
          ></iframe>
        </div>
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
