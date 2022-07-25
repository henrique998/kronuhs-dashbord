import { InputHTMLAttributes, forwardRef } from 'react'
import { InputContainer } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement>

function InputComponent({ ...rest }: InputProps) {
  return <InputContainer {...rest} />
}

export const Input = forwardRef(InputComponent);
