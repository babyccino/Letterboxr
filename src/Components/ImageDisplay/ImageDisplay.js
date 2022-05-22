import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ImageDisplay.scss';

import LetterBoxedImage from '../LetterBoxedImage';
import { deleteImage } from '../../Actions/images';

const ImageDisplay = () => {
	const images = useSelector(state => state.images.imageList);
	const aspectRatio = useSelector(state => state.aspectRatio);

	const autoAspect = 0.8;

  const dispatch = useDispatch();
	const renderImages = () => images.map(image => {
    const onClick = () => dispatch(deleteImage(image.title));

    return (
      <div className='imageContainer' key={image.title}>
        <LetterBoxedImage
          img={image}
          width={1080}
          height={Math.round(aspectRatio === "Auto" ? 1080 / autoAspect : 1080 / aspectRatio)}
          id="canvas"
          style={{ width: "100%", height: "100%" }} />
        <button onClick={onClick} >❌</button>
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