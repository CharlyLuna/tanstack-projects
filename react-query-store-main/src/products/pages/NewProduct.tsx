import { Button, Image, Input, Textarea } from "@nextui-org/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useProductMutation } from ".."

interface FormInputs {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const NewProduct = () => {
  const productMutation = useProductMutation()

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "Chaqueta cafe",
      price: 800,
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "men's clothing",
      image:
        "https://m.media-amazon.com/images/I/61KrhhwsGZL._AC_UF894,1000_QL80_.jpg",
    },
  })

  const newImage = watch("image")

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    productMutation.mutate(data)
  }

  return (
    <div className='w-full flex-col'>
      <h1 className='text-2xl font-bold'>Nuevo producto</h1>

      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col md:flex-row justify-around items-center gap-8'>
          <div className='flex-col w-full max-w-[500px]'>
            <Controller
              control={control}
              name='title'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className='mt-2'
                  type='text'
                  label='Titulo del producto'
                />
              )}
            />
            <Controller
              control={control}
              name='price'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className='mt-2'
                  type='number'
                  label='Precio del producto'
                />
              )}
            />
            <Controller
              control={control}
              name='image'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className='mt-2'
                  type='url'
                  label='Url del producto'
                />
              )}
            />
            <Controller
              control={control}
              name='description'
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className='mt-2'
                  label='Descripcion del producto'
                />
              )}
            />
            <Controller
              control={control}
              name='category'
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className='rounded-md p-3 mt-2 bg-gray-800 w-full'
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value='jewelery'>Jewelery</option>
                  <option value='electronics'>Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              isDisabled={productMutation.isPending}
              className='mt-2'
              type='submit'
              color='primary'
            >
              {productMutation.isPending ? "cargando..." : "Crear producto"}
            </Button>
          </div>

          <div className='bg-white rounded-2xl p-10 flex items-center h-[500px] min-w-[250px] max-w-[400px]'>
            <Image className='object-cover' src={newImage} />
          </div>
        </div>
      </form>
    </div>
  )
}
