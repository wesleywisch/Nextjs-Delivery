import { NextResponse } from 'next/server';

import { prisma } from '../../../../lib/prisma'

export async function GET(request: Request, { params }: { params: { tenant: string } }) {
  try {
    const slugTenant = params.tenant;

    const tenant = await prisma.tenant.findFirstOrThrow({
      where: {
        slug: slugTenant,
      }
    })

    const products = await prisma.product.findMany({
      where: {
        id_tenant: tenant.id,
      }
    })

    return NextResponse.json(products)
  } catch (er) {
    return NextResponse.error();
  }
}
