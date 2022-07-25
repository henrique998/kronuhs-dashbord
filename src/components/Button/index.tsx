import { ButtonHTMLAttributes } from 'react'
import { LoadingSpinner } from '../LoadingSpinner';

import { Button } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isDraft?: boolean;
  isLoading?: boolean;
}

function ButtonComponent({ title, isDraft, isLoading, ...rest }: ButtonProps) {
  return (
    <Button isDraft={isDraft} {...rest}>
      {isLoading ? <LoadingSpinner /> : title}
    </Button>
  )
}

export { ButtonComponent as Button }
