const userRoutes = require('./user/user.routes');

module.exports = function registerRoutes(app) {
  app.use('/api/users', userRoutes);
};
