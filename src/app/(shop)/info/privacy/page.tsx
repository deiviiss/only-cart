import Link from 'next/link'
import { getEmailAdmin } from '@/actions'
import { ButtonBack, TitleHome } from '@/components'
import { Button } from '@/components/ui/button'

export default async function PrivacyPage() {
  const { emailAdmin } = await getEmailAdmin()
  return (
    <div className='px-1 sm:px-10 pt-5'>
      <TitleHome title="Políticas de Privacidad" subtitle='' />
      <div className='max-w-[920px] mx-auto'>
        <div className='px-3 py-4'>
          <p>
            En nuestra plataforma, valoramos y respetamos su privacidad. Esta Política de Privacidad explica cómo manejamos la información en nuestra plantilla que simula una tienda online de ropa y zapatos.
          </p>
        </div>

        <div className='px-3'>
          <TitleHome title="1. Información que Recopilamos" subtitle='' />
          <p className='pb-4'>
            Nuestra plantilla no recopila información personal como nombre, dirección de correo electrónico o número de teléfono. Los usuarios pueden explorar el catálogo, agregar productos al carrito y generar un enlace de WhatsApp para enviar sus pedidos directamente.
          </p>

          <TitleHome title="2. Uso de Enlaces a WhatsApp" subtitle='' />
          <p className='pb-4'>
            Cuando un usuario decide realizar una compra, se genera un enlace de WhatsApp que contiene los detalles del pedido. Al hacer clic en este enlace, el usuario es redirigido a WhatsApp para enviar el pedido directamente al propietario de la plataforma.
          </p>

          <TitleHome title="3. Seguridad de la Información" subtitle='' />
          <p className='pb-4'>
            Aunque no recopilamos información personal, nos aseguramos de que nuestra plataforma sea segura y funcione correctamente. Utilizamos prácticas estándar de la industria para proteger nuestra infraestructura contra accesos no autorizados y garantizar la integridad de nuestros servicios.
          </p>

          <TitleHome title="4. Enlaces a Terceros" subtitle='' />
          <p className='pb-4'>
            Nuestra plataforma puede contener enlaces a sitios web o servicios de terceros, como WhatsApp. No somos responsables de las prácticas de privacidad o el contenido de estos sitios externos. Recomendamos revisar las políticas de privacidad de cualquier servicio de terceros que utilice.
          </p>

          <TitleHome title="5. Cambios en esta Política de Privacidad" subtitle='' />
          <p className='pb-4'>
            Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Si realizamos cambios sustanciales, notificaremos dichos cambios en nuestra plataforma para mantenerlo informado sobre cómo pueden afectar su privacidad.
          </p>

          <p>
            Si tiene alguna pregunta sobre esta política de privacidad o cómo manejamos la información, no dude en ponerse en contacto con nosotros a través de nuestro formulario de contacto.
          </p>
        </div>

        <div className='flex justify-center w-full gap-4 m-8 text-center mx-auto'>
          <ButtonBack className='bg-destructive text-destructive-foreground hover:bg-destructive/90' name={'Regresar'} />

          <Button
            asChild
          >
            <Link target='_blank' href={`mailto:${emailAdmin?.email}?subject=Consulta%20sobre%20Política%20de%20Privacidad`}>
              Contáctanos
            </Link>
          </Button>

        </div>
      </div>
    </div>
  )
}
