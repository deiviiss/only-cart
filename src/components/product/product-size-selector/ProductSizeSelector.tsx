'use client'

import { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { ButtonAddToCart } from '@/components/product'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type ProductClothe, type ProductShoe, type ShoeSize, type ClotheSize, type ProductToy, type Product } from '@/interfaces'
import { isClothe, isShoe } from '@/utils/productTypeGuards'

interface Props {
  product: (ProductShoe | ProductClothe) & { availableSizes?: ShoeSize[] | ClotheSize[] } | ProductToy | Product
}

export const ProductSizeSelector = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<ShoeSize | ClotheSize | undefined>(undefined)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (!product) {
    return null
  }

  const handleSizeSelect = (value: string) => {
    if (isShoe(product)) {
      setSelectedSize(Number(value) as ShoeSize)
    } else if (isClothe(product)) {
      setSelectedSize(value as ClotheSize)
    }
  }

  const handleAddToCart = () => {
    setIsDialogOpen(false)
    setSelectedSize(undefined)
  }

  if (isShoe(product) || isClothe(product)) {
    const productToAdd = {
      ...product,
      ...(isShoe(product) ? { shoeSize: selectedSize as ShoeSize } : { clotheSize: selectedSize as ClotheSize })
    }

    return (
      product.availableSizes.length > 0
        ? (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant='outline'
                className='font-semibold bg-[#D9D8D3] text-black'
              >
                <IoAdd className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#F7F3EC]">
              <DialogHeader>
                <DialogTitle>Selecciona una talla</DialogTitle>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <Select onValueChange={handleSizeSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder='Selecciona una talla' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {product.availableSizes.map((size) => (
                        <SelectItem
                          key={size}
                          className='capitalize'
                          value={`${size}`}
                        >{size}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {selectedSize
                  ? (
                    <ButtonAddToCart
                      product={productToAdd}
                      setSelectedShoeSize={isShoe(product) ? setSelectedSize : undefined}
                      setSelectedClotheSize={isClothe(product) ? setSelectedSize : undefined}
                      handleAddToCart={handleAddToCart}
                      className='font-semibold uppercase w-full   bg-[#D9D8D3] text-secondary-foreground'
                    />)
                  : (
                    <Button
                      disabled
                      variant='secondary'
                      className='font-semibold uppercase w-full'
                    >
                      Agregar
                    </Button>)
                }
              </div>
            </DialogContent>
          </Dialog>)
        : (
          <div className='grid items-center gap-x-1 gap-y-2 my-3'>
            <p className='mt-12 h-10 px-4 py-2 text-center rounded-none text-sm bg-yellow-200 text-secondary-foreground uppercase font-semibold'>Agotado</p>
          </div>)
    )
  }

  return null
}
