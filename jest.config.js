module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^.+\\.scss$': 'identity-obj-proxy',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
};
