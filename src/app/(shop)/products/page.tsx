import { notFound } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'
import { getPaginationProducts } from '@/actions'
import { Pagination, ProductsGrid, ProductSearch, ButtonBack, TitleHome } from '@/components'

interface Props {
  searchParams: {
    query?: string
    page?: string
    take?: string
    autofocus?: boolean
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const query = searchParams.query || ''
  const page = searchParams.page ? Number(searchParams.page) : 1
  const autofocus = searchParams.autofocus

  const { products, totalPages } = await getPaginationProducts({ page, query })
  if (!products) {
    notFound()
  }

  return (
    <>
      <div className='flex justify-between mb-6 gap-2'>
        <ProductSearch placeholder='Buscar producto...' autoFocus={autofocus} />

        <ButtonBack className=' text-black hover:no-underline hover:text-gray-900 text-xl flex gap-1 p-2 min-[960px]:hidden rounded-none' icon={<IoArrowBackOutline />} />
        <ButtonBack className='text-gray-900 hover:no-underline hover:text-gray-600 text-xl hidden min-[960px]:flex gap-1 pl-0' name='Regresar' icon={<IoArrowBackOutline />} />
      </div>
      <TitleHome
        title='Productos'
        subtitle='Lo más nuevo'
        className='col-span-5 capitalize text-center'
      />

      {
        products.length > 0
          ? (
            <>
              <ProductsGrid products={products} />

              <Pagination totalPages={totalPages} />
            </>)
          : (
            <div className='flex w-full items-center justify-center h-36'>
              <p>No hay productos con ese nombre</p>
            </div>)
      }
    </>
  )
}