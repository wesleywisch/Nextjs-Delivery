import { Container } from "./styles";

interface ButtonProps {
  tenantColor: string;
  label: string;
  handleOnClick: () => void;
  fill?: boolean;
  disabled?: boolean;
}

export function Button({ tenantColor, label, handleOnClick, fill, disabled }: ButtonProps) {
  return (
    <Container
      onClick={handleOnClick}
      disabled={disabled}
      textColor={fill ? '#fff' : tenantColor}
      borderColor={tenantColor}
      backgroundColor={fill ? tenantColor : 'transparent'}
    >
      {label}
    </Container>
  )
}
