var fw = require('framework');

var conf = {
    socketPort : 8080,
    component  : 'client',
    modules : ['user', 'register'],
    directory : '/home/rahulmukundan/project'

}

fw = new fw(conf);