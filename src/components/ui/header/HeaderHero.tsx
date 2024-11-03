import Link from 'next/link'
import { getPhoneNumberAdmin } from '@/actions'
import { getProductFeatured } from '@/actions/products/only-cart'
import { ProductImage } from '@/components/product/product-image/ProductImage'
import { titleFont } from '@/config/fonts'

export const HeaderHero = async () => {
  const featuredProduct = await getProductFeatured()

  const product = {
    title: featuredProduct?.title || 'Bolsa de tela',
    urlImage: featuredProduct?.productImage[0].url || '/images/placeholder.png',
    slug: featuredProduct?.slug || 'bolsa-de-tela',
    price: featuredProduct?.price || 1890
  }

  const { phoneNumberAdmin } = await getPhoneNumberAdmin()

  const message = `Hola, me gustaría hacer el siguiente pedido:

*${product.title}*
Cantidad: 1
Precio: $${product.price}`

  const messageCodified = encodeURIComponent(message)

  const whatsAppLink = `https://wa.me/${phoneNumberAdmin?.phoneNumber}?text=${messageCodified}`

  return (
    <div className='bg-[#D9D8D3] py-16 sm:px-10'>
      <div className='sm:grid sm:grid-cols-9'>
        {/* left container */}
        <div className='sm:col-span-4 flex flex-col justify-center'>
          <div className='w-full flex flex-col justify-between items-center px-10 pb-10 max-h-full'>
            <h1 className={`${titleFont.className} w-full my-4 font-normal text-[28px]`}>
              <span className='italic font-light'>Nuevo</span> {product.title}
            </h1>

            <div className='w-full flex justify-end'>
              <Link
                href={whatsAppLink}
                passHref
                target='_blank'
                className='text-[28px] font-extralight italic text-right border-b border-black'>
                Comprar ahora
              </Link>
            </div>

          </div>
        </div>

        {/* right container */}
        <div className='sm:col-span-5 justify-end flex'>
          <ProductImage
            src={product.urlImage}
            alt={product.title}
            width={600}
            height={600}
            className="object-right object-cover"
          />
        </div>

      </div>
    </div>
  )
}
