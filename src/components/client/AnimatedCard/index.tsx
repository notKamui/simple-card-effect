'use client'

import type { CSSProperties, ReactElement, RefObject, TouchEventHandler } from 'react'
import { Children, cloneElement, createElement, useMemo, useRef, useState } from 'react'
import './styles.module.css'
import { cn } from '@/utils/cn'

function getRootElementSize(rootElementRef: RefObject<HTMLDivElement>) {
  return {
    width: rootElementRef.current?.clientWidth
    ?? rootElementRef.current?.offsetWidth
    ?? rootElementRef.current?.scrollWidth
    ?? 0,
    height: rootElementRef.current?.clientHeight
    ?? rootElementRef.current?.offsetHeight
    ?? rootElementRef.current?.scrollHeight
    ?? 0,
  }
}

function useDynamicStyles() {
  return useState({
    container: {} as CSSProperties,
    shine: {} as CSSProperties,
    layersTransform: [] as CSSProperties[],
  } as const)
}

export type AnimatedCardProps = Readonly<{
  borderRadius?: string
  shineStrength?: number
  cursorPointer?: boolean

  className?: string
  style?: CSSProperties
  onClick?: () => void
  children?: ReactElement | ReactElement[]
}>

export default function AnimatedCard({
  borderRadius = '20px',
  shineStrength = 0.4,
  cursorPointer = true,
  className,
  style,
  onClick,
  children,
}: AnimatedCardProps) {
  const layers = useMemo(() => {
    if (!children) return [createElement('div', { style, className }, [])]
    return 'length' in children ? children : [children]
  }, [children, className, style]) as ReactElement[]
  const rootElementRef = useRef<HTMLDivElement>(null)
  const { width: rootElementWidth, height: rootElementHeight } = getRootElementSize(rootElementRef)

  const [isHovered, setHovered] = useState(false)

  const [dynamicStyles, setDynamicStyles] = useDynamicStyles()

  function handleMove(page: { pageX: number, pageY: number }) {
    if (rootElementRef.current === null) return
    const layerCount = layers ? layers.length : 1
    const bodyScrollTop = document.body.scrollTop || document.getElementsByTagName('html')[0].scrollTop
    const bodyScrollLeft = document.body.scrollLeft
    const offsets = rootElementRef.current.getBoundingClientRect()
    const widthCoefficient = 320 / rootElementWidth
    const coefficient = widthCoefficient * 0.07
    const offsetX = 0.52 - (page.pageX - offsets.left - bodyScrollLeft) / rootElementWidth
    const offsetY = 0.52 - (page.pageY - offsets.top - bodyScrollTop) / rootElementHeight
    const dy = page.pageY - offsets.top - bodyScrollTop - rootElementHeight / 2
    const dx = page.pageX - offsets.left - bodyScrollLeft - rootElementWidth / 2
    const yRotate = (offsetX - dx) * coefficient
    const xRotate = (dy - offsetY) * (Math.min(offsets.width / offsets.height, 1) * coefficient)
    const arad = Math.atan2(dy, dx)
    const rawAngle = (arad * 180) / Math.PI - 90
    const angle = rawAngle < 0 ? rawAngle + 360 : rawAngle

    setDynamicStyles({
      container: {
        transform: `rotateX(${xRotate}deg) rotateY(${yRotate}deg) ${
          isHovered ? ' scale3d(1.07,1.07,1.07)' : ''
        }`,
      },
      shine: {
        background: `linear-gradient(${angle}deg, rgba(255, 255, 255, ${
          ((page.pageY - offsets.top - bodyScrollTop) / rootElementHeight) * shineStrength
        }) 0%, rgba(255, 255, 255, 0) 80%)`,
        transform: `translateX(${offsetX * layerCount - 0.1}px) translateY(${
          offsetY * layerCount - 0.1
        }px)`,
      },
      layersTransform: layers.map((_, idx) => ({
        transform: `translateX(${
            offsetX * layerCount * ((idx) / widthCoefficient)
          }px) translateY(${
            offsetY * layerCount * ((idx) / widthCoefficient)
          }px)`,
      })),
    })
  }

  function handleTouchMove(e: Parameters<TouchEventHandler>[0]) {
    e.preventDefault()
    const { pageX, pageY } = e.touches[0]
    handleMove({ pageX, pageY })
  }

  function handleEnter() {
    setHovered(true)
  }

  function handleLeave() {
    setHovered(false)
    setDynamicStyles({
      container: {},
      shine: {},
      layersTransform: [],
    })
  }

  function Layers() {
    return (
      <div
        className={cn(
          'animated-card__layers relative z-[2] overflow-hidden bg-white',
          className,
        )}
        style={{
          borderRadius,
          transformStyle: 'preserve-3d',
          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
          ...style,
        }}
      >
        {
          dynamicStyles.layersTransform && Children.map(layers, (layer, index) =>
            cloneElement(layer, {
              className: 'transition-all duration-100 ease-out z-[4]',
              style: {
                ...layer.props.style,
                ...(dynamicStyles.layersTransform[index] ?? {}),
              },
            }))
        }
      </div>
    )
  }

  return (
    <div className="flex">
      <div
        onClick={onClick}
        className={cn(
          'animated-card',
          cursorPointer && 'cursor-pointer',
          isHovered ? 'z-[9]' : 'z-[unset]',
        )}
        style={{
          borderRadius,
          transformStyle: 'preserve-3d',
          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
          transform: `perspective(${rootElementWidth * 3}px)`,
        }}
        ref={rootElementRef}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onTouchMove={handleTouchMove}
        onTouchStart={handleEnter}
        onTouchEnd={handleLeave}
      >
        <div
          className="animated-card__container relative transition-all duration-200 ease-out"
          style={{
            borderRadius,
            ...dynamicStyles.container,
          }}
        >
          <div
            className="animated-card__shadow absolute inset-[5%] z-0 transition-all duration-200 ease-out"
            style={{
              boxShadow: isHovered
                ? '0 45px 100px rgba(14, 21, 47, 0.4), 0 16px 40px rgba(14, 21, 47, 0.4)'
                : '0 8px 30px rgba(14, 21, 47, 0.6)',
            }}
          >
          </div>
          <div
            className="animated-card__shine absolute inset-0 z-[8]"
            style={{
              borderRadius,
              background: `linear-gradient(135deg,rgba(255, 255, 255, ${shineStrength / 1.6}) 0%,rgba(255, 255, 255, 0) 60%)`,
              ...dynamicStyles.shine,
            }}
          >
          </div>
          <Layers />
        </div>
      </div>
    </div>
  )
}
