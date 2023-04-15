const boom = require('@hapi/boom')

class AssistanceService{
  constructor(){
    this.assistances = [];
    this.fillArray();
  }

  fillArray(){
    this.assistances = [
      {
        id: '1',
        userId: '0001',
        userName: 'AAA',
        date: '2023-01-01',
        punchIn: '09:00 AM',
        punchOut: '06:00 PM'
      },
      {
        id: '2',
        userId: '0002',
        userName: 'BBB',
        date: '2023-01-01',
        punchIn: '09:00 AM',
        punchOut: '06:00 PM'
      },
      {
        id: '3',
        userId: '0003',
        userName: 'CCCC',
        date: '2023-01-01',
        punchIn: '09:00 AM',
        punchOut: '06:00 PM'
      },
      {
        id: '4',
        userId: '0004',
        userName: 'DDD',
        date: '2023-01-01',
        punchIn: '09:00 AM',
        punchOut: '06:00 PM'
      }
    ]
  }

  async add(assistance){
    const newAssistance = {
      id : (this.assistances.length + 1),
      ...assistance
    }
    this.assistances.push(newAssistance);
    return newAssistance;
  }

  async get(limit, offset){
    if(limit && offset){
      return this.assistances;
    }else {
      return this.assistances;
    }
  }

  async getOne(id){
    const index = this.assistances.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('assistace not found');
    }
    return this.assistances.find(item => item.id === id);
  }

  async update(id, assistace){
    const index = this.assistances.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('assistace not found');
    }
    const editAssistance = this.assistances[index];
    this.assistances[index] = {
      ...editAssistance,
      ...assistace
    };
    return this.assistances[index];
  }

  async delete(id){
    const index = this.assistances.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('assistace not found');
    }
    this.assistances.splice(index, 1);

    return true;
  }

}
module.exports = AssistanceService;
