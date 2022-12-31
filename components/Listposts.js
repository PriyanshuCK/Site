import Link from 'next/link'
import Richtext from './Richtext'
export default function Listposts({ posts }) {
  return (
    <>
      <ul className={'flex flex-row flex-wrap justify-center gap-8 py-10'}>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <div className="max-w-md rounded-lg bg-white py-4 px-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-t-2 hover:border-primary-500 dark:bg-gray-800 dark:hover:border-primary-400">
                <div>
                  <span className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                    <Richtext text={post.properties.name.title} key={post.id} />
                  </span>
                  <div className="flex justify-between">
                    <span className="text-sm tracking-widest text-primary-700 dark:text-primary-300">
                      <time dateTime={post.created_time}>
                        {new Date(post.created_time).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </span>
                    <span className="text-sm tracking-widest text-primary-700 dark:text-primary-300">
                      &nbsp;
                    </span>
                  </div>
                  <p className="mt-2 text-justify text-gray-600 dark:text-gray-400">
                    <Richtext text={post.properties.description.rich_text} key={post.id} />
                  </p>
                  <div className="my-2 flex flex-wrap justify-between">
                    <span className="text-right text-base capitalize leading-6 text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
                      <Link href={`/${post.properties.type.select.name.toLowerCase()}`}>
                        {post.properties.type.select.name}
                      </Link>
                    </span>

                    <span className="text-right text-base leading-6 text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
                      <Link
                        href={`/${post.properties.slug.rich_text[0].plain_text}`}
                        aria-label={`Read "${post.properties.name.title[0].text.content}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="pt-2 text-sm">
                    <ul>
                      {post.properties.tags.multi_select.map((tag) => (
                        <li
                          key={tag.id}
                          className="mr-3 inline text-sm uppercase text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                        >
                          <Link href={`/tag/${tag.name.toLowerCase()}`}>{tag.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
