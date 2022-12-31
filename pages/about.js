import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/siteMetadata'

export default function About() {
  return (
    <>
      <PageSEO title={`About - ${siteMetadata.author}`} description="About me" />
      <div className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-bold">About</h1>
      </div>
    </>
  )
}
