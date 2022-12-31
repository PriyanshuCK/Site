import Link from '../components/Link'
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline'

export default function Pagination({ totalPages, currentPage, type, length, postsPerPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)
  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            rel="previous"
            className="cursor-not-allowed disabled:opacity-50"
            disabled={!prevPage}
          >
            <span className="text-3xl text-primary-700 dark:text-primary-400"> &larr; </span>
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/${type}/` : `/${type}/page/${currentPage - 1}`}>
            <button rel="previous">
              <span className="text-3xl text-primary-700 dark:text-primary-400"> &larr; </span>
            </button>
          </Link>
        )}
        <span>
          Showing {(currentPage - 1) * postsPerPage + 1} to{' '}
          {currentPage * postsPerPage > length ? length : currentPage * postsPerPage} of {length}{' '}
          Posts
        </span>
        {!nextPage && (
          <button
            rel="next"
            className="cursor-not-allowed disabled:opacity-50"
            disabled={!nextPage}
          >
            <span className="text-3xl text-primary-700 dark:text-primary-400"> &rarr; </span>
          </button>
        )}
        {nextPage && (
          <Link href={`/${type}/page/${currentPage + 1}`}>
            <button rel="next">
              <span className="text-3xl text-primary-700 dark:text-primary-400"> &rarr; </span>
            </button>
          </Link>
        )}
      </nav>
    </div>
  )
}
