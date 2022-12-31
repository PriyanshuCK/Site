import { Dialog, Combobox, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'
import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'

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

export default function CommandPalette({ searchPosts }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const filteredPosts = query
    ? searchPosts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()))
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
        className={`fixed left-[calc(50%-16px)] z-10 scale-90 rounded-lg border-2 border-primary-200 p-2 text-base transition-all duration-300 hover:border-primary-300 dark:border-gray-700 dark:hover:border-gray-600 sm:left-[calc(50%-24px)] md:left-[calc(86px)] lg:left-[calc(50%-24px)]  ${
          scrollDirection === 'down' ? '-top-24' : 'top-[10px]'
        }`}
      >
        <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </button>
      <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')}>
        <Dialog onClose={setIsOpen} className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]">
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
                router.push(`/${post.type}/${post.slug}`)
              }}
              className="relative mx-auto max-w-xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 dark:divide-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center px-4">
                <SearchIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <Combobox.Input
                  onChange={(event) => {
                    setQuery(event.target.value)
                  }}
                  className=" h-12 w-full border-0 bg-transparent text-sm text-gray-800 placeholder-gray-400 caret-primary-500 focus:ring-0 dark:text-gray-200 dark:placeholder-gray-500"
                  placeholder="Search or '/' to focus"
                  autoComplete="off"
                  type="text"
                />
              </div>
              {filteredPosts.length > 0 && (
                <Combobox.Options static className="max-h-96 overflow-y-auto py-4 text-sm">
                  {filteredPosts.map((post) => {
                    return (
                      <Combobox.Option key={post.slug + post.type} value={post}>
                        {({ active }) => (
                          <div
                            className={`py-2 px-4 ${
                              active
                                ? 'bg-primary-600 text-white dark:bg-primary-300 dark:text-gray-800'
                                : ' bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200'
                            }`}
                          >
                            {post.title}
                          </div>
                        )}
                      </Combobox.Option>
                    )
                  })}
                </Combobox.Options>
              )}
              {query && filteredPosts.length === 0 && (
                <p className="p-4 text-sm text-gray-500 dark:text-gray-400">No Posts Found!</p>
              )}
            </Combobox>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  )
}
