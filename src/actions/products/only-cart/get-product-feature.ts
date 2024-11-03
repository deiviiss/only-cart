'use server'

import { processProductByType } from '@/actions'
import { type Product, type ProductType } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getProductFeatured = async (): Promise<ProductType | null> => {
  try {
    const featuredProduct = await prisma.featuredProduct.findFirst({
      where: {
        product: {
          category: {
            name: 'clothe'
          }
        }
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            description: true,
            history: true,
            price: true,
            slug: true,
            isActive: true,
            categoryId: true,
            createdAt: true,
            productImage: {
              select: {
                id: true,
                url: true,
                productId: true
              }
            },
            category: {
              select: {
                id: true,
                name: true,
                description: true
              }
            }
          }
        }
      }
    })

    const product: Product | null = featuredProduct ? featuredProduct.product : null

    if (!product) {
      return null
    }

    const productProcessed = await processProductByType(product)

    return productProcessed
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
