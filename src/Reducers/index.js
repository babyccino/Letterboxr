import {combineReducers} from 'redux';

import images from './images';
import aspectRatio from './aspectRatio';

const rootReducer = combineReducers({
    images, aspectRatio
});

export default rootReducer;