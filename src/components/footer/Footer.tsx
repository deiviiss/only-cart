import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-[#D9D8D3] py-8 px-10 print:hidden text-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1fr,200px,1fr] gap-8 max-w-[1600px] mx-auto">
          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
            <p className="text-sm text-gray-800">Nuestra plantilla simula una tienda online de ropa y zapatos, permitiendo a los usuarios explorar el catálogo, añadir al carrito y enviar pedidos fácilmente a través de WhatsApp. Además, incluye un panel administrativo para gestionar los productos de manera sencilla.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={'/'} className="text-gray-800 hover:text-gray-500">Inicio</Link></li>
              <li>
                <Link href={'/category/clothe'}
                  className="text-gray-800 hover:text-gray-500 p-0"
                >Ropa</Link></li>
              <li><Link href={'/category/shoe'} className="text-gray-800 hover:text-gray-500">Zapatos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/info/terms" className="text-gray-800 hover:text-gray-500">Términos y condiciones</Link></li>
              <li><Link href="/info/privacy" className="text-gray-800 hover:text-gray-500">Política de privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-800">
          <p><span>© {new Date().getFullYear()}</span> Only - Cart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
