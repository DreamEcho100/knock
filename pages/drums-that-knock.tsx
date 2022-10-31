import type { NextPage } from 'next'

import DefaultLayout from '@components/layouts/Default'
import DrumsThatKnock from '@components/screens/DrumsThatKnock'

const DrumsThatKnockPage: NextPage = () => {
  return (
    <DefaultLayout>
      <DrumsThatKnock />
    </DefaultLayout>
  )
}

export default DrumsThatKnockPage