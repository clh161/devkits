// @flow strict

export function mockLocation(mockPath: string) {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
      pathname: mockPath,
    }),
  }));
}
