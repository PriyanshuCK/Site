import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import { retrieveDatabase } from '../api/notion'
import CommandPalette from '../components/CommandPalette'

export default function About({ posts }) {
  return (
    <>
      <PageSEO title={`About - ${siteMetadata.author}`} description="About me" />
      <CommandPalette posts={posts} />

      <div className="lg:mx-auto lg:w-2/3 xl:divide-y-2 xl:divide-primary-200 xl:dark:divide-primary-400">
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                About
              </h1>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center py-10">
          {/* Namaste! I'm Priyanshu Sharma.
          <br />I am a self-proclaimed lifelong learner who loves reading, designing, and
          programming. I am always on the lookout for new opportunities to learn and grow. I love
          sharing my knowledge and insights with others, and that is what inspired me to start this
          website.I believe that we all have something valuable to contribute and I created this
          website as a platform to share my learnings, happenings, beliefs, and thoughts with the
          world. I am excited to share my journey with you and hope that you will join me on this
          adventure.Thank you for stopping by, and I look forward to connecting with you through my
          writing. */}
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
