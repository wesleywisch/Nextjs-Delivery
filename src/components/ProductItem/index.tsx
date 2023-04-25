import Image from "next/image";

import { Product } from "../../types/Product";

import { Container } from "./styles";
import Link from "next/link";

type ProductItemProps = {
  data: Product;
  tenantPrimaryColor: string;
  tenantSecondaryColor: string;
}

export function ProductItem({ data, tenantPrimaryColor, tenantSecondaryColor }: ProductItemProps) {
  return (
    <Container
      tenantPrimaryColor={tenantPrimaryColor}
      tenantSecondaryColor={tenantSecondaryColor}
    >
      <Link href={`/product/${data.id}`}>
        <div className="head" />

        <div className="info">
          <div className="containerImg">
            <Image
              src={data.image}
              alt={data.name}
              className="productImg"
              width={100}
              height={100}
            />
          </div>

          <p className="categoryName" title={data.categoryName}>{data.categoryName}</p>
          <p className="productName" title={data.name}>{data.name}</p>
          <p className="productPrice" title={data.price}>{data.price}</p>
        </div>
      </Link>
    </Container>
  )
}
