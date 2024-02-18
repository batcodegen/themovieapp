import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import EmailInput from '../src/components/EmailInput';

describe('EmailInput Component', () => {
  it('Renders correctly', () => {
    const mockSubmitText = jest.fn();
    render(<EmailInput onSubmitText={mockSubmitText} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should submit when email is valid', async () => {
    const mockSubmitText = jest.fn();
    render(<EmailInput onSubmitText={mockSubmitText} />);
    const pressable = await screen.findByTestId('email-open-button');
    fireEvent.press(pressable);
    const modalComponent = await screen.findByTestId('email-modal');
    expect(modalComponent.props.visible).toBe(true);
    const emailInput = await screen.findByTestId('email-text-input');
    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent(emailInput, 'submitEditing');
    expect(mockSubmitText).toHaveBeenCalledTimes(1);
  });
});
