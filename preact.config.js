import path from 'path'

export default (config) => {
  config.output.path = path.join(__dirname, "build");
};