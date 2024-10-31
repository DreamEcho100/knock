import KnockTrademark from '~/app/_components/shared/core/KnockTrademark';
import KnockSection from '~/app/_components/shared/core/KnockSection';

const HeroSection = ({ data }: { data: any }) => {
	return (
		<KnockSection
			description={data.p}
			title={<KnockTrademark tradeMark={data.h2} />}
			colorText={{
				p: data.pColor,
				h2: data.h2Color,
			}}
			pTheme={{ width: 'small' }}
			mainImgOrVideoLink={data.buttonUrl}
			imageSrc={
				data.mainImageUrl
					? `${process.env.NEXT_PUBLIC_KNOCK_URL_API}${data.mainImageUrl}`
					: ''
			}
			mainImgOrVideoProps={{ priority: true }}
			buttonProps={{
				className: 'capitalize',
				href: data.buttonUrl,
				children: data.buttonText,
			}}
		/>
	);
};

export default HeroSection;
