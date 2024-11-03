'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProductImage } from '@/components'
import { ProductSizeSelector } from '@/components/product'
import { type Product, type ProductClothe, type ProductShoe, type ProductToy } from '@/interfaces'

interface Props {
  product: ProductToy | ProductShoe | ProductClothe | Product
  className?: string
}

export const ProductItem = ({ product, className }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.productImage[0].url)

  const handleMouseEnter = () => { setDisplayImage(product.productImage[1].url) }
  const handleMouseLeave = () => { setDisplayImage(product.productImage[0].url) }

  return (
    <div className={`flex-shrink-0 max-w-[300px] px-2 min-[400px]:max-w-[400px] md:max-w-[200px] lg:max-w-[240px] xl:max-w-[280px] ${className}`}>
      <Link href={`/product/${product.slug}`}>
        <ProductImage src={displayImage}
          alt={product.title}
          className='w-full object-cover object-top'
          width={600}
          height={600}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>

      <div className='flex gap-2 justify-between items-center text-sm sm:text-base mt-2'>
        <div className='flex flex-col gap-1 justify-between text-sm sm:text-base mt-2 text-black'>
          <Link
            href={`/product/${product.slug}`}
            className='font-bold'
          >
            {product.title}
          </Link>

          <span className='font-bold mt-2'>$ {product.price}</span>
        </div>

        <ProductSizeSelector product={product} />

      </div>
    </div>
  )
}
