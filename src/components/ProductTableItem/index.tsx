import Image from "next/image";
import { TableCell, TableRow, Typography, Box, Button } from "@mui/material";
import { MdDelete, MdModeEditOutline } from 'react-icons/md'

import { useFormatter } from "../../hooks/useFormatter";

import { Product } from "../../types/Product"

type ProductTableItemProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductTableItem({ product, onEdit, onDelete }: ProductTableItemProps) {
  const formatter = useFormatter()

  return (
    <TableRow hover>
      <TableCell sx={{ width: 50, display: { xs: 'none', md: 'table-cell' } }}>
        {product.id}
      </TableCell>

      <TableCell sx={{ width: { xs: 50, md: 100 } }}>
        <Image
          src={product.image}
          alt={product.name}
          width={75}
          height={75}
        />
      </TableCell>

      <TableCell>
        <Typography component="strong">{product.name}</Typography>

        <Box sx={{ display: { md: 'none' } }}>
          {formatter.formatPrice(product.price)}
        </Box>
      </TableCell>

      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
        {formatter.formatPrice(product.price)}
      </TableCell>

      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
        {product.category.name}
      </TableCell>

      <TableCell sx={{ width: { xs: 50, md: 130 } }}>
        <Button size="small" onClick={() => onEdit(product)}>
          <MdModeEditOutline size={24} />
        </Button>

        <Button size="small" onClick={() => onDelete(product.id)}>
          <MdDelete size={24} />
        </Button>
      </TableCell>
    </TableRow>
  )
}
