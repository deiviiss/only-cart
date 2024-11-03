'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoShirtOutline } from 'react-icons/io5'
import { logout } from '@/actions'
import { useUiStore } from '@/store'

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
  const closeMenu = useUiStore((state) => state.closeSideMenu)

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const isAdmin = session?.user?.role === 'admin'

  return (
    <div>
      {
        isSideMenuOpen && (
          <>
            {/* background */}
            <div className='fixed top-0 left-0 w-screen h-screen z-30 bg-black opacity-30'>
            </div>
            {/* blur */}
            <div onClick={closeMenu} className='fade-in fixed top-0 left-0 w-screen h-screen z-30 backdrop-filter backdrop-blur-sm'>
            </div>
          </>
        )
      }

      <nav className={
        clsx(
          'fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-[#D9D8D3] z-40 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )
      }>

        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* menú */}
        <div className='mt-16'>
          {
            isAdmin && (
              <>
                <Link href='/profile'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-5 p-2 hover:bg-black hover:text-white rounded-none transition-all'>
                  <IoPersonOutline size={30} />
                  <span className='ml-3 text-xl'>Perfil</span>
                </Link>
                <Link href='/admin/products'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-7 p-2 hover:bg-black hover:text-white rounded-none transition-all'>
                  <IoShirtOutline size={30} />
                  <span className='ml-3 text-xl'>Productos</span>
                </Link>
              </>)
          }

          {/* divisor */}
          <div className="w-full h-px bg-black rounded transition-all mt-5"></div>
        </div>

        {
          !isAuthenticated
            ? (
              <Link href='/auth/login'
                onClick={() => { closeMenu() }}
                className='flex items-center mt-7 p-2 hover:bg-black hover:text-white rounded-none transition-all'>
                <IoLogInOutline size={30} />
                <span className='ml-3 text-xl'>Ingresar</span>
              </Link>)
            : (
              <>
                <button
                  onClick={() => {
                    logout()
                    closeMenu()
                    window.location.replace('/auth/login')
                  }}
                  className='flex items-center w-full mt-7 p-2 hover:bg-black hover:text-white rounded-none transition-all'>
                  <IoLogOutOutline size={30} />
                  <span className='ml-3 text-xl'>Salir</span>
                </button>
              </>)
        }

      </nav >

    </div >
  )
}
