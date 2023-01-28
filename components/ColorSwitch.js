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
  const [isShowing1, setIsShowing] = useState(false)

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
      <div className="mt-24 overflow-hidden rounded-lg px-6 py-6 shadow-lg ring-1 ring-black ring-opacity-5">
        <div>
          <RadioGroup value={color} onChange={setColor}>
            <RadioGroup.Label className="sr-only text-primary-500">Theme color</RadioGroup.Label>
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
              {colors.map((colour) => {
                return (
                  <>
                    <RadioGroup.Option
                      key={colour}
                      value={colour}
                      className="my-1 cursor-pointer rounded-full font-semibold capitalize focus:outline-none"
                    >
                      {({ checked }) => (
                        <span
                          key={colour}
                          className={`${
                            checked
                              ? 'rounded-lg bg-primary-50 p-3 ring-1 ring-primary-500 ring-offset-2 ring-offset-white dark:bg-gray-700 dark:ring-offset-gray-800'
                              : `rounded-lg p-3 bg-${colour}-50 dark:bg-gray-700`
                          }`}
                        >
                          <span
                            className={`${
                              checked
                                ? 'scale-105 rounded-full bg-primary-500 px-3 py-[2px] shadow-lg shadow-primary-500 dark:bg-primary-300'
                                : `rounded-full px-3 py-[2px] bg-${colour}-500 dark:bg-${colour}-300 shadow-lg shadow-${colour}-500/50`
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
    </>
  )
}

export default ColorSwitch
