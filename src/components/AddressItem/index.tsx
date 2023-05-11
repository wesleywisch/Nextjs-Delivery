import { Address } from "../../types/Address";

import DotsIcon from './icons/dots.svg';
import LocationIcon from './icons/location.svg';
import EditIcon from './icons/edit.svg';
import DeleteIcon from './icons/delete.svg';

import { Container } from "./styles";

type AddressItemProps = {
  tenantColor: string
  address: Address;
  onSelect: (address: Address) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  menuOpened: string;
  setMenuOpened: (id: string) => void;
}

export function AddressItem({ tenantColor, address, onSelect, onEdit, onDelete, menuOpened, setMenuOpened }: AddressItemProps) {
  return (
    <Container>
      <div className="addressArea" onClick={() => onSelect(address)}>
        <div className="addressIcon">
          <LocationIcon color={tenantColor} />
        </div>

        <div className="addressText">
          <p>{`${address.street} ${address.number}, ${address.city}`} {`${address.street} ${address.number}, ${address.city}`} {`${address.street} ${address.number}, ${address.city}`} {`${address.street} ${address.number}, ${address.city}`}</p>
        </div>
      </div>

      <div className="btnArea">
        <div
          className="menuIcon"
          onClick={() => setMenuOpened(address.id)}
        >
          <DotsIcon color={'#6a7d8b'} />
        </div>

        {menuOpened === address.id && (
          <div className="popup">
            <div className="popupItem" onClick={() => onEdit(address.id)}>
              <div className="popupIcon">
                <EditIcon color={'#96a3ab'} />
              </div>
              <div className="popupText">
                <span>Editar</span>
              </div>
            </div>

            <div className="popupItem" onClick={() => onDelete(address.id)}>
              <div className="popupIcon">
                <DeleteIcon color={'#96a3ab'} />
              </div>
              <div className="popupText">
                <span>Deletar</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
