import { render, fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import DragDrop from './DragDrop';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));
jest.mock('../../Actions/images', () => ({
  addImages: payload => payload 
}));

const useDispatchMock = useDispatch;

describe('Drag drop component', () => {
  it('Dragging then dropping a file in document dispatches addImage action', () => {
    const dispatchMock = jest.fn();
    useDispatchMock.mockImplementation(() => dispatchMock);

    const { baseElement, getByRole, queryByRole } = render(<DragDrop />);

    expect(useDispatchMock).toHaveBeenCalled();

    fireEvent.dragEnter(baseElement);
    
    const div = getByRole('dragAndDrop');
    expect(div).toBeInTheDocument();

    fireEvent.drop(div, {dataTransfer: {files: 'placeholder'}});

    expect(dispatchMock).toHaveBeenCalledWith('placeholder');
    // after files is dropped element should disappear
    expect(queryByRole('dragAndDrop')).toBeNull();
  });
});
