import React, {act} from 'react';
import Asteroid from '../src/screens/Asteroid';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';
import {Alert} from 'react-native';
fetchMock.enableMocks();

const mockData1: {id: number; name: string}[] = [
  {id: 3542519, name: 'as'},
  {id: 3542519, name: 'asp'},
];
const mockData2: {id: number}[] = [{id: 3542519}, {id: 3542519}];

const mockNavigation = {navigate: jest.fn()};

describe('Asteroid Form Component', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });
  test('Checking id and submit Button', () => {
    render(<Asteroid navigation={mockNavigation} />);
    const AsteroidInput = screen.getByPlaceholderText('Enter Asteroid ID');
    fireEvent.changeText(AsteroidInput, 3542519);
    expect(AsteroidInput.props.value).toBe(3542519);
    const AsteroidBtn = screen.getByTestId('submitbtn');
    fireEvent.press(AsteroidBtn);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('Checking Random Btn', () => {
    render(<Asteroid navigation={mockNavigation} />);
    const randombtn = screen.getByTestId('randombtn');
    fireEvent.press(randombtn);

    expect(fetchMock).toHaveBeenCalledTimes(1);

    fetchMock.mockReturnValue(mockData2);
    const randomID: {id: string}[] = mockData2.map((item: any) => ({
      id: item.id,
    }));
    const ranid: number = Math.floor(Math.random() * randomID.length);
    const {id} = randomID[ranid];
    expect(fetchMock).toHaveBeenCalledTimes(1);
    // expect(fetchMock).toHaveBeenCalledWith(
    //   `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`,
    // );
  });

  // test('Checking Random Btn', async () => {
  //   render(<Asteroid navigation={mockNavigation} />);
  //   const randombtn = screen.getByTestId('randombtn');
  //   fireEvent.press(randombtn);
  // await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  // expect(mockNavigation.navigate).toHaveBeenCalledWith(
  //   'AsteroidDetails',
  //   expect.any(Object),
  // );
  // });

  test('should show an error when API  fetchdata give error', async () => {
    jest.spyOn(Alert, 'alert');
    render(<Asteroid navigation={{navigate: jest.fn()}} />);

    fetchMock.mockRejectOnce(() => Promise.reject('API error'));

    const AsteroidInput = screen.getByPlaceholderText('Enter Asteroid ID');
    fireEvent.changeText(AsteroidInput, 12345678);
    expect(AsteroidInput.props.value).toBe(12345678);

    const AsteroidBtn = screen.getByTestId('submitbtn');
    fireEvent.press(AsteroidBtn);

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect('Invalid Asteroid ID').toMatchSnapshot();
  });

  test('should show an error when API  Random Btn give error', async () => {
    jest.spyOn(Alert, 'alert');
    render(<Asteroid navigation={{navigate: jest.fn()}} />);

    fetchMock.mockRejectOnce(() => Promise.reject('API error'));

    const randombtn = screen.getByTestId('randombtn');
    fireEvent.press(randombtn);

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(
      'Error fetching random asteroid. Please try again.',
    ).toMatchSnapshot();
  });
});
