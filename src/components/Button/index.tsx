import { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tenantColor: string;
  label: string;
  handleOnClick: (event: any) => void;
  fill?: boolean;
}

export function Button({ tenantColor, label, handleOnClick, fill, ...rest }: ButtonProps) {
  return (
    <Container
      onClick={handleOnClick}
      textColor={fill ? '#fff' : tenantColor}
      borderColor={tenantColor}
      backgroundColor={fill ? tenantColor : 'transparent'}
      {...rest}
    >
      {label}
    </Container>
  )
}
