const {Model} = require('brogrammers');
const {app} = require('../../..');

class EmployeeModel extends Model{
    constructor(){
        super(app['db'],'users',[
            '"id"',
            'chef_id'
        ]);
    }

}
module.exports = EmployeeModel;