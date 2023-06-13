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

    const categories = await prisma.categories.findMany()

    return NextResponse.json(categories)
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
    })

    const body = await request.json();
    const { name } = bodySchema.parse(body.data)

    const category = await prisma.categories.findFirst({
      where: {
        name: name.toLowerCase()
      }
    })

    if (category) {
      return NextResponse.error();
    }

    await prisma.categories.create({
      data: {
        name,
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
      id: z.string().uuid()
    })

    const body = await request.json();
    const { name, id } = bodySchemaUpdate.parse(body.data)

    await prisma.categories.update({
      where: {
        id,
      },
      data: {
        name,
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

    await prisma.categories.delete({
      where: {
        id,
      }
    })

    return NextResponse.json({}, { status: 200 })
  } catch (er) {
    return NextResponse.error();
  }
}
