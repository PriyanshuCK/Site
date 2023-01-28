import { useEffect, useState, Fragment } from 'react'
import { Popover, Transition, RadioGroup } from '@headlessui/react'
const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'stone',
]

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const stickyValue = localStorage.getItem(key)
    if (stickyValue !== null) {
      setValue(stickyValue)
    }
  }, [key, setValue])

  return [
    value,
    (v) => {
      localStorage.setItem(key, v)
      setValue(v)
    },
  ]
}

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

const ColorSwitch = (props) => {
  const value = Math.floor(Math.random() * 16)
  const [color, setColor] = useStickyState(colors[value], 'theme-color')
  const [current, setcurrent] = useStickyState(colors[value], 'theme-color')

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

  useEffect(() => {
    props.getColor(color)
  }, [setColor])

  return (
    <>
      <Popover className={`relative ${scrollDirection === 'down' ? '-top-80' : 'top-[-58px]'}`}>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                fixed right-[40px] z-[15] mx-4 mt-[68px] text-primary-400 focus:outline-none dark:text-primary-300 sm:right-[70px] md:right-[5px]`}
            >
              <span className="inline-flex items-center justify-center rounded-md p-2 hover:bg-primary-100 focus:outline-none dark:hover:bg-gray-800">
                <span className="sr-only">Open Color Switcher</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <div
                className={`fixed right-0 z-[15] mx-5 max-w-md transform rounded-lg bg-white/[0.50] backdrop-blur-md backdrop-filter transition-all duration-300 dark:bg-gray-900/[0.50] ${
                  scrollDirection === 'down' ? '-top-80' : 'top-[64px]'
                }`}
              >
                <Popover.Panel className={`relative`}>
                  <div className="overflow-hidden rounded-lg px-6 py-6 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div>
                      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                        {colors.map((color) => {
                          return (
                            <div
                              key={color}
                              className={`my-1 flex h-12 w-12 scale-90 cursor-pointer items-center justify-center rounded-lg font-semibold capitalize focus:outline-none dark:bg-gray-700 bg-${color}-50 ${
                                current === color
                                  ? `ring-1 ring-${color}-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800`
                                  : ''
                              }`}
                              onClick={() => {
                                setColor(color)
                                setcurrent(color)
                              }}
                            >
                              <div
                                className={`bg-${color}-500 h-6 w-6  dark:bg-${color}-300 rounded-full shadow-lg ${
                                  current === color
                                    ? `shadow-${color}-500`
                                    : `shadow-${color}-500/50`
                                }`}
                              ></div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </div>
            </Transition>
          </>
        )}
      </Popover>
      <div className="hidden">
        <div className="bg-red-50 shadow-red-500/50 ring-red-500"></div>
        <div className="bg-orange-50 shadow-orange-500/50 ring-orange-500"></div>
        <div className="bg-amber-50 shadow-amber-500/50 ring-amber-500"></div>
        <div className="bg-yellow-50 shadow-yellow-500/50 ring-yellow-500"></div>
        <div className="bg-lime-50 shadow-lime-500/50 ring-lime-500"></div>
        <div className="bg-green-50 shadow-green-500/50 ring-green-500"></div>
        <div className="bg-emerald-50 shadow-emerald-500/50 ring-emerald-500"></div>
        <div className="bg-teal-50 shadow-teal-500/50 ring-teal-500"></div>
        <div className="bg-cyan-50 shadow-cyan-500/50 ring-cyan-500"></div>
        <div className="bg-sky-50 shadow-sky-500/50 ring-sky-500"></div>
        <div className="bg-blue-50 shadow-blue-500/50 ring-blue-500"></div>
        <div className="bg-indigo-50 shadow-indigo-500/50 ring-indigo-500"></div>
        <div className="bg-violet-50 shadow-violet-500/50 ring-violet-500"></div>
        <div className="bg-purple-50 shadow-purple-500/50 ring-purple-500"></div>
        <div className="bg-fuchsia-50 shadow-fuchsia-500/50 ring-fuchsia-500"></div>
        <div className="bg-pink-50 shadow-pink-500/50 ring-pink-500"></div>
        <div className="bg-rose-50 shadow-rose-500/50 ring-rose-500"></div>
        <div className="bg-stone-50 shadow-stone-500/50 ring-stone-500"></div>

        <div className="bg-red-500 shadow-red-500"></div>
        <div className="bg-orange-500 shadow-orange-500"></div>
        <div className="bg-amber-500 shadow-amber-500"></div>
        <div className="bg-yellow-500 shadow-yellow-500"></div>
        <div className="bg-lime-500 shadow-lime-500"></div>
        <div className="bg-green-500 shadow-green-500"></div>
        <div className="bg-emerald-500 shadow-emerald-500"></div>
        <div className="bg-teal-500 shadow-teal-500"></div>
        <div className="bg-cyan-500 shadow-cyan-500"></div>
        <div className="bg-sky-500 shadow-sky-500"></div>
        <div className="bg-blue-500 shadow-blue-500"></div>
        <div className="bg-indigo-500 shadow-indigo-500"></div>
        <div className="bg-violet-500 shadow-violet-500"></div>
        <div className="bg-purple-500 shadow-purple-500"></div>
        <div className="bg-fuchsia-500 shadow-fuchsia-500"></div>
        <div className="bg-pink-500 shadow-pink-500"></div>
        <div className="bg-rose-500 shadow-rose-500"></div>
        <div className="bg-stone-500 shadow-stone-500"></div>
      </div>
    </>
  )
}

export default ColorSwitch
