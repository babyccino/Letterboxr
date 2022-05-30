import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import LetterBoxedImage from './LetterBoxedImage';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));
jest.mock('../../Actions/images', () => ({
  deleteImage: payload => payload 
}));

const useDispatchMock = useDispatch;

describe('Letter boxed image component', () => {
  it('Clicking on delete button dispatches delete image action with correct filename', () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockImplementation(() => dispatchMock);
    const props = {img: new Image(1080, 1080), width: 1080, height: 1080};
    props.img.title = 'placeholder';
    props.img.src = './test.jpg';
    const { getByRole } = render(<LetterBoxedImage {...props} />);

    expect(useDispatchMock).toHaveBeenCalled();

    const deleteButton = getByRole('button');
    deleteButton.click();

    expect(dispatchMock).toHaveBeenCalledWith('placeholder');
  });
});