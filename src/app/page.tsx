import PictureCard from '@/app/components/client/PictureCard'

export default function Home() {
  return (
    <main className="p-5">
      <section>
        <PictureCard
          src="/img/test.jpeg"
          alt="Test image"
          width={200}
          height={250}
        />
      </section>
    </main>
  )
}
