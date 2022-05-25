import React from 'react';
import { useSelector } from 'react-redux';

import './ImageDisplay.scss';

import LetterBoxedImage from '../LetterBoxedImage';

const ImageDisplay = () => {
	const images = useSelector(state => state.images.imageList);
	const aspectRatio = useSelector(state => state.aspectRatio);

	const autoAspect = 0.8;

	const renderImages = () => images.map(image => {
    return (
      <div className='imageContainer' key={image.title}>
        <LetterBoxedImage
          img={image}
          width={1080}
          height={Math.round(aspectRatio === "Auto" ? 1080 / autoAspect : 1080 / aspectRatio)}
          id="canvas" />
      </div>);
    }
	);

	return (
    <div className='imageDisplay'>
      {renderImages()}
    </div>
	);
}

export default ImageDisplay;