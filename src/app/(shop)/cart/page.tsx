import Link from 'next/link'
import { OrderSummary } from './ui/OrderSummary'
import { ProductsInCart } from './ui/ProductsInCart'
import { getPaginationProducts } from '@/actions'
import { ButtonShopWhatsApp, CurrentProductsGrid, TitleHome } from '@/components'
import { Button } from '@/components/ui/button'

export default async function CartPage() {
  const { products } = await getPaginationProducts({ page: 1 })
  return (
    <>
      <div className='mt-[60.67px] pt-10 px-1 sm:px-5 md:px-10 lg:px-14 xl:px-20'>
        <h1 className='col-span-5 capitalize text-2xl text-start'
        > Carrito de compras</h1>
        <div className="flex justify-start items-center mb-20 px-1 sm:px-0">

          <div className="flex flex-col w-full">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

              {/* cart */}
              <div className="flex flex-col gap-1 mt-3">
                <span className=" text-xl">Agregar más artículos</span>
                <Link href="/" className="underline mb-5 hover:text-black/80">
                  Continua comprando
                </Link>

                {/* items */}
                <ProductsInCart />

              </div>

              {/* summary */}
              <div className='bg-[#D9D8D3] rounded-xl shadow-xl p-7 h-fit'>
                <h2 className='text-2xl mb-2'>Resumen del pedido</h2>

                <OrderSummary />

                <div className='mt-5 mb-2 w-full'>
                  <ButtonShopWhatsApp />
                  {/* <Button
                    asChild
                    className='w-full'
                  >
                    <Link
                      href="/checkout/shipping-method"
                    >
                      Comprar
                    </Link>
                  </Button> */}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className='pb-10 my-10 border-t border-black'>
        <TitleHome
          title="Recomendados para ti"
          subtitle="Lo más nuevo"
          className='col-span-5 capitalize text-center pt-4'
        />
        <CurrentProductsGrid products={products} />
        <Button asChild variant='outline' className='col-span-4 border-2 border-black hover:bg-black hover:text-white h-14 text-base capitalize bg-[#F7F3EC] flex justify-center mx-auto w-3/4 max-w-32 mt-[52px]'>
          <Link href='/products'>
            ver todo
          </Link>
        </Button>
      </div>
    </>
  )
}
