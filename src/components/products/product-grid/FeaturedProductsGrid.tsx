'use client'

import Image from 'next/image'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { type ProductType } from '@/interfaces'

interface Props {
  products: ProductType[]
}

export const FeaturedProductsGrid = ({ products }: Props) => {
  return (
    <div className="w-full bg-[#f8f4ed] relative">
      <Carousel
        opts={{
          align: 'start'
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-full">
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="flex justify-center items-start p-6 gap-8">

                  <div className="flex-1 aspect-square relative">
                    <Image
                      src={`/products/${product.productImage[0].url}`}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='absolute right-0 -top-2 flex w-20 h-7'>
          <CarouselPrevious className="bg-transparent border-none hover:bg-transparent text-black">
            <IoIosArrowBack className="h-8 w-8" />
          </CarouselPrevious>
          <CarouselNext className="bg-transparent border-none hover:bg-transparent text-black">
            <IoIosArrowForward className="h-8 w-8" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  )
}
