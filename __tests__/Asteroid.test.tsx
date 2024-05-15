import React from 'react';
import Asteroid from '../src/screens/Asteroid';
import {act, fireEvent, render, screen} from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';
import {Alert} from 'react-native';
fetchMock.enableMocks();

const mockData1 = {
  near_earth_objects: [
    {id: '3542519', name: 'as'},
    {id: '3542519', name: 'asp'},
  ],
};

const mockNavigation = {navigate: jest.fn()};

describe('Asteroid Form Component', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('Checking id and submit Button', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({name: 'asteroid'}));
    render(<Asteroid navigation={mockNavigation} />);
    const AsteroidInput = screen.getByPlaceholderText('Enter Asteroid ID');
    fireEvent.changeText(AsteroidInput, '3542519');
    expect(AsteroidInput.props.value).toBe('3542519');
    const AsteroidBtn = screen.getByTestId('submitbtn');
    await act(async () => {
      fireEvent.press(AsteroidBtn);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AsteroidDetails', {
      AsteroidData: {name: 'asteroid'},
    });
  });

  test('Checking Random Btn', async () => {
    fetchMock.mockResponses(
      [JSON.stringify(mockData1), {status: 200}],
      [JSON.stringify({name: 'random asteroid'}), {status: 200}]
    );
    render(<Asteroid navigation={mockNavigation} />);
    const randombtn = screen.getByTestId('randombtn');
    await act(async () => {
      fireEvent.press(randombtn);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AsteroidDetails', {
      AsteroidData: {name: 'random asteroid'},
    });
  });

  test('should show an error when API fetch data give error', async () => {
    jest.spyOn(Alert, 'alert');
    fetchMock.mockRejectOnce(() => Promise.reject('API error'));

    render(<Asteroid navigation={mockNavigation} />);

    const AsteroidInput = screen.getByPlaceholderText('Enter Asteroid ID');
    fireEvent.changeText(AsteroidInput, '1234567');
    expect(AsteroidInput.props.value).toBe('1234567');

    const AsteroidBtn = screen.getByTestId('submitbtn');
    await act(async () => {
      fireEvent.press(AsteroidBtn);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith('Invalid Asteroid ID');
  });

  test('should show an error when API Random Btn give error', async () => {
    jest.spyOn(Alert, 'alert');
    fetchMock.mockRejectOnce(() => Promise.reject('API error'));

    render(<Asteroid navigation={mockNavigation} />);

    const randombtn = screen.getByTestId('randombtn');
    await act(async () => {
      fireEvent.press(randombtn);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error fetching random asteroid. Please try again.'
    );
  });
});
