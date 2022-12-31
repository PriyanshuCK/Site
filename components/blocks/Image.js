import Image from 'next/image'
export default function ImageBlock({ src, caption }) {
  return (
    <div className="flex justify-center">
      <figure className="my-3 flex max-w-md flex-col items-center">
        <Image src={src} alt={caption} className="mb-[2px] max-h-80 rounded-lg shadow-lg" />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  )
}
