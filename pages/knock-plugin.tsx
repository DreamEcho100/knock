import type { NextPage } from 'next'

import KnockPluginScreen from 'components/screens/KnockPlugin'
import DefaultLayout from '@components/layouts/Default'

const KnockPluginPage: NextPage = () => {
  return (
    <DefaultLayout>
      <KnockPluginScreen />
    </DefaultLayout>
  )
}

export default KnockPluginPage
