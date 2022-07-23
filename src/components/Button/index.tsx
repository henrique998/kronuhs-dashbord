import { ButtonHTMLAttributes } from 'react'

import { Button } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isDraft?: boolean;
}

function ButtonComponent({ title, isDraft, ...rest }: ButtonProps) {
  return <Button isDraft={isDraft} {...rest}>{title}</Button>
}

export { ButtonComponent as Button }
