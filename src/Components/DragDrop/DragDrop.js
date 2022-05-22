import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as UploadingIcon } from "./upload.svg";
import './DragDrop.scss';

import { addImages } from '../../Actions/images';

var counter = 0;

const DragDrop = () => {
  const [dragOver, setDragOver] = useState(false);

	const dispatch = useDispatch();
	
	document.addEventListener("dragover", e => e.preventDefault(), false);
	document.addEventListener("dragenter", e => {e.preventDefault(); ++counter; setDragOver(true);}, false);
	document.addEventListener("dragleave", e => {e.preventDefault(); if (--counter <= 0) setDragOver(false);}, false);

  const onDrop = e => {
    e.preventDefault(); e.stopPropagation();

    counter = 0;

    console.log(e.dataTransfer.files);

		dispatch(addImages(e.dataTransfer.files));
		setDragOver(false);
  };

	return dragOver ?
    <div
      id='dragAndDrop'
      className='dragOver'
      onDrop={onDrop}>
      <UploadingIcon className='uploadingIcon' />
    </div> :
    <></>;
}

export default DragDrop;