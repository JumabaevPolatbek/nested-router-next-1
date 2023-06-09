import React from 'react';

const Layout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className='container px-[15px] m-auto'>
			{children}
		</div>
	);
};
export default Layout;
