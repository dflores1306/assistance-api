const boom = require('@hapi/boom');
const { models } = require('../libraries/sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class AssistanceService{
  constructor(){ }

  async add(assistance){
    const newAssistance = await models.Assistance.create(assistance);
    return newAssistance;
  }

  async get(query){
    const { limit, offset, filterName, minDate, maxDate } = query;
    const options = {
      attributes: [
        'id', 'userId', 'userName', ['assistance_date', 'date'], 'punchIn', 'punchOut'
      ],
      where: {
        deleted: false
      },
      order: [
        ['id', 'DESC'], ['date', 'DESC']
      ]
    };

    if (limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    if (filterName){
      options.where.userName = {[Op.like]: `%${filterName}%`};
    }
    if ((minDate && maxDate)){
      options.where.assistance_date = {[Op.between]: [minDate, maxDate]};
    }
    const result = await models.Assistance.findAll(options);
    return result;
  }

  async getOne(id){
    const result = await models.Assistance.findOne({
      where: {
        deleted: false,
        id: id
      },
      attributes: [
        'id', 'userId', 'userName', ['assistance_date', 'date'], 'punchIn', 'punchOut'
      ]
    });
    if (!result){
      throw boom.notFound('assistace not found');
    }
    return result;
  }

  async update(id, assistace){
    const data = await this.getOne(id);
    const result = await data.update(assistace);

    return result;
  }

  async delete(id){
    const data = await this.getOne(id);
    const result = await data.update({deleted: true});

    return result.id;
  }

}
module.exports = AssistanceService;
