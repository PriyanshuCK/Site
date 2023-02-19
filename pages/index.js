import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import { retrieveDatabase } from '../api/notion'
import Listposts from '../components/Listposts'
import CommandPalette from '../components/CommandPalette'

export default function Home({ posts, articles, blog, journal, notes }) {
  const indexPosts = posts.slice(0, 3)
  const types = [indexPosts, journal, notes]
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <CommandPalette posts={posts} />

      <section className="my-4 sm:my-10">
        {types.map((type) => {
          let typeStr = ''
          {
            type === indexPosts
              ? (typeStr = 'Recent Posts')
              : type === articles
              ? (typeStr = 'Articles')
              : type === blog
              ? (typeStr = 'Blog')
              : type === journal
              ? (typeStr = 'Journal')
              : (typeStr = 'Notes')
          }
          return (
            <div key={typeStr}>
              <h1 className="mt-2 text-center text-4xl font-bold capitalize leading-8 tracking-tight text-gray-900 underline decoration-primary-500 decoration-double decoration-1 underline-offset-[6px] dark:text-gray-100 dark:decoration-primary-400 sm:mt-8 sm:text-5xl">
                {typeStr}
              </h1>
              <Listposts posts={type} />
            </div>
          )
        })}
      </section>
      <div
        className="mx-auto rounded-lg bg-primary-50 px-4 py-3 text-primary-900 shadow-sm dark:bg-gray-800 dark:text-gray-400 md:w-5/6"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="mr-4 h-6 w-6 fill-current text-primary-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold dark:text-gray-300">Development under progress</p>
            <p className="text-sm">
              This website is currently in the process of undergoing development and may contain
              certain UI errors or inconsistencies. I'm truly appreciative of your understanding and
              patience as I strive to address any issues that may arise and to implement additional
              features that will provide a more positive and seamless experience. If you have any
              feedback on your experience, suggestions for improvement, or have discovered any bugs
              or discrepancies, please contact me at{' '}
              <a href="mailto:priyanshu@priyanshusharma.dev">priyanshu@priyanshusharma.dev</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const database = await retrieveDatabase()
  const articles = database.filter((post) => {
    return post.properties.type.select.name === 'Articles'
  })
  const blog = database.filter((post) => {
    return post.properties.type.select.name === 'Blog'
  })
  const journal = database.filter((post) => {
    return post.properties.type.select.name === 'Journal'
  })
  const notes = database.filter((post) => {
    return post.properties.type.select.name === 'Notes'
  })
  return {
    props: {
      posts: database,
      articles: articles.slice(0, 3),
      blog: blog.slice(0, 3),
      journal: journal.slice(0, 3),
      notes: notes.slice(0, 3),
    },
    revalidate: 1,
  }
}
