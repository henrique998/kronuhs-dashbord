import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import { Button } from '../components/Button'
import { Input } from '../components/Input'

import { useAuth } from '../hooks'
import { api } from '../services/api'

import {
  ContentWrapper,
  ContentContainer,
  LogoWrapper,
  ChangePasswordContainer,
  InputGroup,
} from '../styles/pages/changePassword'

export default function ForgotPassword() {
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { query, push } = useRouter()

  const { token } = query
  

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault()

    setIsLoading(true)

    if (!token) {
      alert('Token is not present')
    }

    await api.post(`/dashboard/password/reset?token=${token}`, {
      password,
    })

    setIsLoading

    push('/')

  }

  return (
    <ChangePasswordContainer>
      <ContentWrapper>
        <header>
          <img src="/kronuhs-logo.svg" alt="logo marca" />
        </header>

        <ContentContainer>
          <div className="headingTexts">
            <h2>Alteração de <span>senha</span></h2>

            <span>Crie uma nova senha para acessar a plataforma</span>
          </div>

          <form onSubmit={handleChangePassword}>
            <InputGroup>
              <label htmlFor="password">Nova senha</label>

              <Input
                id='password'
                type="password"
                placeholder="Digite uma senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <label htmlFor="passwordConfirmation">Confirmação da nova senha</label>

              <Input
                id="passwordConfirmation"
                type="passwordConfirmation"
                placeholder="Confirme a senha..."
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </InputGroup>

            <Button 
                title="Alterar senha" 
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
    </ChangePasswordContainer>
  )
}
