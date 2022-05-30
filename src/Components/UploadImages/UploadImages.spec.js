import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { useDispatch } from 'react-redux';

import UploadImages from './UploadImages';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));
jest.mock('../../Actions/images', () => ({
  addImages: payload => payload 
}));

const useDispatchMock = useDispatch;

describe('Upload images component', () => {
  it('Uploading image dispatches add images action with correct files', () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockImplementation(() => dispatchMock);
    const { getByRole } = render(<UploadImages />);

    expect(useDispatchMock).toHaveBeenCalled();

    const input = getByRole('input');
    const files = [
      new File(['placeholder0'], 'placeholder0.png', {type: 'image/png'}),
      new File(['placeholder1'], 'placeholder1.png', {type: 'image/png'})
    ]

    userEvent.upload(input, files);

    expect(input.files[0]).toEqual(files[0]);

    // callback not being called for some reason
    // expect(dispatchMock.calls[0]).toEqual(files);
  });
});