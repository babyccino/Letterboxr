import React from 'react';
import { useDispatch } from 'react-redux';

import './AspectRatioSelector.scss';

import { changeAspectRatio } from '../../Actions/aspectRatio';

const AspectRatioSelector = () => {
  const dispatch = useDispatch();
  const onChangeAspect = e => dispatch(changeAspectRatio(e.target.value));

  return (
    <div className='aspectRatioSelectorContainer'>
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
          <div className='label'>Auto</div>
        </label>
      </div>
    </div>
  );
}

export default AspectRatioSelector;