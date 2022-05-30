import React from 'react';
import { useSelector } from 'react-redux';

import './ImageDisplay.scss';

import LetterBoxedImage from '../LetterBoxedImage';

const ImageDisplay = () => {
	const images = useSelector(state => state.images.imageList);

	const autoAspect = 0.8;
	const aspectRatio = useSelector(state => state.aspectRatio === "Auto" ? autoAspect : state.aspectRatio);

	const renderImages = () => images.map((image, index) =>
    <div role='imageContainer' className='imageContainer' key={index}>
      <LetterBoxedImage
        img={image}
        width={1080}
        height={Math.round(1080 / aspectRatio)}
        id="canvas" />
    </div>
	);

	return (
    <div role='imageDisplay' className='imageDisplay'>
      {renderImages()}
    </div>
	);
}

export default ImageDisplay;