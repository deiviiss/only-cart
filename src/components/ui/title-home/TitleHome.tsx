import { titleFont } from '@/config/fonts'

interface TitleProps {
  title: string
  subtitle: string
  className?: string
}

export const TitleHome = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`px-3 my-4 ${className}`}>
      <h1 className={`${titleFont.className} text-xl antialiased`}>{title}</h1>
      {subtitle && (
        <h3 className="-mt-5 text-[56px] font-black">{subtitle}</h3>
      )}
    </div>
  )
}
