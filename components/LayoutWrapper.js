import SectionContainer from './SectionContainer'
import Footer from './Footer'
import Header from './Header'
import ColorSwitch from './ColorSwitch'
import { useState, useCallback } from 'react'

const LayoutWrapper = ({ children }) => {
  // const [color, setColor] = useState('emerald')
  const color = 'emerald'
  // const getColor = useCallback((newColor) => {
  //   setColor(newColor)
  // }, [])
  return (
    <>
      <div
        className={`${
          color && `theme-${color}`
        } selection:bg-primary-200 selection:text-primary-900`}
      >
        <Header />
        <ColorSwitch />

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
