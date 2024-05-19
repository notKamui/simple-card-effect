import AnimatedCard from '@/components/client/AnimatedCard'

export default function Home() {
  return (
    <main className="p-5">
      <AnimatedCard
        style={{
          backgroundColor: 'blueviolet',
          transition: 'transform 0.5s ease-out',
          width: '200px',
          height: '250px',
        }}
        shineStrength={0.5}
        borderRadius="10px"
      />
    </main>
  )
}
