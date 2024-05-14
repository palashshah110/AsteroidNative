import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import AsteroidDetails from '../src/screens/AsteroidDetails.tsx';

const route = {
  params: {
    AsteroidData: {
      name: 'Asteroid1',
      designation: 'jn',
      id: 1,
      estimated_diameter: {
        kilometers: {
          estimated_diameter_max: 455,
        },
        meters: {estimated_diameter_max: 455},
        miles: {
          estimated_diameter_max: 455,
        },
      },
    },
  },
};

const mockNavigation = {
  navigate:{
    goBack: jest.fn(),
  }
};

describe('AstroidDetails Checking', () => {
  test('Checking Text Detalis', () => {
    render(<AsteroidDetails navigation={mockNavigation} route={route} />);
    const GobackBtn = screen.getByText('Go Back');
    expect(GobackBtn).toMatchSnapshot();
    const name = screen.getByText(`Name: ${route.params.AsteroidData.name}`);
    expect(name).toMatchSnapshot();
    const goBackTest = screen.getByTestId('goBackTest');
    fireEvent.press(goBackTest);
    expect(mockNavigation.navigate.goBack).toHaveBeenCalled();
  });
});
