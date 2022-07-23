import { FormEvent, useState } from 'react'
import Link from 'next/link'

import { Button } from '../components/Button'
import { Input } from '../components/Input'

import {
  ContentWrapper,
  ContentContainer,
  LogoWrapper,
  SignInContainer,
  InputGroup,
} from '../styles/pages/signin'
import { useAuth } from '../hooks'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  async function handleSignIn(e: FormEvent) {
    e.preventDefault()

    await signIn({
      email,
      password,
    })

    setEmail('')
    setPassword('')
  }

  return (
    <SignInContainer>
      <ContentWrapper>
        <header>
          <img src="/kronuhs-logo.svg" alt="logo marca" />
        </header>

        <ContentContainer>
          <div className="headingTexts">
            <h2>Login</h2>

            <span>somente usuários autorizados podem acessar a plataforma</span>
          </div>

          <form onSubmit={handleSignIn}>
            <InputGroup>
              <label htmlFor="email">E-mail</label>
              <Input
                type="email"
                placeholder="Digite o seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <label htmlFor="password">Senha</label>
              <Input
                type="password"
                placeholder="Digite a sua senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <Button title="Entrar" type="submit" />
          </form>

            <Link href="/forgot-password" >
              <a className="forgotPasswordLink">
                Esqueceu a senha?
              </a>
            </Link>
        </ContentContainer>

        <footer>
          <span>&copy; Kronuhs Inc. 2022</span>
        </footer>
      </ContentWrapper>

      <LogoWrapper>
        <img src="/kronuhs-logo-lg.svg" alt="logo marca" />
      </LogoWrapper>
    </SignInContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {

  const { '@kronuhs-dashboard:token': token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}