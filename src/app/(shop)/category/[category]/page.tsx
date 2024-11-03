import { type Metadata, type ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'
import { getPaginationProducts } from '@/actions'
import { Pagination, ProductsGrid, ProductSearch, ButtonBack, TitleHome } from '@/components'
import { type CategoryName } from '@/interfaces'

interface Props {
  params: {
    category: CategoryName
  }
  searchParams: {
    query?: string
    page?: string
    take?: string
  }
}

const description: Record<CategoryName, string> = {
  toy: 'Lo más divertido',
  clothe: 'Lo más reciente en ropa',
  shoe: 'Lo más reciente en zapatos'
}

const labels: Record<CategoryName, string> = {
  toy: 'Juguetes',
  clothe: 'Ropa',
  shoe: 'Zapatos'
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const categoryName = params.category

  return {
    title: `Categoría de ${description[categoryName]}`,
    description: `${labels[categoryName]} en descuento.`,
    openGraph: {
      title: `Categoría de ${description[categoryName]}`,
      description: `${labels[categoryName]} en descuento.`
    }
  }
}

export default async function CategoryByPage({ params, searchParams }: Props) {
  const categoryName = params.category
  const query = searchParams.query || ''
  const page = searchParams.page ? Number(searchParams.page) : 1

  const result = await getPaginationProducts({ page, query, category: categoryName })

  if (!result) {
    notFound()
  }

  const { products, totalPages } = result

  return (
    <div className='mt-[60.67px] pt-10'>
      <div className='flex justify-between mb-6 gap-2'>
        <ProductSearch placeholder={`Buscar producto en ${labels[categoryName].toLowerCase()}`} />

        <ButtonBack className=' text-black hover:no-underline hover:text-gray-600 text-xl flex gap-1 p-2 min-[960px]:hidden rounded-none' icon={<IoArrowBackOutline />} />
        <ButtonBack className='text-gray-900 hover:no-underline hover:text-gray-600 text-xl hidden min-[960px]:flex gap-1 pl-0' name='Regresar' icon={<IoArrowBackOutline />} />
      </div>

      <TitleHome
        title={`${description[categoryName]}`}
        subtitle={`${labels[categoryName]}`}
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
    </div>
  )
}
