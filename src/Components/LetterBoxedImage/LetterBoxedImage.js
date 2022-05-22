import React, { useRef, useEffect } from 'react'

const LetterBoxedImage = props => {
	const canvasRef = useRef(null);
	const {img, width, height} = props;
	console.log(props);

	useEffect(() => {
		const render = () => {
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');

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

		if (img.loaded) render();
		else {
			img.onload = () => {
				img.loaded = true;
				render();
			};
		}
	});
	
	return <canvas ref={canvasRef} {...props} download={img.title} />;
}

export default LetterBoxedImage