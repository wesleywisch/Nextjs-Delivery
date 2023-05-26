import Image from "next/image";

import { Quantity } from "../Quantity";

import { useFormatter } from "../../hooks/useFormatter";

import { Product } from "../../types/Product";

import { Container } from "./styles";

type CartProductItemProps = {
  tenantColor: string;
  productQuantity: number;
  product: Product;
  onChange: (newCount: number, id: string) => void;
  noEdit?: boolean;
}

export function CartProductItem({ tenantColor, productQuantity, product, onChange, noEdit }: CartProductItemProps) {
  const formatter = useFormatter();

  return (
    <Container tenantColor={tenantColor}>
      <div className="productItemImage">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
        />
      </div>

      <div className="productItemInfo">
        <span className="productItemCategory" title={product.category.name}>
          {product.category.name}
        </span>

        <p className="productItemName" title={product.name}>
          {product.name}
        </p>

        <span
          title={formatter.formatPrice(product.price)}
          className="productItemPrice"
        >
          {formatter.formatPrice(product.price)}
        </span>
      </div>

      <div className="productItemQuantityControl">
        {noEdit ? (
          <div className="qtAreaNoEdit">
            <div className="qtNoEditTitle">
              <p>Qnt.</p>
            </div>
            <div className="qtNoEditCount">
              <span>{productQuantity}</span>
            </div>
          </div>
        ) : (
          <Quantity
            tenantColor={tenantColor}
            quantityInitial={productQuantity}
            onUpdateQuantity={
              (newCount: number) => onChange(newCount, product.id)
            }
            min={0}
            small
          />
        )}
      </div>
    </Container>
  )
}
