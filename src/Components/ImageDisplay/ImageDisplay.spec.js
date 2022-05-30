import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import ImageDisplay from './ImageDisplay';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));
jest.mock('../../Actions/images', () => ({
  addImages: payload => payload 
}));
jest.mock('../LetterBoxedImage', () => ({ height }) => (
  <div data-testid="letterBoxedImage">
    <div data-testid="height">{height}</div>
  </div>
));

const useSelectorMock = useSelector;
const setState = state => {
  useSelectorMock.mockImplementation(callBack => {
    return callBack(state);
  });
}

describe('Image display component', () => {
  it('Display renders correctly', () => {
    const state = {images: {imageList: ['placeholder1', 'placeholder2']}, aspectRatio: 4/5};
    setState(state);

    const { getAllByTestId, getAllByRole } = render(<ImageDisplay />);
    const letterBoxedImageContainers = getAllByRole('cell');

    expect(letterBoxedImageContainers).toHaveLength(2);

    const height = getAllByTestId('height')[0];

    expect(height).toHaveTextContent((1080/state.aspectRatio).toString());
  });
});
