'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BiSolidCart } from 'react-icons/bi'
import { IoSearchOutline } from 'react-icons/io5'
import { TbMenu } from 'react-icons/tb'
import { titleFont } from '@/config/fonts'
import { useCartStore, useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className={'fixed top-0 z-20 flex items-center w-full px-1 sm:px-10 justify-between py-3 bg-[#D9D8D3] border-b-[1px] border-black'}>
      {/* logo */}
      <Link href={'/'} className={`${titleFont.className} antialiased font-medium text-2xl pl-4 w-full`}>
        Only + Cart
      </Link>

      <div className='flex flex-col w-full items-end'>
        {/* cart menu */}
        <div className="flex items-center w-auto">
          <Link
            href={'/products?autofocus=true'}
            className={`${titleFont.className} my-2 p-2 text-lg transition-all flex items-center hover:bg-black hover:text-white`}
          >
            <IoSearchOutline className="w-5 h-5" />
          </Link>
          <Link
            href={totalItems === 0 && loaded ? '/empty' : '/cart'}
            className="mx-2"
          >
            <div className="flex items-end gap-1">
              <BiSolidCart className="w-7 h-7"></BiSolidCart>
              {loaded && totalItems > 0 && (
                <span className="fade-in">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          <button
            type="button"
            onClick={openMenu}
            className={`${titleFont.className} mx-2 px-2 rounded-none text-lg transition-all`}
          >
            <TbMenu className='w-7 h-7' />
          </button>
        </div>

        {/* categories */}
        <div className="flex w-full justify-center md:justify-end">
          <Link
            href={'/category/clothe'}
            className={`${titleFont.className} mx-2 px-2 text-lg transition-all hover:bg-black hover:text-white`}
          >
            Ropa
          </Link>
          <Link
            href={'/category/shoe'}
            className={`${titleFont.className} mx-2 px-2 text-lg transition-all hover:bg-black hover:text-white`}
          >
            Zapatos
          </Link>
        </div>
      </div>
    </nav>
  )
}
