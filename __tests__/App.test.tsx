import 'react-native';
import React from 'react';
import App from '../src/App';
import renderer from 'react-test-renderer';

const tree = renderer.create(<App />);
test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});
