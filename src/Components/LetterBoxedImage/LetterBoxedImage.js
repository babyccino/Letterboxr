import React, { useRef, useEffect, useState } from 'react'

import './LetterBoxedImage.scss';

const LetterBoxedImage = props => {
	const {img, width, height} = props;

	const [imgLoaded, setImgLoaded] = useState(img.complete);
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');

		const render = () => {
			setImgLoaded(true);	

			context.fillStyle = '#ffffff';
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
			if (img.width / img.height === width / height) {
				context.drawImage(img, 0, 0, width, height);
			} else if (img.width / img.height < width / height) {
				const scaledWidth = img.width * height / img.height;
				const offset = (width - scaledWidth) / 2;
				context.drawImage(img, offset, 0, scaledWidth, height);
			} else {
				const scaledHeight = img.height * width / img.width;
				const offset = (height - scaledHeight) / 2;
				context.drawImage(img, 0, offset, width, scaledHeight);
			}
		};

		if (img.complete) render();
		else {
			img.onload = () => {
				render();
			};
		}
	});
	
	return <>
		<div style={{display: imgLoaded ? "none" : "flex", aspectRatio: width/height}} className="loading">
			<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
		</div>
		<canvas
			{...props}
			ref={canvasRef}
			download={img.title}
			style={{display: !imgLoaded ? "none" : "block", aspectRatio: width/height}}
			/>
	</>
}

export default React.memo(LetterBoxedImage)