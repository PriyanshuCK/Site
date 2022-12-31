import SectionContainer from './SectionContainer'
import Footer from './Footer'
import Header from './Header'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <SectionContainer>
        <div className="flex flex-col justify-between">
          <main className="mb-auto mt-20 sm:mt-[100px]">{children}</main>
        </div>
      </SectionContainer>
      <Footer />
    </>
  )
}

export default LayoutWrapper
