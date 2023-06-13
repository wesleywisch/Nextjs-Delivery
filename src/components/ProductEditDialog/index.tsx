import { FormEvent } from "react";
import { Dialog, DialogContent, DialogTitle, Box, InputLabel, Input, TextField, Select, MenuItem, Button } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'

import { CategoryProduct } from "../../types/CategoryProduct";
import { Product } from "../../types/Product";
import { useApiTenant } from "../../hooks/useApi-Tenant";

type ProductEditDialogProps = {
  open: boolean
  onClose: () => void
  getDataApi: () => void
  categories: CategoryProduct[]
  product?: Product | null;
}

const createOrEditFormSchema = z.object({
  name: z.string().min(3).max(100),
  image: z.string().url(),
  price: z.string(),
  description: z.string().optional(),
  category_id: z.string(),
})

type createOrEditFormData = z.infer<typeof createOrEditFormSchema>

export function ProductEditDialog({ open, onClose, categories, product, getDataApi }: ProductEditDialogProps) {
  const api = useApiTenant();

  const { handleSubmit, register, reset, formState: { isSubmitting } } = useForm<createOrEditFormData>({
    resolver: zodResolver(createOrEditFormSchema),
  })

  async function handleSaveEditOrCreateDialog(data: createOrEditFormData) {
    try {
      if (product === null) {
        const response = await api.createProduct(data)

        if (response === true) {
          onClose()
          reset()
        } else {
          // fazer a verificação de erro.
        }
      }

      if (product !== null && product !== undefined) {
        const response = await api.updateProduct({
          ...data,
          productId: product.id,
        })

        if (response === true) {
          onClose()
          reset()
        } else {
          // fazer a verificação de erro.
        }
      }

      getDataApi()
    } catch (err) {
      console.log(err)
      // fazer a verificação de erro.
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleSaveEditOrCreateDialog)}
        >
          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="imgField">Imagem</InputLabel>
            {/* <Input
              id="imgField"
              type="file"
              fullWidth
              disabled={isSubmitting}
              inputProps={{ accept: 'image/*' }}
              {...register('imageUrl')}
            /> */}
            <TextField
              id="imgField"
              variant="standard"
              defaultValue={product && product.image}
              required
              fullWidth
              disabled={isSubmitting}
              {...register('image')}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="nameField">Nome</InputLabel>
            <TextField
              id="nameField"
              variant="standard"
              defaultValue={product && product.name}
              required
              fullWidth
              disabled={isSubmitting}
              {...register('name')}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="priceField">Preço (em R$)</InputLabel>
            <TextField
              id="priceField"
              // type="number"
              variant="standard"
              pattern="[0-9]+([.][0-9]+)?"
              defaultValue={product && product.price}
              required
              fullWidth
              disabled={isSubmitting}
              {...register('price')}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="descriptionField">Descrição</InputLabel>
            <TextField
              id="descriptionField"
              variant="standard"
              defaultValue={product && product.description}
              multiline
              rows={4}
              fullWidth
              disabled={isSubmitting}
              {...register('description')}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor="categoryField">Categoria</InputLabel>
            <Select
              id="categoryField"
              variant="standard"
              defaultValue={product && product.category.id || categories[0]?.id}
              required
              fullWidth
              disabled={isSubmitting}
              {...register('category_id')}
            >
              {categories && categories.map((category, key) => (
                <MenuItem key={key} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button disabled={isSubmitting} type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button disabled={isSubmitting} type="submit">
              Salvar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
