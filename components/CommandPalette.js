import { Dialog, Combobox, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'
import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import formatDate from '../lib/utils/formatDate'

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }
    window.addEventListener('scroll', updateScrollDirection)
    return () => {
      window.removeEventListener('scroll', updateScrollDirection)
    }
  }, [scrollDirection])

  return scrollDirection
}

export default function CommandPalette({ posts }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const filteredPosts = query
    ? posts.filter((post) => {
        const date = formatDate(post.created_time)
        const searchContent =
          post.properties.name.title[0].plain_text +
          post.properties.description.rich_text[0].plain_text +
          date
        return searchContent.toLowerCase().includes(query.toLowerCase())
      })
    : []
  useEffect(() => {
    const onkeydown = (event) => {
      if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || event.key === '/') {
        event.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    window.addEventListener('keydown', onkeydown)
    return () => {
      window.removeEventListener('keydown', onkeydown)
    }
  }, [isOpen])

  const [show, setShow] = useState(false)

  const scrollDirection = useScrollDirection()

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 25) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  return (
    <>
      <button
        aria-label="Search"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed left-[calc(50%-70px)] z-10 scale-90 rounded-lg border-2 border-primary-300 p-2 text-base transition-all duration-300 hover:border-primary-500 dark:border-gray-700 dark:hover:border-gray-600 md:left-[calc(76px)] lg:left-[calc(264px)] xl:left-[calc(50%-110px)]  ${
          scrollDirection === 'down' ? '-top-24' : 'top-[8px]'
        }`}
      >
        <SearchIcon className="mr-2 inline h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">Quick Search</span>
        <span className="hidden text-sm font-medium text-gray-500 dark:text-gray-400 lg:inline">
          'Ctrl K'
          <span className="hidden lg:inline">
            <span className="font-normal"> or</span> '/'
          </span>
        </span>
      </button>
      <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')}>
        <Dialog
          onClose={setIsOpen}
          className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[15vh] md:pt-[20vh]"
        >
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/30" />
          </Transition.Child>
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Combobox
              as="div"
              onChange={(post) => {
                setIsOpen(false)
                router.push(`/${post.properties.slug.rich_text[0].plain_text}`)
              }}
              className="relative mx-auto max-w-2xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 dark:divide-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center px-4">
                <SearchIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <Combobox.Input
                  onChange={(event) => {
                    setQuery(event.target.value)
                  }}
                  className=" h-12 w-full border-0 bg-transparent text-sm text-gray-800 placeholder-gray-400 caret-primary-500 focus:ring-0 dark:text-gray-200 dark:placeholder-gray-500"
                  placeholder="Search title, date or description"
                  autoComplete="off"
                  type="text"
                />
                <button
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  className="inline rounded-lg border-2 border-gray-500 px-2 py-1 text-xs text-gray-500 dark:border-gray-400 dark:text-gray-400"
                >
                  <div>Esc</div>
                </button>
              </div>
              {filteredPosts.length > 0 && (
                <Combobox.Options
                  static
                  className="max-h-[32rem] space-y-4 overflow-y-auto py-4 text-sm sm:divide-y-0"
                >
                  {filteredPosts.map((post) => {
                    return (
                      <Combobox.Option key={post.id} value={post} className="">
                        {({ active }) => (
                          <div
                            className={`m-4 cursor-pointer space-y-1 rounded-lg border border-gray-100 py-2 px-4
                             shadow-sm first:mt-0 last:mb-0 dark:border-gray-800 ${
                               active
                                 ? 'bg-gray-100 dark:bg-gray-800 dark:bg-none dark:text-white'
                                 : ' bg-white dark:bg-gray-900'
                             }`}
                          >
                            <h3 className="text-lg font-medium">
                              {post.properties.name.title[0].text.content}
                            </h3>
                            <div className="flex flex-row">
                              <div className="pr-2 text-[0.8125rem] text-gray-600 dark:text-gray-400">
                                {post.properties.type.select.name}
                              </div>
                              <div className="text-[0.8125rem] text-gray-600 dark:text-gray-400">
                                <time dateTime={post.created_time}>
                                  {new Date(post.created_time).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </time>
                              </div>
                            </div>
                            <div>{post.properties.description.rich_text[0].plain_text}</div>
                          </div>
                        )}
                      </Combobox.Option>
                    )
                  })}
                </Combobox.Options>
              )}
              {query && filteredPosts.length === 0 && (
                <p className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No results for "{query}"
                </p>
              )}
            </Combobox>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  )
}
