var fw = require('framework');

var conf = {
    socketPort: 8080,
    component: 'client',
    modules: ['user', 'register'],
    directory: '/home/project'

}

fw = new fw(conf);