'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import AnimatedCard from '@/app/components/client/AnimatedCard'

export type PictureCardProps = Readonly<{
  src: string
  alt: string
  width: number
  className?: string
  style?: CSSProperties
} & (
  {
    height: number
  } | {
    aspectRatio: number
  }
)>

export default function PictureCard({
  src,
  alt,
  width,
  className,
  style = {},
  ...props
}: PictureCardProps) {
  const height = 'height' in props
    ? props.height
    : width / props.aspectRatio

  return (
    <AnimatedCard
      className={className}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...style,
      }}
      cursorPointer={false}
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
