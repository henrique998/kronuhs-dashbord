import { Eye, Note, Users } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { AnalyticsCard } from '../components/AnalyticsCard'
import { useIs } from '../hooks'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { api } from '../services/api'
import { AnalyticsBox, HomeContainer } from '../styles/pages/home'
import { withSSRAuth } from '../utils/withSSRAuth'

type Metrics = {
  blogUsersCount: number
  likesCount: number
  postsCount: number
  viewsCount: number
}

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics>()

  useEffect(() => {
    api.get<Metrics>('/dashboard/metrics')
     .then(res => setMetrics(res.data))
  }, [])

  const userCanSeeMetrics = useIs({
    roles: [
      {
        name: 'admin'
      }
    ]
  })

  return (
    <DefaultLayout>
      <HomeContainer>
        {userCanSeeMetrics ? (
          <AnalyticsBox>
            <AnalyticsCard>
              <Eye size={32} />
              {metrics?.viewsCount} views
            </AnalyticsCard>

            <AnalyticsCard>
              <Users size={32} />
              {metrics?.blogUsersCount} usuários do blog
            </AnalyticsCard>

            <AnalyticsCard>
              <Note size={32} />
              {metrics?.postsCount === 1 ? `1 publicação` : `${metrics?.postsCount} publicações`}
            </AnalyticsCard>
          </AnalyticsBox>
        ) : (
          <h1>Não pode visualizar</h1>
        )}
      </HomeContainer>
    </DefaultLayout>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})