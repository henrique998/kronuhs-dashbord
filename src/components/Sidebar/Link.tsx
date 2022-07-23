import { ReactNode } from 'react'
import NextLink from 'next/link'
import { LinkContainer } from './styles'
import { useRouter } from 'next/router'

interface LinkProps {
  children: ReactNode
  path: string
}

export function Link({ children, path }: LinkProps) {
  const { pathname } = useRouter()

  return (
    <LinkContainer isActive={pathname === path}>
      <NextLink href={path}>
        <a className="contentLink">{children}</a>
      </NextLink>
    </LinkContainer>
  )
}
