import { retrieveDatabase } from '../../api/notion'
import { PageSEO } from '../../components/SEO'
import siteMetadata from '../../data/siteMetadata'
import ListLayout from '../../layouts/ListLayout'

export default function Tag({ posts, tag }) {
  return (
    <>
      <PageSEO
        title={`Tag: ${tag[0].toUpperCase() + tag.substring(1)} - ${siteMetadata.author}`}
        description={`All the posts corresponding to the Tag: ${
          tag[0].toUpperCase() + tag.substring(1)
        }`}
      />
      <ListLayout
        posts={posts}
        title={`Tag: ${tag[0].toUpperCase() + tag.substring(1)}`}
        typeDescription=""
      />
    </>
  )
}

export const getStaticPaths = async () => {
  const database = await retrieveDatabase()
  const tags = [
    ...new Set(
      database
        .map((page) => {
          return page.properties.tags.multi_select.map((tag) => {
            return tag.name.toLowerCase()
          })
        })
        .flat()
    ),
  ]
  return {
    paths: tags.map((tag) => ({
      params: { id: tag },
    })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const { id } = params
  const database = await retrieveDatabase()
  const posts = database.filter((page) =>
    page.properties.tags.multi_select.map((tag) => tag.name.toLowerCase()).includes(id)
  )

  return {
    props: {
      tag: id,
      posts,
    },
    revalidate: 1,
  }
}
