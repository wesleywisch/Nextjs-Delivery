import { Container } from "./styles";

import MenuIcon from './icons/menu.svg';
import CartIcon from './icons/cart.svg';
import FavIcon from './icons/fav.svg';
import OrderIcon from './icons/order.svg';
import ConfigIcon from './icons/config.svg';
import LogoutIcon from './icons/logout.svg';

type SidebarMenuItemProps = {
  color: string;
  label: string;
  icon?: 'menu' | 'cart' | 'fav' | 'order' | 'config' | 'logout';
  handleClick: () => void;
  shortly?: boolean;
}

export function SidebarMenuItem({ color, label, icon, handleClick, shortly }: SidebarMenuItemProps) {
  return (
    <Container
      onClick={handleClick}
      shortly={shortly}
      title={shortly ? 'Em Breve' : label}
    >
      {icon === 'menu' && <MenuIcon color={color} />}
      {icon === 'cart' && <CartIcon color={color} />}
      {icon === 'fav' && <FavIcon color={color} />}
      {icon === 'order' && <OrderIcon color={color} />}
      {icon === 'config' && <ConfigIcon color={color} />}
      {icon === 'logout' && <LogoutIcon color={color} />}

      <span>{label}</span>
    </Container>
  )
}
