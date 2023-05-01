import { useRouter } from "next/router";

import { Button } from "../Button";
import { SidebarMenuItem } from "./SidebarMenuItem";

import { useAuthContext } from "../../hooks/useAuthContext";

import { Tenant } from "../../types/Tenant";

import { Container } from "./styles";

type SidebarProps = {
  tenant: Tenant;
  open: boolean;
  handleCloseSidebar: () => void;
}

export function Sidebar({ tenant, open, handleCloseSidebar }: SidebarProps) {
  const { user, setToken } = useAuthContext();
  const router = useRouter();

  return (
    <Container
      tenantPrimaryColor={tenant.tenantPrimaryColor}
      open={open}
    >
      <div className="areaSidebar">
        <div className="headerSidebar">
          <div className="loginAreaSidebar">
            {user && (
              <div className="userInfoSidebar">
                <strong title={user.name}>{user.name}</strong>
                <span title={`Último pedido há 3 semanas.`}>Último pedido há 3 semanas.</span>
              </div>
            )}

            {!user && (
              <Button
                tenantColor={tenant.tenantPrimaryColor}
                handleOnClick={() => router.push(`${tenant.slug}/login`)}
                label="Fazer login"
                fill
              />
            )}
          </div>

          <button
            onClick={handleCloseSidebar}
            className="closeBtnSidebar">
            x
          </button>
        </div>

        <div className="lineSidebar" />

        <div className="menuSidebar">
          <SidebarMenuItem
            color="#6a7d8b"
            label="Cardápio"
            icon="menu"
            handleClick={handleCloseSidebar}
          />
          <SidebarMenuItem
            color="#6a7d8b"
            label="Sacola"
            icon="cart"
            handleClick={() => router.push(`${tenant.slug}/cart`)}
          />
          <SidebarMenuItem
            color="#6a7d8b"
            label="Favoritos"
            icon="fav"
            handleClick={() => { }}
            shortly
          />
          <SidebarMenuItem
            color="#6a7d8b"
            label="Meus pedidos"
            icon="order"
            handleClick={() => router.push(`${tenant.slug}/orders`)}
          />
          <SidebarMenuItem
            color="#6a7d8b"
            label="Configurações"
            icon="config"
            handleClick={() => { }}
            shortly
          />
        </div>

        <div className="menuBottom">
          {user && (
            <SidebarMenuItem
              color="#6a7d8b"
              label="Sair"
              icon="logout"
              handleClick={() => {
                setToken('')
                handleCloseSidebar();
              }}
            />
          )}
        </div>
      </div>
    </Container>
  )
}
