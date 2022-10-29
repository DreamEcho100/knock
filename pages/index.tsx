import type { NextPage } from 'next'
import HomeScreen from 'components/screens/Home'
import DefaultLayout from '@components/layouts/Default'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <HomeScreen />
    </DefaultLayout>
  )
}

export default Home
