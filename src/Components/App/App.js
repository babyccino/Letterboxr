import React from 'react';

import './App.scss';

import DragDrop from '../DragDrop';
import ImageDisplay from '../ImageDisplay';
import AspectRatioSelector from '../AspectRatioSelector'
import UploadImages from '../UploadImages';

const App = () => (
	<div className="App">
		<header className="App-header">
			<DragDrop />
			<UploadImages />
			<div className="imageAndRatioSelectorContainer">
				<AspectRatioSelector />
				<ImageDisplay />
			</div>
		</header>
	</div>
);

export default App;
