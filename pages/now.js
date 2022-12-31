import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'

export default function Now() {
  return (
    <>
      <PageSEO title={`Now - ${siteMetadata.author}`} description="Now" />
      <div className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-bold">Now</h1>
      </div>
    </>
  )
}
