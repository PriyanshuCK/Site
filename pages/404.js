import Link from '../components/Link'
import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'

export default function FourZeroFour() {
  return (
    <>
      <PageSEO title={`Page Not Found - ${siteMetadata.title}`} />
      <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
            Oops...
          </h1>
        </div>
        <div className="max-w-md">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            Sorry this page doesn't exist!
          </p>
          <Link href="/">
            <button className="inline-flex justify-center rounded-full border border-transparent bg-primary-100 px-4 py-2 text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
              Back to homepage
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
