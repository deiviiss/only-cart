'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getPhoneNumberAdmin } from '@/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

const noticeConfirmShop = () => {
  toast.success('Mensaje creado', {
    position: 'top-right',
    duration: 3000,
    style: {
      backgroundColor: '#F7F3EC'
    }
  })
}

export const ButtonShopWhatsApp = () => {
  const [loaded, setLoaded] = useState(false)
  const [phoneNumberAdmin, setPhoneNumberAdmin] = useState<string | null>(null)
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { subtotal, itemsInCart } = useCartStore(state => state.getSummaryInformation())

  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(true)
      if (itemsInCart === 0) {
        router.push('/empty')
        return
      }

      try {
        const { phoneNumberAdmin } = await getPhoneNumberAdmin()
        setPhoneNumberAdmin(`${phoneNumberAdmin?.phoneNumber}`)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching phone number:', error)
      }
    }

    fetchData()
  }, [itemsInCart, router])

  if (!loaded) {
    return (
      <p className='animate-pulse'>Cargando...</p>
    )
  }

  if (!phoneNumberAdmin) {
    return (
      <p className='animate-pulse'>Cargando...</p>
    )
  }

  const productDetail = cart.map(product => {
    return `• ${product.title} - ${product.clotheSize || 'Tamaño no especificado'}, Cantidad: ${product.quantity}, Precio: ${currencyFormat(product.price)}`
  }).join('\n')

  const message = `Hola, me gustaría hacer el siguiente pedido:\n\n${productDetail}\n\nTotal: ${currencyFormat(subtotal)}`

  const messageCodified = encodeURIComponent(message)

  const whatsAppLink = `https://wa.me/${phoneNumberAdmin}?text=${messageCodified}`

  const handleButtonShopWhatsApp = () => {
    noticeConfirmShop()
    setIsDialogOpen(true)
  }

  const handleClearCart = () => {
    clearCart()
    setIsDialogOpen(false)
  }

  const handleKeepCart = () => {
    setIsDialogOpen(false)
  }
  return (
    <>
      <Button
        asChild
        className='w-full'
      >
        <Link
          href={whatsAppLink}
          passHref
          target='_blank'
          onClick={
            handleButtonShopWhatsApp
          }
        >
          Comprar ahora
        </Link>
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='bg-[#F7F3EC]'>
          <DialogHeader>
            <DialogTitle>¿Desea borrar el carrito?</DialogTitle>
            <DialogDescription>
              El mensaje de WhatsApp ha sido creado. ¿Desea borrar el carrito o mantenerlo?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleKeepCart}>
              Mantener carrito
            </Button>
            <Button onClick={handleClearCart}>
              Borrar carrito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {
        isDialogOpen && (
          <Link href={whatsAppLink} target='_blank' className="hidden" />
        )
      }
    </>
  )
}
