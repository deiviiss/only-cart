import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPaginationFeaturedProducts, getPaginationProducts } from '@/actions'
import { FeaturedProductsGrid, CurrentProductsGrid, TitleHome, HeaderHero } from '@/components'
import { Button } from '@/components/ui/button'

interface Props {
  searchParams: {
    query?: string
    page?: string
    take?: string
  }
}

export default async function ShopPage({ searchParams }: Props) {
  const query = searchParams.query || ''
  const page = searchParams.page ? Number(searchParams.page) : 1

  const { products } = await getPaginationProducts({ page, query })

  const { products: featuredProducts } = await getPaginationFeaturedProducts({ page, query })

  const { products: shoeProducts } = await getPaginationProducts({ page, category: 'shoe' })

  const { products: clotheProducts } = await getPaginationProducts({ page, category: 'clothe' })

  if (!products || !featuredProducts) {
    return notFound()
  }

  return (
    <>
      {/* one featuredProduct */}
      <HeaderHero />

      {/* featured products */}
      <div className='py-10 mb-10 sm:px-10 bg-[#F7F3EC] px-1'>

        {/* divisor */}
        <div className="w-full h-px bg-gray-900 rounded transition-all mt-10 mb-12"></div>

        <div className='grid grid-cols-9 mb-12'>
          <TitleHome
            title="Lo esencial reinventado"
            subtitle=""
            className='col-span-5 capitalize'
          />

          <Button asChild variant='outline' className='col-span-4 border-2 border-black hover:bg-black hover:text-white h-14 text-base capitalize bg-[#F7F3EC]'>
            <Link href='/products'>
              ver todo
            </Link>
          </Button>
        </div>
        <FeaturedProductsGrid products={featuredProducts} />
      </div>

      {/* Clothe */}
      <div className='py-10 mb-10 sm:px-10 bg-[#F7F3EC] px-1'>

        {/* divisor */}
        <div className="w-full h-px bg-gray-900 rounded transition-all mt-10 mb-12"></div>

        <div className='grid grid-cols-9 mb-12'>
          <TitleHome
            title="Lo más reciente en ropa"
            subtitle=""
            className='col-span-5 capitalize'
          />

          <Button asChild variant='outline' className='col-span-4 border-2 border-black hover:bg-black hover:text-white h-14 text-base capitalize bg-[#F7F3EC]'>
            <Link href='/category/clothe'>
              ver todo
            </Link>
          </Button>
        </div>
        <CurrentProductsGrid products={clotheProducts} />
      </div>

      {/* Shoe */}
      <div className='py-10 mb-10 sm:px-10 bg-[#F7F3EC] px-1'>

        {/* divisor */}
        <div className="w-full h-px bg-gray-900 rounded transition-all mt-10 mb-12"></div>

        <div className='grid grid-cols-9 mb-12'>
          <TitleHome
            title="Lo más reciente en calzado"
            subtitle=""
            className='col-span-5 capitalize'
          />

          <Button asChild variant='outline' className='col-span-4 border-2 border-black hover:bg-black hover:text-white h-14 text-base capitalize bg-[#F7F3EC]'>
            <Link href='/category/shoe'>
              ver todo
            </Link>
          </Button>
        </div>
        <FeaturedProductsGrid products={shoeProducts} />
      </div>

    </>
  )
}
