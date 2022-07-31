import { useQuery } from '@tanstack/react-query'
import { Eye, Note, Scroll, Users } from 'phosphor-react'
import { AnalyticsCard } from '../components/AnalyticsCard'
import { useIs } from '../hooks'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { api } from '../services/api'
import { withSSRAuth } from '../utils/withSSRAuth'

import { HomeContainer, AnalyticsBox, PostMessageBox } from '../styles/pages/home'
import Link from 'next/link'

type Metrics = {
  blogUsersCount: number
  likesCount: number
  postsCount: number
  viewsCount: number
}

export default function Home() {
  const userCanSeeMetrics = useIs({
    roles: [
      {
        name: 'admin'
      }
    ]
  })

  const { data: metrics } = useQuery(['metrics'], async () => {
    if (userCanSeeMetrics) {
      return api.get<Metrics>('/dashboard/metrics')
    }
  })

  return (
    <DefaultLayout>
      <HomeContainer>
        {userCanSeeMetrics ? (
          <AnalyticsBox>
            <AnalyticsCard>
              <Eye size={32} />
              {metrics?.data.viewsCount} views
            </AnalyticsCard>

            <AnalyticsCard>
              <Users size={32} />
              {metrics?.data.blogUsersCount === 1 
                ? '1 usuário do blog' 
                : `${metrics?.data.blogUsersCount} usuários do blog`}
            </AnalyticsCard>

            <AnalyticsCard>
              <Note size={32} />
              {metrics?.data.postsCount === 1 ? `1 publicação` : `${metrics?.data.postsCount} publicações`}
            </AnalyticsCard>
          </AnalyticsBox>
        ) : (
          <PostMessageBox>
            <Scroll size={128} />

            <p>
              Que tal escrever um artigo sobre uma tecnologia legal, como: <br />
              html, css, javascript, rect, node e muito mais?
            </p>

            <Link href="/create-publication">
              <a>Escrever</a>
            </Link>
          </PostMessageBox>
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