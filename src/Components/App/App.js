import React from 'react';

import './App.scss';

import DragDrop from '../DragDrop';
import ImageDisplay from '../ImageDisplay';
import AspectRatioSelector from '../AspectRatioSelector'
import UploadImages from '../UploadImages';

const App = () => (
	<div className="App">
		<DragDrop />
		<header className="App-header">
			<div className="appContainer">
				<div className='logoAndUploadButtonContainer'>
					<div className='logo'>LetterBoxr</div>
					<UploadImages />
				</div>
				<AspectRatioSelector />
				<ImageDisplay />
			</div>
		</header>
	</div>
);

export default App;
