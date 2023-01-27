import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const onkeydown = (event) => {
      if ((event.key === 'd' && (event.metaKey || event.ctrlKey)) || event.key === '\\') {
        event.preventDefault()
        setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
      }
    }
    window.addEventListener('keydown', onkeydown)
    return () => {
      window.removeEventListener('keydown', onkeydown)
    }
  }, [theme]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <div className="flex h-10 w-20 scale-[0.7] transform cursor-pointer items-center rounded-full bg-primary-400 shadow-lg shadow-primary-400 dark:bg-gray-500 dark:shadow-gray-600">
        <svg
          width="24"
          height="24"
          fill="none"
          className="z-10 translate-x-2 text-primary-400 transition duration-100 focus:scale-0 dark:text-gray-300"
        >
          <path
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <div className="h-8 w-8 -translate-x-5 transform !rounded-full bg-white shadow-md duration-300 dark:translate-x-5"></div>
        <svg
          width="24"
          height="24"
          fill="none"
          className="z-10 -translate-x-2 text-primary-100 transition duration-100 focus:scale-0 dark:text-gray-700"
        >
          <path
            d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </button>
  )
}

export default ThemeSwitch
