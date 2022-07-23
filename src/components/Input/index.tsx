import { InputHTMLAttributes } from 'react'
import { Input } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement>

function InputComponent({ ...rest }: InputProps) {
  return <Input {...rest} />
}

export { InputComponent as Input }
