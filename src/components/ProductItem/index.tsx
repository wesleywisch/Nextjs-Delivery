import Link from "next/link";
import Image from "next/image";

import { useAppContext } from "../../hooks/useAppContext";
import { useFormatter } from "../../hooks/useFormatter";

import { Product } from "../../types/Product";

import { Container } from "./styles";

type ProductItemProps = {
  data: Product;
}

export function ProductItem({ data }: ProductItemProps) {
  const { tenant } = useAppContext();
  const formatter = useFormatter();

  return (
    <Container
      tenantPrimaryColor={tenant?.tenantPrimaryColor ? tenant?.tenantPrimaryColor : '#000'}
      tenantSecondaryColor={tenant?.tenantSecondaryColor ? tenant?.tenantSecondaryColor : '#000'}
    >
      <Link href={`/${tenant?.slug}/product/${data.id}`}>
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

          <span className="categoryName" title={data.categoryName}>{data.categoryName}</span>
          <p className="productName" title={data.name}>{data.name}</p>
          <span
            title={formatter.formatPrice(data.price)}
            className="productPrice"
          >
            {formatter.formatPrice(data.price)}
          </span>
        </div>
      </Link>
    </Container>
  )
}
