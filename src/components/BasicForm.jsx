import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  username: yup.string().required('The name is required'),
  password: yup.string().min(6, 'The created password must have at least 6 characters.'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'The passwords do not match').required('Confirm your password')
})

export const BasicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register('username')} placeholder='Usurename' />
      {errors.username && <p>{errors.username.message}</p>}
      <input type='password' {...register('password')} placeholder='Password' />
      {errors.password && <p>{errors.password.message}</p>}
      <input type='password' {...register('confirmPassword')} placeholder='Confirm password' />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <button type='submit'>Enviar</button>
    </form>
  )
}
