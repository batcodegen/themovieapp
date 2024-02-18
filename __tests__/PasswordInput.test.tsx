import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import PasswordInput from '../src/components/PasswordInput';

describe('PasswordInput Component', () => {
  it('Renders correctly', () => {
    const mockSubmitText = jest.fn();
    render(<PasswordInput onSubmitText={mockSubmitText} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should submit when password meets all requirements', async () => {
    const mockSubmitText = jest.fn();
    render(<PasswordInput onSubmitText={mockSubmitText} />);
    const pressable = await screen.findByTestId('password-open-button');
    fireEvent.press(pressable);
    const modalComponent = await screen.findByTestId('password-modal');
    expect(modalComponent.props.visible).toBe(true);
    const passwordInput = await screen.findByTestId('password-text-input');
    fireEvent.changeText(passwordInput, 'StrongPassword123!');
    // fireEvent.press(screen.getByTestId('password-text-input'), 'return');
    fireEvent(passwordInput, 'submitEditing');
    expect(mockSubmitText).toHaveBeenCalledTimes(1);
  });
});
