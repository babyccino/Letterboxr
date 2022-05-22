import React from 'react';
import { useSelector } from 'react-redux';

import LetterBoxedImage from '../LetterBoxedImage';

const ImageDisplay = () => {
	const images = useSelector(state => state.images.imageList);
	const aspectRatio = useSelector(state => state.aspectRatio);

	const autoAspect = 0.8;

  console.log("images: ", images);
  console.log("aspect ratio: ", aspectRatio);
	
	const renderImages = () => images.map(image =>
		<div style={{margin: "10px 10px 10px 10px"}} key={image.title}>
			<LetterBoxedImage 
				img={image} 
				width={1080}
        height={Math.round(aspectRatio === "Auto" ? 1080/autoAspect : 1080/aspectRatio)} 
				id="canvas"
				style={{width: "100%", height: "100%"}}
			/>
		</div>
	);

	return (
    <div style={{display:"grid", gridTemplateColumns: "repeat(3, 33.333333%)"}}>
      {renderImages()}
    </div>
	);
}

export default ImageDisplay;