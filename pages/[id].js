import { Fragment } from 'react'
import { retrieveDatabase, retrievePage, retrieveBlocks, retrieveId } from '../api/notion'
import Renderblock from '../components/Renderblock'
import { BlogSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'
import Richtext from '../components/Richtext'
import ScrollTopAndComment from '../components/ScrollTopAndComment'
import SectionContainer from '../components/SectionContainer'
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

export default function Post({ page, blocks, id }) {
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
              <div className="flex flex-col pt-8">
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
              {/* <Comments frontMatter={frontMatter} /> */}
            </div>
            {/* <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
                          <Link href={`/${frontMatter.type}/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
                          <Link href={`/${frontMatter.type}/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${frontMatter.type}`}
                  className="text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                >
                  &larr; Back to {frontMatter.type}
                </Link>
              </div>
            </footer> */}
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
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { id } = context.params
  const newId = await retrieveId(id)
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
      page,
      id,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  }
}
