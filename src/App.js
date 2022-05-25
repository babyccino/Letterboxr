import React from 'react';

import './App.scss';

import DragDrop from './Components/DragDrop';
import ImageDisplay from './Components/ImageDisplay';
import AspectRatioSelector from './Components/AspectRatioSelector'
import UploadImages from './Components/UploadImages';

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
