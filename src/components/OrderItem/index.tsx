import { Box, Typography, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";

import { useFormatter } from "../../hooks/useFormatter";

import { OrderUserInTenant } from "../../types/OrderUserInTenant";
import { OrderStatus } from "../../types/OrderStatus";

type OrderItemProps = {
  order: OrderUserInTenant;
  onChangeStatus: (id: string, newStatus: OrderStatus) => void;
  onPrint: (order: OrderUserInTenant) => void;
}

export function OrderItem({ order, onChangeStatus, onPrint }: OrderItemProps) {
  const formatter = useFormatter();

  function getStatusBackground(status: OrderStatus) {
    const statuses = {
      preparing: '#2787ba',
      sent: '#999999',
      delivered: '#27ba3a',
    }

    return statuses[status];
  }

  return (
    <Box sx={{ border: '1px solid #eee', color: '#fff', borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        backgroundColor: getStatusBackground(order.status)
      }}
      >
        <Box>
          <Typography component="p">{formatter.formatDateOrdersTenant(order.orderDate)}</Typography>
          <Typography component="p">{order.userName}</Typography>

          <Button
            size="small"
            sx={{ color: '#fff', p: 0 }}
            onClick={() => onPrint(order)}
          >
            Imprimir
          </Button>
        </Box>

        <Box>
          <Typography component="p" sx={{ fontSize: 24 }}>#{order.id}</Typography>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: '#eee', p: 1 }}>
        <Select
          variant="standard"
          value={order.status}
          fullWidth
          onChange={(event: SelectChangeEvent) => onChangeStatus(order.id, event.target.value as OrderStatus)}
        >
          <MenuItem value="preparing">Preparando</MenuItem>
          <MenuItem value="sent">Enviado</MenuItem>
          <MenuItem value="delivered">Entregue</MenuItem>
        </Select>
      </Box>

      <Box sx={{ p: 1, backgroundColor: '#fff' }}>
        {order.products.map((productItem, key) => (
          <Typography
            key={key}
            component="p"
            sx={{ p: 1, color: '#000', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}
          >
            {`${productItem.quantity}x ${productItem.product.name}`}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
