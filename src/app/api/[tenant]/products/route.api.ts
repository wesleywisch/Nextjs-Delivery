import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '../../../../lib/prisma'

export async function GET(request: Request, { params }: { params: { tenant: string } }) {
  try {
    const slugTenant = params.tenant;

    const tenant = await prisma.tenant.findFirstOrThrow({
      where: {
        slug: slugTenant,
      }
    })

    if (!tenant) {
      return NextResponse.error();
    }

    const products = await prisma.product.findMany({
      where: {
        id_tenant: tenant.id,
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(products)
  } catch (er) {
    return NextResponse.error();
  }
}

export async function POST(request: Request, { params }: { params: { tenant: string } }) {
  try {
    const slugTenant = params.tenant;

    const tenant = await prisma.tenant.findFirstOrThrow({
      where: {
        slug: slugTenant,
      }
    })

    if (!tenant) {
      return NextResponse.error();
    }

    const bodySchema = z.object({
      name: z.string().min(3).max(100),
      image: z.string(),
      price: z.string(),
      description: z.string().optional(),
      category_id: z.string(),
    })

    const body = await request.json();
    const { description, image, name, price, category_id } = bodySchema.parse(body.data)
    console.log({ description, image, name, price, category_id })

    let category = await prisma.categories.findFirst({
      where: {
        id: category_id
      }
    })

    if (!category) {
      return NextResponse.error();
    }

    await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description,
        image,
        id_category: category.id,
        id_tenant: tenant.id,
      }
    })

    return NextResponse.json({}, { status: 200 })
  } catch (er) {
    return NextResponse.error();
  }
}

export async function PUT(request: Request, { params }: { params: { tenant: string } }) {
  try {
    const slugTenant = params.tenant;

    const tenant = await prisma.tenant.findFirstOrThrow({
      where: {
        slug: slugTenant,
      }
    })

    if (!tenant) {
      return NextResponse.error();
    }

    const bodySchemaUpdate = z.object({
      name: z.string().min(3).max(100),
      image: z.string(),
      price: z.string(),
      description: z.string().optional(),
      category_id: z.string(),
      productId: z.string().uuid(),
    })

    const body = await request.json();
    const { description, image, name, price, category_id, productId } = bodySchemaUpdate.parse(body.data)

    let category = await prisma.categories.findFirst({
      where: {
        id: category_id
      }
    })

    if (!category) {
      return NextResponse.error();
    }

    await prisma.product.updateMany({
      where: {
        id: productId,
      },
      data: {
        name,
        price: Number(price),
        description,
        image,
        id_category: category.id,
        id_tenant: tenant.id,
      }
    })

    return NextResponse.json({}, { status: 200 })
  } catch (er) {
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, { params }: { params: { tenant: string } }) {
  try {
    const slugTenant = params.tenant;

    const tenant = await prisma.tenant.findFirstOrThrow({
      where: {
        slug: slugTenant,
      }
    })

    if (!tenant) {
      return NextResponse.error();
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.error();
    }

    await prisma.product.delete({
      where: {
        id,
      }
    })

    return NextResponse.json({}, { status: 200 })
  } catch (er) {
    return NextResponse.error();
  }
}
