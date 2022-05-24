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
          id="canvas" />
        <button onClick={onClick} >
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	          width="20px" height="20px" viewBox="0 0 94.926 94.926" style={{enableBackground: "new 0 0 94.926 94.926"}}>
            <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
            c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
            c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
            c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
            s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"/>
          </svg>
        </button>
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