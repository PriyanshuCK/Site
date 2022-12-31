import { useState } from 'react'
import formatDate from '../lib/utils/formatDate'
import Listposts from '../components/Listposts'

export default function ListLayout({ posts, title, typeDescription }) {
  const [searchQuery, setSearchQuery] = useState('')
  const filteredPosts = posts.filter((post) => {
    const date = formatDate(post.created_time)
    const searchContent =
      post.properties.name.title[0].plain_text +
      post.properties.description.rich_text[0].plain_text +
      date
    return searchContent.toLowerCase().includes(searchQuery.toLowerCase())
  })
  const displayPosts = posts.length > 0 && !searchQuery ? posts : filteredPosts

  return (
    <>
      <div>
        <div className={'py-0 md:pt-6 md:pb-8'}>
          <h1 className="text-center text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>

          <h1 className="py-2 text-center text-gray-900 dark:text-gray-100">{typeDescription}</h1>

          <div className="relative z-0 mx-0 mt-4 transition-all duration-300 md:mx-auto md:w-2/5 md:scale-95 hover:md:w-1/2 hover:md:scale-100">
            <input
              aria-label="Search your query"
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value)
              }}
              placeholder={`Search ${title}`}
              className="w-full rounded-full border-none bg-white px-4 py-3 text-gray-900 caret-primary-500 shadow-md focus:border-primary-500/0 focus:ring-primary-500/0 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="text-center">
          {!filteredPosts.length &&
            'Sorry! No post found related to your search. Kindly try again with different keyword(s).'}
        </div>
        <Listposts posts={displayPosts} />
      </div>
    </>
  )
}
