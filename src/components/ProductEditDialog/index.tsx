import { FormEvent } from "react";
import { Dialog, DialogContent, DialogTitle, Box, InputLabel, Input, TextField, Select, MenuItem, Button } from "@mui/material";

import { CategoryProduct } from "../../types/CategoryProduct";
import { Product } from "../../types/Product";

type ProductEditDialogProps = {
  open: boolean
  onClose: () => void
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  categories: CategoryProduct[]
  product?: Product | null;
  disabled?: boolean;
}

export function ProductEditDialog({ open, onClose, onSave, categories, product, disabled }: ProductEditDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          encType="multipart/form-data"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSave(event)
          }}
        >
          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="imgField">Imagem</InputLabel>
            <Input
              id="imgField"
              name="image"
              type="file"
              fullWidth
              disabled={disabled}
              inputProps={{ accept: 'image/*' }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="nameField">Nome</InputLabel>
            <TextField
              id="nameField"
              name="name"
              variant="standard"
              defaultValue={product && product.name}
              required
              fullWidth
              disabled={disabled}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="priceField">Preço (em R$)</InputLabel>
            <TextField
              id="priceField"
              name="price"
              type="number"
              variant="standard"
              defaultValue={product && product.price}
              required
              fullWidth
              disabled={disabled}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="descriptionField">Descrição</InputLabel>
            <TextField
              id="descriptionField"
              name="description"
              variant="standard"
              defaultValue={product && product.description}
              multiline
              rows={4}
              fullWidth
              disabled={disabled}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="categoryField">Categoria</InputLabel>
            <Select
              id="categoryField"
              name="category"
              variant="standard"
              defaultValue={product && product.category.id || categories[0]?.id}
              required
              fullWidth
              disabled={disabled}
            >
              {categories && categories.map((category, key) => (
                <MenuItem key={key} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button disabled={disabled} type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button disabled={disabled} type="submit">
              Salvar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
