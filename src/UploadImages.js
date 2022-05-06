import React, {useState} from 'react';
import './UploadImages.css';

import LetterBoxedImage from './LetterBoxedImage';

export default function UploadImages() {
	const [images, setImages] = useState([]);
	const [fileNames, setfileNames] = useState(new Set());

	const onImageChange = e => {
		let promises = [];
		let newImages = [];
		for (const file of e.target.files) {
			if (fileNames.has(file.name)) continue;
			setfileNames(fileNames.add(file.name));

			let img = new Image();
			img.src = URL.createObjectURL(file);
			img.title = file.name
			promises.push(new Promise(res => {
				img.onload = res;
			}));
			newImages.push(img);
		}
		Promise.all(promises).then(() => setImages(images.concat(newImages)));
	}

	const renderImages = () => images.map(image =>
		<div style={{height: "60vh"}} key={image.title}>
			<LetterBoxedImage 
				img={image} 
				width="1080" height="1350" 
				id="canvas"
				style={{width: "100%", height: "100%"}}
			/>
		</div>
	);

	return (
		<>
			<input type="file" multiple accept='image/*' onChange={onImageChange} />
			<div style={{display:"flex", flexWrap:"wrap", justifyContent: "center", width: '90vw', gap: "10px"}}>
				{renderImages()}
			</div>
		</>
	);
}