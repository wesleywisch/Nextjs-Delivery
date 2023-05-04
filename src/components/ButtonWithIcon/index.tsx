import { Container } from "./styles";

import CardIcon from './icons/card.svg';
import CheckedIcon from './icons/checked.svg';
import CouponIcon from './icons/coupon.svg';
import LocationIcon from './icons/location.svg';
import MoneyIcon from './icons/money.svg';
import RightArrowIcon from './icons/right-arrow.svg';

type ButtonWithIconProps = {
  tenantColor: string;
  leftIcon?: 'card' | 'coupon' | 'location' | 'money';
  rightIcon?: 'checked' | 'rightArrow';
  value: string;
  onClick?: () => void;
  fill?: boolean;
}

export function ButtonWithIcon({ leftIcon, tenantColor, value, fill, onClick, rightIcon }: ButtonWithIconProps) {
  return (
    <Container
      onClick={onClick}
      tenantColor={tenantColor}
      bgColor={fill}
    >
      <div className="leftSide">
        {leftIcon && (
          <>
            {leftIcon === 'card' && <CardIcon color={fill ? '#fff' : tenantColor} />}
            {leftIcon === 'coupon' && <CouponIcon color={fill ? '#fff' : tenantColor} />}
            {leftIcon === 'location' && <LocationIcon color={fill ? '#fff' : tenantColor} />}
            {leftIcon === 'money' && <MoneyIcon color={fill ? '#fff' : tenantColor} />}
          </>
        )}
      </div>

      <div className="centerSide" title={value}>
        <span>{value}</span>
      </div>

      <div className="rightSide">
        {rightIcon && (
          <>
            {rightIcon === 'checked' && <CheckedIcon color={fill ? '#fff' : tenantColor} />}
            {rightIcon === 'rightArrow' && <RightArrowIcon color={fill ? '#fff' : tenantColor} />}
          </>
        )}
      </div>
    </Container>
  )
}
