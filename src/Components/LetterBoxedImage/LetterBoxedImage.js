import React, { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import './LetterBoxedImage.scss';

import { ReactComponent as DeleteButtonIcon } from "./DeleteButton.svg";
import { ReactComponent as SaveButtonIcon } from "./SaveButton.svg";

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

			// fill in background
			context.fillStyle = '#ffffff';
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);

			// if image is wider than canvas bars are on top and bottom and vice versa
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
			<div className='buttonsContainer'>
				<a role="saveImage" ref={saveRef} className='saveButton'>
					<SaveButtonIcon />
				</a>
				<button role="deleteImage" onClick={onClickDelete} className='deleteButton'>
					<DeleteButtonIcon />
				</button>
			</div>
		</div>
	);
}

export default React.memo(LetterBoxedImage)