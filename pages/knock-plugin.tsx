import type { NextPage } from 'next'

import KnockScreen from 'components/screens/Knock'
import DefaultLayout from '@components/layouts/Default'

const KnockPluginPage: NextPage = () => {
  return (
    <DefaultLayout>
      <KnockScreen />
    </DefaultLayout>
  )
}

export default KnockPluginPage
