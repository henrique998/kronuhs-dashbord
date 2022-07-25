import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { Button } from '../components/Button'
import { Input } from '../components/Input'

import { api } from '../services/api'

import {
  ContentWrapper,
  ContentContainer,
  LogoWrapper,
  ForgotPasswordContainer,
  InputGroup,
} from '../styles/pages/forgotPassword'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();

  async function handleSendForgotPasswordMail(e: FormEvent) {
    e.preventDefault()

    setIsLoading(true)

    await api.post('/dashboard/password/forgot', {
        email
    })

    setIsLoading(false)

    setEmail('')

    router.push('/')
  }

  return (
    <ForgotPasswordContainer>
      <ContentWrapper>
        <header>
          <img src="/kronuhs-logo.svg" alt="logo marca" />
        </header>

        <ContentContainer>
          <div className="headingTexts">
            <h2>Recuperação de <span>senha</span></h2>

            <span>
                Você receberá um email com um código de validação para verificar 
                que você é um dos nossos usuários
            </span>
          </div>

          <form onSubmit={handleSendForgotPasswordMail}>
            <InputGroup>
              <label htmlFor="email">E-mail</label>
              <Input
                type="email"
                placeholder="Digite o seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <Button 
                title="Enviar código" 
                type="submit" 
                disabled={isLoading} 
                isLoading={isLoading}
            />
          </form>
        </ContentContainer>

        <footer>
          <span>&copy; Kronuhs Inc. 2022</span>
        </footer>
      </ContentWrapper>

      <LogoWrapper>
        <img src="/kronuhs-logo-lg.svg" alt="logo marca" />
      </LogoWrapper>
    </ForgotPasswordContainer>
  )
}
