import Link from './Link'
import Icon from '../components/Icon.js'
// import NewsletterForm from './NewsletterForm'
let weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][
  new Date().getDay()
]

export default function Footer() {
  return (
    <>
      <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            transform="translate(-2.000000, 44.000000)"
            className="fill-primary-50 dark:fill-gray-800 "
            fillRule="nonzero"
          >
            <path
              d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
              opacity="0"
            ></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0"
            ></path>
            <path
              d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
              id="Path-4"
              opacity="0"
            ></path>
          </g>
          <g
            transform="translate(-4.000000, 76.000000)"
            className="fill-primary-50 dark:fill-gray-800 "
            fillRule="nonzero"
          >
            <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
          </g>
        </g>
      </svg>
      <footer className="z-10 bg-primary-50 p-4 dark:bg-gray-800 lg:p-6">
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            <div className="col-span-2 flex w-full flex-col items-center justify-center md:col-span-4 lg:col-span-2">
              <Link href="/" className="flex items-center">
                <Icon />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                  Priyanshu Sharma
                </span>
              </Link>
              <Link href="/" className="flex cursor-not-allowed items-center">
                <span className="inline self-center whitespace-nowrap text-sm text-gray-500 hover:underline dark:text-gray-400">
                  Contact
                </span>
              </Link>
            </div>
            <div className=" col-span-2 mx-0 grid grid-cols-2 gap-8 sm:col-span-4 sm:!mx-0 sm:grid-cols-4 [@media(min-width:500px)]:!mx-24 [@media(min-width:350px)]:mx-8">
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                  Learnings
                </h2>
                <ul className="text-gray-600 dark:text-gray-400">
                  <li key="articles" className="mb-3">
                    <Link href="/articles" className="hover:underline">
                      Articles
                    </Link>
                  </li>
                  <li key="notes">
                    <Link href="/notes" className="hover:underline">
                      Book Notes
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="justify-self-end sm:justify-self-auto">
                <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                  Experiences
                </h2>
                <ul className="text-gray-600 dark:text-gray-400">
                  <li key="blog" className="mb-3">
                    <Link href="/blog" className="hover:underline">
                      Blog
                    </Link>
                  </li>
                  <li key="journal">
                    <Link href="/journal" className="hover:underline">
                      Journal
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                  Browse
                </h2>
                <ul className="text-gray-600 dark:text-gray-400">
                  <li key="posts" className="mb-3">
                    <Link href="/posts" className="hover:underline ">
                      All Posts
                    </Link>
                  </li>
                  <li key="tags">
                    <Link href="/tags" className="hover:underline">
                      Tags
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="justify-self-end px-6 sm:justify-self-auto sm:px-0">
                <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                  Connect
                </h2>
                <ul className="text-gray-600 dark:text-gray-400">
                  <li key="about" className="mb-3">
                    <Link href="/" className="cursor-not-allowed hover:underline">
                      About
                    </Link>
                  </li>
                  <li key="now">
                    <Link href="/" className="cursor-not-allowed hover:underline">
                      Now
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="block text-center text-sm text-gray-500 dark:text-gray-400 sm:inline">
              © {new Date().getFullYear()}{' '}
              <Link href="/" className="hover:underline">
                Priyanshu Sharma{' '}
              </Link>
              <span className="hidden sm:inline">&#9679;</span>
              <span className="block sm:inline"> Have a good {weekday}</span>
            </span>
            <div className="mt-4 flex justify-center space-x-6 sm:mt-0">
              <Link
                href="https://github.com/PriyanshuCK/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                aria-label="Github"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/PriyanshuCK/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                aria-label="Linkedin"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 50 50" aria-hidden="true">
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                  />
                </svg>
              </Link>
              <Link
                href="mailto:priyanshu@priyanshusharma.dev"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                aria-label="Mail"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </Link>
              <Link
                href="https://twitter.com/PriyanshuCK"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
