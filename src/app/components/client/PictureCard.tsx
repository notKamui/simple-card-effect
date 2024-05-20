'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import AnimatedCard from '@/app/components/client/AnimatedCard'

export type PictureCardProps = Readonly<{
  src: string
  alt: string
  width: number
  height: number
  className?: string
  style?: CSSProperties
}>

export default function PictureCard({
  src,
  alt,
  width,
  height,
  className,
  style = {},
}: PictureCardProps) {
  return (
    <AnimatedCard
      className={className}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </AnimatedCard>
  )
}
