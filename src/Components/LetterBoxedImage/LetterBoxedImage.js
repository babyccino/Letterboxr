import React, { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import './LetterBoxedImage.scss';

import LoadingAnimation from '../LoadingAnimation';

import { deleteImage } from '../../Actions/images';

const LetterBoxedImage = props => {
	const {img, width, height} = props;

	const [imgLoaded, setImgLoaded] = useState(img.complete);
	const canvasRef = useRef(null);
	const saveRef = useRef(null);

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
			const saveButton = saveRef.current;
			saveButton.download = img.title;
			saveButton.href = canvas.toDataURL('image/png');
		};

		if (img.complete) render();
		else {
			img.onload = () => {
				render();
			};
		}
	});

	const dispatch = useDispatch();
	const onClickDelete = () => dispatch(deleteImage(img.title));
	
	return (
		<div style={{position: "relative"}}>
			<div style={{display: imgLoaded ? "none" : "flex", aspectRatio: width/height}} className="loading">
				<LoadingAnimation />
			</div>
			<canvas
				{...props}
				ref={canvasRef}
				download={img.title}
				style={{display: !imgLoaded ? "none" : "block"}}
				/>
			<a ref={saveRef} className='saveButton'>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"/></svg>
			</a>
			<button className='deleteButton' onClick={onClickDelete}>
				<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
					width="20px" height="20px" viewBox="0 0 94.926 94.926" style={{enableBackground: "new 0 0 94.926 94.926"}}>
					<path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
					c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
					c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
					c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
					s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"/>
				</svg>
			</button>
		</div>
	);
}

export default React.memo(LetterBoxedImage)