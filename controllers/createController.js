const UserRole = require('../models/UserRole');
const TypeData = require('../models/TypeData');
const StatusData = require('../models/StatusData');

class createController {
  async createStatus(req, res) {
    try {
      const { name } = req.body;
      const status = new StatusData({
        name,
      });

      await status.save();
      res.status(201).json({ message: 'Статус для данных создан' });
    } catch (e) {
      res.status(400).json({ message: 'Статус для данных не создан' });
      console.log(e);
    }
  }

  async createTypeData(req, res) {
    try {
      const { name, parent = null } = req.body;
      const type = new TypeData({
        name,
        parent,
      });

      await type.save();
      res.status(201).json({ message: 'Тип для данных создан' });
    } catch (e) {
      res.status(400).json({ message: 'Тип для данных не создан' });
      console.log(e);
    }
  }

  async createRole(req, res) {
    try {
      const { name } = req.body;
      const role = new UserRole({
        name,
      });

      await role.save();
      res.status(201).json({ message: 'Роль создана' });
    } catch (e) {
      res.status(400).json({ message: 'Роль не создана' });
      console.log(e);
    }
  }
}

module.exports = new createController();
