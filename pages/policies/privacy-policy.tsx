import type { NextPage } from 'next'

import PrivacyPolicyScreen from '@components/screens/Policies/Privacy'
import DefaultLayout from '@components/layouts/Default'

const PrivacyPolicyPage: NextPage = () => {
  return (
    <DefaultLayout>
      <PrivacyPolicyScreen />
    </DefaultLayout>
  )
}

export default PrivacyPolicyPage
