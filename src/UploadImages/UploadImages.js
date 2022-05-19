import React, {useState} from 'react';
import './UploadImages.scss';

import LetterBoxedImage from '../LetterBoxedImage';

export default function UploadImages() {
	const [images, setImages] = useState([]);
	const [fileNames, setfileNames] = useState(new Set());
	const [aspect, setAspect] = useState(0.8);
	const [autoAspect, setAutoAspect] = useState(0.8);

	const onChangeAspect = e => setAspect(e.target.value);

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

		Promise.all(promises).then(() => {
			// first image uploading, if aspect is auto, set to the first image uploaded
			if (images.length === 0) {
				const newAutoAspect = Math.min(Math.max(newImages[0].width/newImages[0].height, 4/5), 16/9);
				console.log("newAutoAspect: "+newAutoAspect);
				setAutoAspect(newAutoAspect);
			}

			setImages(images.concat(newImages))
		});
	}

	const renderImages = () => images.map(image =>
		<div style={{margin: "10px 10px 10px 10px"}} key={image.title}>
			<LetterBoxedImage 
				img={image} 
				width="1080" height={aspect === "Auto" ? Math.round(1080/autoAspect) : Math.round(1080/aspect)} 
				id="canvas"
				style={{width: "100%", height: "100%"}}
			/>
		</div>
	);

	return (
		<>
			<label>
				<input type="file" multiple accept='image/*' onChange={onImageChange} />
				<div className='uploadImages'>Upload images</div>
			</label>
			<div style={{maxWidth: '950px'}}>
				<div style={{width: "100%"}}>
					<hr />
					<div onChange={onChangeAspect} className="aspectSelector">
						<label>
							<input className='radioButtons' type="radio" value={9/16} name="aspect" />
							<div className='label'>9:16</div>
						</label>
						<label>
							<input className='radioButtons' type="radio" value={4/5} name="aspect" defaultChecked />
							<div className='label'>4:5</div>
						</label>
						<label>
							<input className='radioButtons' type="radio" value={1} name="aspect" />
							<div className='label'>1:1</div>
						</label>
						<label>
							<input className='radioButtons' type="radio" value={16/9} name="aspect" />
							<div className='label'>16:9</div>
						</label>
						<label>
							<input className='radioButtons' type="radio" value="Auto" name="aspect" />
							<div className='label'>AUTO</div>
						</label>
					</div>
				</div>
				<div style={{display:"grid", gridTemplateColumns: "repeat(3, 33.333333%)"}}>
					{renderImages()}
				</div>
			</div>
		</>
	);
}