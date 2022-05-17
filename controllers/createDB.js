const Role = require('../models/Role');

class authController {
  async createRole(req, res) {
    try {
      const { value } = req.body;
      const role = new Role({
        value,
      });

      await role.save();
      res.status(201).json({ message: 'Роль создана' });
    } catch (e) {
      res.status(500).json({ message: 'Не работает' });
      console.log(e);
    }
  }
}

module.exports = new authController();
