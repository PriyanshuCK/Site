import SectionContainer from './SectionContainer'
import Footer from './Footer'
import Header from './Header'
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

const LayoutWrapper = ({ children }) => {
  const value = Math.floor(Math.random() * 16)
  const [color, setColor] = useStickyState(colors[0], 'theme-color')
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
      <div
        className={`${
          color && `theme-${color}`
        } selection:bg-primary-200 selection:text-primary-900`}
      >
        <Header />

        <Popover className={`relative ${scrollDirection === 'down' ? '-top-80' : 'top-[-58px]'}`}>
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                fixed right-[40px] z-[15] mx-4 mt-20 w-fit rounded-full bg-primary-500 p-2 ring-2 ring-primary-500 ring-offset-2 transition-all duration-300 focus:outline-none dark:bg-primary-300 dark:ring-primary-300 dark:ring-offset-gray-900 sm:right-[70px] md:right-[5px]`}
              >
                <span></span>
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
                <div className="fixed right-0 z-[15]">
                  <Popover.Panel
                    className={`relative mx-5 mt-3 max-w-md transform rounded-lg bg-white/[0.50] backdrop-blur-md backdrop-filter transition-all duration-300 dark:bg-gray-900/[0.50] ${
                      scrollDirection === 'down' ? '-top-80' : 'top-[110px]'
                    }`}
                  >
                    <div className="overflow-hidden rounded-lg px-6 py-6 shadow-lg ring-1 ring-black ring-opacity-5">
                      <div>
                        <RadioGroup value={color} onChange={setColor}>
                          <RadioGroup.Label className="sr-only text-primary-500">
                            Theme color
                          </RadioGroup.Label>
                          <div className="hidden">
                            <div className="bg-red-50 shadow-red-500/50"></div>
                            <div className="bg-orange-50 shadow-orange-500/50"></div>
                            <div className="bg-amber-50 shadow-amber-500/50"></div>
                            <div className="bg-yellow-50 shadow-yellow-500/50"></div>
                            <div className="bg-lime-50 shadow-lime-500/50"></div>
                            <div className="bg-green-50 shadow-green-500/50"></div>
                            <div className="bg-emerald-50 shadow-emerald-500/50"></div>
                            <div className="bg-teal-50 shadow-teal-500/50"></div>
                            <div className="bg-cyan-50 shadow-cyan-500/50"></div>
                            <div className="bg-sky-50 shadow-sky-500/50"></div>
                            <div className="bg-blue-50 shadow-blue-500/50"></div>
                            <div className="bg-indigo-50 shadow-indigo-500/50"></div>
                            <div className="bg-violet-50 shadow-violet-500/50"></div>
                            <div className="bg-purple-50 shadow-purple-500/50"></div>
                            <div className="bg-fuchsia-50 shadow-fuchsia-500/50"></div>
                            <div className="bg-pink-50 shadow-pink-500/50"></div>
                            <div className="bg-rose-50 shadow-rose-500/50"></div>
                            <div className="bg-stone-50 shadow-stone-500/50"></div>

                            <div className="bg-red-500"></div>
                            <div className="bg-orange-500"></div>
                            <div className="bg-amber-500"></div>
                            <div className="bg-yellow-500"></div>
                            <div className="bg-lime-500"></div>
                            <div className="bg-green-500"></div>
                            <div className="bg-emerald-500"></div>
                            <div className="bg-teal-500"></div>
                            <div className="bg-cyan-500"></div>
                            <div className="bg-sky-500"></div>
                            <div className="bg-blue-500"></div>
                            <div className="bg-indigo-500"></div>
                            <div className="bg-violet-500"></div>
                            <div className="bg-purple-500"></div>
                            <div className="bg-fuchsia-500"></div>
                            <div className="bg-pink-500"></div>
                            <div className="bg-rose-500"></div>
                            <div className="bg-stone-500"></div>
                          </div>
                          <div className="flex flex-wrap justify-center gap-x-3 gap-y-6">
                            {colors.map((color) => {
                              return (
                                <>
                                  <RadioGroup.Option
                                    key={color}
                                    value={color}
                                    className="my-1 cursor-pointer rounded-full font-semibold capitalize focus:outline-none"
                                  >
                                    {({ checked }) => (
                                      <span
                                        className={`${
                                          checked
                                            ? 'rounded-lg bg-primary-50 p-3 ring-1 ring-primary-500 ring-offset-2 ring-offset-white dark:bg-gray-700 dark:ring-offset-gray-800'
                                            : `rounded-lg p-3 bg-${color}-50 dark:bg-gray-700`
                                        }`}
                                      >
                                        <span
                                          className={`${
                                            checked
                                              ? 'scale-105 rounded-full bg-primary-500 px-3 py-[2px] shadow-lg shadow-primary-500 dark:bg-primary-300'
                                              : `rounded-full px-3 py-[2px] bg-${color}-500 dark:bg-${color}-300 shadow-lg shadow-${color}-500/50`
                                          }`}
                                        ></span>
                                      </span>
                                    )}
                                  </RadioGroup.Option>
                                </>
                              )
                            })}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </Popover.Panel>
                </div>
              </Transition>
            </>
          )}
        </Popover>

        <SectionContainer>
          <div className="flex flex-col justify-between">
            <main className="mb-auto mt-20 sm:mt-[100px]">{children}</main>
          </div>
        </SectionContainer>
        <Footer />
      </div>
    </>
  )
}

export default LayoutWrapper
