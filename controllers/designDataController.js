const fs = require('fs');
const DesignData = require('../models/DesignData');
const StatusData = require('../models/StatusData');
const TypeData = require('../models/TypeData');
const config = require('../config/common');

class designDataController {
  async saveData(req, res) {
    try {
      const { model, name, type, image = null } = req.body;
      const userId = req.user.userId;
      const data = JSON.stringify(model);

      if (!model || !name || !type) {
        return res.status(400).json({ message: 'Неверные данные' });
      }
      const haveImage = image !== null;

      const status = await StatusData.findOne({ name: 'PRIVATE' });
      const project = new DesignData({
        name,
        type,
        status: status.id,
        user: userId,
        image: haveImage,
      });

      fs.writeFileSync(config.pathToFile + project.id + config.ext, data);

      if (haveImage) {
        fs.writeFileSync(config.pathToImage + project.id + config.ext, image);
      }
      await project.save();
      res.status(201).json({ message: 'Проект сохранен' });
    } catch (e) {
      res.status(400).json({ message: 'Проект не сохранен', error: e });
      console.log(e);
    }
  }

  async downloadData(req, res) {
    try {
      const projectId = req.params.id;
      const project = await DesignData.findOne({
        _id: projectId,
      });

      if (!project) {
        return res.status(400).json({ message: 'Проека не существует' });
      }
      const image = project.image ? project.id : config.defaultImage;
      const contentProject = fs.readFileSync(
        config.pathToFile + project.id + config.ext,
        'utf8'
      );
      const contentImage = fs.readFileSync(
        config.pathToImage + image + config.ext,
        'utf8'
      );

      res.status(200).json({
        message: 'Проект  загружен',
        image: contentProject,
        value: contentImage,
        project,
      });
    } catch (e) {
      res.status(400).json({ message: 'Проект не загружен', error: e });
      console.log(e);
    }
  }

  async deleteData(req, res) {
    try {
      const projectId = req.params.id;
      const project = await DesignData.findOne({
        _id: projectId,
      });

      if (!project) {
        return res.status(200).json({ message: 'Проект не существует' });
      }

      fs.unlinkSync(config.pathToFile + projectId + config.ext);

      if (project.image) {
        fs.unlinkSync(config.pathToImage + projectId + config.ext);
      }

      await DesignData.deleteOne({
        _id: projectId,
      });
      res.status(201).json({ message: 'Проект удален' });
    } catch (e) {
      res.status(400).json({ message: 'Проект не удален', error: e });
      console.log(e);
    }
  }

  async updateData(req, res) {
    try {
      const projectId = req.params.id;
      const { model, name, type, image = null } = req.body;
      const data = JSON.stringify(model);

      if (!model || !name || !type) {
        return res.status(400).json({ message: 'Неверные данные' });
      }
      const haveImage = image !== null;
      const project = await DesignData.findOneAndUpdate(
        {
          _id: projectId,
        },
        {
          $set: {
            name,
            type,
            image: haveImage,
          },
        }
      );

      if (!project) {
        return res.status(400).json({ message: 'Проекта не существует' });
      }
      fs.writeFileSync(config.pathToFile + project.id + config.ext, data);

      if (haveImage) {
        fs.writeFileSync(config.pathToImage + project.id + config.ext, image);
      }

      res.status(201).json({ message: 'Проект изменен' });
    } catch (e) {
      res.status(400).json({ message: 'Проект не изменен', error: e });
      console.log(e);
    }
  }

  async getDateByType(req, res) {
    try {
      const id = req.params.id;
      const projects = await DesignData.find({
        type: id,
      });

      res.status(201).json({ projects });
    } catch (e) {
      res.status(400).json({ message: 'Проект не существует', error: e });
      console.log(e);
    }
  }

  async getDataByUserId(req, res) {
    try {
      const userId = req.params.id;
      const projects = await DesignData.find({
        user: userId,
      });

      res.status(201).json({ projects });
    } catch (e) {
      res.status(400).json({ message: 'Проект не существует', error: e });
      console.log(e);
    }
  }

  async getDataByStatusId(req, res) {
    try {
      const statusId = req.params.id;
      const projects = await DesignData.find({
        status: statusId,
      });

      res.status(201).json({ projects });
    } catch (e) {
      res.status(400).json({ message: 'Проект не существует', error: e });
      console.log(e);
    }
  }

  async getStatuses(req, res) {
    try {
      const statuses = await StatusData.find({});

      res.status(201).json({ statuses });
    } catch (e) {
      res.status(400).json({ message: 'Статусов не существует', error: e });
      console.log(e);
    }
  }

  async getTypes(req, res) {
    try {
      const types = await TypeData.find({});

      res.status(201).json({ types });
    } catch (e) {
      res.status(400).json({ message: 'Статусов не существует', error: e });
      console.log(e);
    }
  }
}

module.exports = new designDataController();