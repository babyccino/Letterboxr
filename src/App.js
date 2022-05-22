import React from 'react';

import './App.css';

import DragDrop from './Components/DragDrop';
import ImageDisplay from './Components/ImageDisplay';
import AspectRatioSelector from './Components/AspectRatioSelector'
import UploadImages from './Components/UploadImages';

const App = () => (
	<div className="App">
		<header className="App-header">
			<DragDrop />
			<UploadImages />
			<div style={{width: '950px'}}>
				<AspectRatioSelector />
				<ImageDisplay />
			</div>
		</header>
	</div>
);

export default App;
