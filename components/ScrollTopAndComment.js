import siteMetadata from '../data/siteMetadata'
import { useEffect, useState } from 'react'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment').scrollIntoView()
  }
  return (
    <div
      className={`fixed right-8 bottom-8 z-50 -mr-5 scale-75 flex-col gap-3 md:mr-0 md:scale-100 ${
        show ? 'flex' : 'hidden'
      }`}
    >
      {siteMetadata.comment.provider && (
        <button
          aria-label="Scroll To Comment"
          type="button"
          onClick={handleScrollToComment}
          className="inline-flex scale-[0.8] items-center justify-center rounded-full border border-primary-400 bg-white p-2 text-primary-400 shadow-md shadow-primary-200 transition-all duration-300 hover:bg-primary-400 hover:text-white focus:outline-none dark:border-primary-300 dark:bg-gray-800 dark:text-primary-300 dark:shadow-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-500 dark:hover:text-primary-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        className="inline-flex scale-[0.8] items-center justify-center rounded-full border border-primary-400 bg-white p-2 text-primary-400 shadow-md shadow-primary-200 transition-all duration-300 hover:bg-primary-400 hover:text-white focus:outline-none dark:border-primary-300 dark:bg-gray-800 dark:text-primary-300 dark:shadow-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-500 dark:hover:text-primary-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
          />
        </svg>
      </button>
    </div>
  )
}

export default ScrollTopAndComment
