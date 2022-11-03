import KnockSection from '@components/shared/core/KnockSection'

const HeroSection = () => {
  return (
    <KnockSection
      buttonProps={{ children: 'Buy it now $99' }}
      description="Make your drums KNOCK and punch through the mix."
      pTheme={{ text: 'medium', width: 'small' }}
    />
  )
}

export default HeroSection
