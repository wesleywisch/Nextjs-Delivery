import { useEffect, useState } from "react";

import { useFormatter } from "../../hooks/useFormatter";

import { Container } from "./styles";

type QuantityProps = {
  tenantColor: string;
  quantityInitial: number;
  onUpdateQuantity: (newCount: number) => void;
  min?: number;
  max?: number;
  small?: boolean;
}

export function Quantity({ onUpdateQuantity, quantityInitial, tenantColor, max, min, small = false }: QuantityProps) {
  const [canRemove, setCanRemove] = useState(false);
  const [canAdd, setCanAdd] = useState(false);

  const formatter = useFormatter();

  function handleQuantity(action: string) {
    if (action === '-' && canRemove) {
      return onUpdateQuantity(quantityInitial - 1)
    }

    if (action === '+' && canAdd) {
      return onUpdateQuantity(quantityInitial + 1)
    }
  }

  useEffect(() => {
    setCanRemove(!min || (min && quantityInitial > min) ? true : false);
    setCanAdd(!max || (max && quantityInitial < max) ? true : false);
  }, [quantityInitial, min, max])

  return (
    <Container tenantColor={tenantColor} small={small}>
      <button
        className="buttonMinus"
        onClick={() => handleQuantity('-')}
        disabled={!canRemove}
      >
        -
      </button>

      <div className="qt">
        {formatter.formatQuantity(quantityInitial, 2)}
      </div>

      <button
        className="buttonAdd"
        onClick={() => handleQuantity('+')}
        disabled={!canAdd}
      >
        +
      </button>
    </Container >
  )
}
