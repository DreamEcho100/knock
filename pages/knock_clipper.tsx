import DefaultLayout from '@components/layouts/Default'
import KnockClipperScreen from '@components/screens/KnockClipper'
import { NextPage } from 'next'

interface Props {}

const KnockClipperPage: NextPage<Props> = () => {
  return (
    <DefaultLayout>
      <KnockClipperScreen />
    </DefaultLayout>
  )
}

export default KnockClipperPage