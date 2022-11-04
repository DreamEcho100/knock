import Image from 'next/image';

const KnockTrademark = () => {
	return (
		<span className='flex w-fit mx-auto md:mx-0 relative'>
			KNOCK
			<sup>
				<Image
					src='/images/Trademark Artboard 1 copy 3.png'
					width={10}
					height={10}
					priority
					alt='KNOCK logo'
					className='aspect-square w-2 h-2'
				/>
			</sup>
		</span>
	);
};

export default KnockTrademark;
