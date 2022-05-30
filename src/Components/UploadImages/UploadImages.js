import React from 'react';
import { useDispatch } from 'react-redux';
import './UploadImages.scss';

import { addImages } from '../../Actions/images';

export default function UploadImages() {
	const dispatch = useDispatch();

	const onImageChange = e => dispatch(addImages(e.target.files));

	return (
		<label>
			<input role="uploadImages" type="file" multiple accept='image/*' onChange={onImageChange} />
			<div className='uploadImages'>Upload images</div>
		</label>
	);
}