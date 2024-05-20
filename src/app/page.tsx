import PictureCard from '@/app/components/client/PictureCard'

export default function Home() {
  return (
    <main className="p-5">
      <section className="jumbo">
        <h2 className="bigtitle">
          Bienvenue à bord
        </h2>
        <p className="big">
          Je suis <strong>Mathilde Petit</strong>, Graphiste, Illustratrice,
          ainsi que Directrice Artistique Junior basée à Paris et Rennes.
          Vous vous apprêtez à faire de <strong>Petit Voyages Graphiques</strong>.
        </p>
      </section>
      <section>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad commodi consequuntur error eveniet explicabo facilis
        fuga illo libero nemo nisi odio pariatur quaerat quis recusandae vitae voluptate, voluptatibus? Quisquam, voluptate.
      </section>
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
