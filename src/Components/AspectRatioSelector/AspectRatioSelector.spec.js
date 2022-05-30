import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import AspectRatioSelector from './AspectRatioSelector';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));
jest.mock('../../Actions/aspectRatio', () => ({
  changeAspectRatio: payload => payload 
}));

const useDispatchMock = useDispatch;

describe('Aspect ratio selector component', () => {
  it('Clicking selector buttons dispatches actions with the corresponding value', () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockImplementation(() => dispatchMock);
    const { getByLabelText } = render(<AspectRatioSelector />);

    expect(useDispatchMock).toHaveBeenCalled();

    const selector = getByLabelText('9:16');
    selector.click();

    expect(dispatchMock).toHaveBeenCalledWith((9/16).toString());
  });
});
