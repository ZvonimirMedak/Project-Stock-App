import React from 'react';

interface Props {
	width?: number;
	height?: number;
	color: string;
	className?: any;
	onClick?: (event?: any) => void;
}

const CloseIcon = (props: Props) => (
	<svg
		width={props.width ? props.width : 14}
		height={props.height ? props.height : 14}
		viewBox="0 0 14 14"
		xmlns="http://www.w3.org/2000/svg"
		{...props}>
		<g stroke={props.color} strokeWidth={1.667} fill="none" fillRule="evenodd">
			<path d="M12.535.75L.75 12.535M.75.75l11.785 11.785" />
		</g>
	</svg>
);

export default CloseIcon;
