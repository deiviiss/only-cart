import Link from 'next/link'
import { getEmailAdmin } from '@/actions'
import { ButtonBack, TitleHome } from '@/components'
import { Button } from '@/components/ui/button'

export default async function TermsPage() {
  const { emailAdmin } = await getEmailAdmin()
  return (
    <div className='px-1 sm:px-10 pt-5'>
      <TitleHome title="Términos y Condiciones" subtitle='' />
      <div className='max-w-[920px] mx-auto'>
        <div className='px-3 py-4'>
          <p className='text-base antialiased'>
            Bienvenido a nuestra plataforma. Este es un template que simula una tienda online de ropa y zapatos. Al utilizar nuestros servicios, aceptas los siguientes términos y condiciones de uso. Si no estás de acuerdo con estos términos, te recomendamos no utilizar nuestros servicios.
          </p>
        </div>

        <div className='px-3'>
          <TitleHome title='1. Servicios Simulados' subtitle='' />
          <p className='pb-4'>
            Este sitio web es una simulación de un ecommerce. Los productos agregados al carrito no serán entregados y no se realizarán transacciones financieras. Los enlaces generados para enviar pedidos a través de WhatsApp son únicamente para demostrar el funcionamiento de la plantilla.
          </p>

          <TitleHome title='2. Envío de Pedidos' subtitle='' />
          <p className='pb-4'>
            Al proceder a la compra, se generará un enlace de WhatsApp que contendrá los detalles de los productos seleccionados. Al hacer clic en este enlace, serás redirigido a WhatsApp para enviar el pedido directamente al propietario de la plataforma. No se almacenan ni procesan pagos a través de esta plantilla.
          </p>

          <TitleHome title='3. Uso de la Plataforma' subtitle='' />
          <p className='pb-4'>
            La plataforma está diseñada para ser una herramienta de demostración. Los usuarios pueden explorar el catálogo de productos, añadir artículos al carrito y generar enlaces de WhatsApp para simular pedidos. No está destinada para uso comercial real.
          </p>

          <TitleHome title='4. Propiedad Intelectual' subtitle='' />
          <p className='pb-4'>
            Todos los contenidos, diseños, logotipos y marcas comerciales presentes en esta plataforma son propiedad exclusiva del propietario de la plantilla. Queda prohibida la reproducción, distribución o modificación de cualquier contenido sin el permiso explícito del propietario.
          </p>

          <TitleHome title='5. Limitación de Responsabilidad' subtitle='' />
          <p className='pb-4'>
            Dado que esta plataforma es una simulación, no nos hacemos responsables de ningún daño directo, indirecto, incidental o consecuente que surja del uso de esta plantilla. El uso de la plataforma se realiza bajo tu propio riesgo.
          </p>

          <TitleHome title='6. Enlaces a Terceros' subtitle='' />
          <p className='pb-4'>
            Nuestra plataforma puede contener enlaces a sitios web o servicios de terceros, como WhatsApp. No somos responsables de las prácticas de privacidad o el contenido de estos sitios externos. Te recomendamos revisar las políticas de privacidad de cualquier servicio de terceros que utilices.
          </p>

          <TitleHome title='7. Modificaciones' subtitle='' />
          <p className='pb-4'>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Te recomendamos revisar periódicamente esta página para estar al tanto de los cambios. El uso continuo de nuestros servicios después de los cambios constituirá tu aceptación de los términos modificados.
          </p>

          <TitleHome title='8. Ley Aplicable' subtitle='' />
          <p className='pb-4'>
            Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes aplicables. Cualquier disputa que surja en relación con estos términos será resuelta exclusivamente por los tribunales competentes.
          </p>
        </div>

        <div className='flex justify-center w-full gap-4 m-8 text-center mx-auto'>
          <ButtonBack className='bg-destructive text-destructive-foreground hover:bg-destructive/90' name={'Regresar'} />

          <Button
            asChild
          >
            <Link target='_blank' href={`mailto:${emailAdmin?.email}?subject=Consulta%20sobre%20Términos%20y%20Condiciones`}>
              Contáctanos
            </Link>
          </Button>

        </div>
      </div>
    </div>
  )
}
