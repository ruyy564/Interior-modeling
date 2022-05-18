const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const Type = require('../models/TypeObject');
const Project = require('../models/Project');

class projectController {
  async createType(req, res) {
    try {
      const { value } = req.body;
      const type = new Type({
        value,
      });

      await type.save();
      res.status(201).json({ message: 'Тип создан' });
    } catch (e) {
      res.status(500).json({ message: 'Не работает' });
      console.log(e);
    }
  }

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

  async saveProject(req, res) {
    try {
      const { model, name, type } = req.body;
      const userId = req.user.userId;
      const data = JSON.stringify(model);

      if (!model || !name || !type) {
        return res.status(400).json({ message: 'Неверные данные' });
      }
      const project = new Project({
        user: userId,
        name,
        type,
      });

      fs.writeFile(`public/${project.id}.txt`, data, (e) => {
        if (e) {
          console.log(e);
          return res.status(400).json({ message: 'Проект не сохранен' });
        }
      });
      await project.save();
      res.status(201).json({ message: 'Проект сохранен' });
    } catch (e) {
      res.status(400).json({ message: 'Проект не сохранен', error: e });
      console.log(e);
    }
  }

  async downloadProject(req, res) {
    try {
      const projectId = req.params.id;
      const { id } = await Project.findOne({
        _id: projectId,
      });
      const stream = fs.createReadStream(`public/${id}.txt`, 'utf8');

      stream.on('data', (data) => {
        res.status(201).json({ message: 'Проект загружен', value: data });
      });
      stream.on('error', (e) => {
        res.status(400).json({ message: 'Проект не загружен', error: e });
      });
    } catch (e) {
      res.status(400).json({ message: 'Проект не загружен', error: e });
      console.log(e);
    }
  }

  async deleteProject(req, res) {
    try {
      const projectId = req.params.id;
      await Project.deleteOne({
        _id: projectId,
      });

      fs.unlink(`public/${projectId}.txt`, (err) => {
        if (err) throw err;
        res.status(400).json({ message: 'Проект удален' });
        console.log('Deleted');
      });
    } catch (e) {
      res.status(400).json({ message: 'Проект не загружен', error: e });
      console.log(e);
    }
  }

  async updateProject(req, res) {
    try {
      const projectId = req.params.id;
      const { model, name } = req.body;
      const data = JSON.stringify(model);

      if (!model || !name) {
        return res.status(400).json({ message: 'Неверные данные' });
      }

      const project = await Project.findOneAndUpdate(
        {
          _id: projectId,
        },
        {
          $set: {
            name,
          },
        }
      );

      if (!project) {
        return res.status(400).json({ message: 'Проекта не существует' });
      }
      fs.writeFile(`public/${projectId}.txt`, data, (e) => {
        if (e) {
          console.log(e);
          return res.status(400).json({ message: 'Проект не сохранен' });
        }
      });

      res.status(201).json({ message: 'Проект сохранен' });
    } catch (e) {
      res.status(400).json({ message: 'Проект не изменен', error: e });
      console.log(e);
    }
  }

  async getProjectsByType(req, res) {
    try {
      const id = req.params.id;
      const projects = await Project.find({
        type: id,
      });

      res.status(201).json({ projects });
    } catch (e) {
      res.status(400).json({ message: 'Проект не сохранен', error: e });
      console.log(e);
    }
  }

  async getProjectsById(req, res) {
    try {
      const id = req.params.id;
      const projects = await Project.find({
        _id: id,
      });

      res.status(201).json({ projects });
    } catch (e) {
      res.status(400).json({ message: 'Проект не сохранен', error: e });
      console.log(e);
    }
  }

  async getProjectsByUserId(req, res) {
    try {
      const userId = req.params.id;
      const projects = await Project.find({
        user: userId,
      });

      res.status(201).json({ projects });
    } catch (e) {
      res.status(400).json({ message: 'Проект не сохранен', error: e });
      console.log(e);
    }
  }
}

module.exports = new projectController();
