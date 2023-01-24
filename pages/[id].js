import { Fragment } from 'react'
import { retrieveDatabase, retrievePage, retrieveBlocks, retrieveId } from '../api/notion'
import Renderblock from '../components/Renderblock'
import { BlogSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import Richtext from '../components/Richtext'
import ScrollTopAndComment from '../components/ScrollTopAndComment'
import SectionContainer from '../components/SectionContainer'
import CommandPalette from '../components/CommandPalette'

const postDateTemplate = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
const postTimeTemplate = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}
import PageTitle from '../components/PageTitle'

export default function Post({ posts, page, blocks, id }) {
  if (!page || !blocks) {
    return <div> URL not found</div>
  }
  return (
    <>
      <SectionContainer />
      <BlogSEO
        title={`${page.properties.name.title[0].plain_text} - ${siteMetadata.author}`}
        summary={page.properties.description.rich_text[0].plain_text}
        date={page.created_time}
        lastmod={page.last_edited_time}
      />
      <ScrollTopAndComment />
      <CommandPalette posts={posts} />
      <article>
        <div className="lg:mx-auto lg:w-2/3 xl:divide-y-2 xl:divide-primary-200 xl:dark:divide-primary-400">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={page.created_time}>
                      {new Date(page.created_time).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>
                  {<Richtext text={page.properties.name.title} key={page.id} />}
                </PageTitle>
              </div>
            </div>
          </header>
          <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                {blocks.map((block) => (
                  <Fragment key={block.id}>
                    <Renderblock block={block} />
                  </Fragment>
                ))}
              </div>
              <div className="flex flex-col pt-8 text-center">
                <span className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  Published:&nbsp;
                  <time dateTime={page.created_time}>
                    {new Date(page.created_time).toLocaleString(
                      siteMetadata.locale,
                      postTimeTemplate
                    )}
                  </time>
                </span>
                <span className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  Last edited:&nbsp;
                  <time dateTime={page.last_edited_time}>
                    {new Date(page.last_edited_time).toLocaleString(
                      siteMetadata.locale,
                      postTimeTemplate
                    )}
                  </time>
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export const getStaticPaths = async () => {
  const database = await retrieveDatabase()
  return {
    paths: database.map((page) => ({
      params: { id: page.properties.slug.rich_text[0].plain_text },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps = async (context) => {
  const { id } = context.params
  const newId = await retrieveId(id)
  if (!newId) {
    return {
      notFound: true,
    }
  }
  const database = await retrieveDatabase()
  const page = await retrievePage(newId)
  const blocks = await retrieveBlocks(newId)
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await retrieveBlocks(block.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find((x) => x.id === block.id)?.children
    }
    return block
  })

  return {
    props: {
      posts: database,
      page,
      id,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  }
}
