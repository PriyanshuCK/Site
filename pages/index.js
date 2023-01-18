import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import { retrieveDatabase } from '../api/notion'
import Listposts from '../components/Listposts'
import CommandPalette from '../components/CommandPalette'

export default function Home({ posts, articles, blog, journal, notes }) {
  const indexPosts = posts.slice(0, 3)
  const types = [indexPosts, articles, blog, journal, notes]
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <CommandPalette posts={posts} />
      <section className="my-4 sm:my-10">
        {types.map((type) => {
          let typeStr = ''
          {
            type === indexPosts
              ? (typeStr = 'Latest Posts')
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
              <h1 className="mb-2 text-center text-4xl font-bold capitalize leading-8 tracking-tight text-gray-900 underline decoration-primary-500 decoration-double decoration-1 underline-offset-[6px] dark:text-gray-100 dark:decoration-primary-400 sm:mb-10 sm:text-5xl">
                {typeStr}
              </h1>
              <Listposts posts={type} />
            </div>
          )
        })}
      </section>
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
