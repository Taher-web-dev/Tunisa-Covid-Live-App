import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import NavBar from '../Navbar';
import HomePage from '../components/HomePage/home';

const mockStore = configureStore([]);
test('render correctly navbar', () => {
  const tree = renderer.create(
    <Router>
      <NavBar />
    </Router>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('render correctly Homepage component', () => {
  let store;
  let tree;
  beforeEach(() => {
    store = mockStore({
      latest: {},
      dayBefore: {},
    });
    store.dispatch = jest.fn();
    tree = renderer.create(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>,
    );
  });
  it('should render with given state from redux store', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
