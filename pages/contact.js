import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'

export default function Contact() {
  return (
    <>
      <PageSEO title={`Contact - ${siteMetadata.author}`} description="Contact" />
      <div className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-bold">Contact</h1>
      </div>
    </>
  )
}
