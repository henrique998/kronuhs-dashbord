import { ReactNode } from 'react'

import { AnalyticsCardContainer } from './styles'

interface AnalyticsCardProps {
  children: ReactNode
}

export function AnalyticsCard({ children }: AnalyticsCardProps) {
  return <AnalyticsCardContainer>{children}</AnalyticsCardContainer>
}
