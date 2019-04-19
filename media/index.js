var fw = require('framework');

var conf = {
    socketPort: 8081,
    component: 'media',
    modules: ['image'],
    directory: '/home/project'

}

fw = new fw(conf);