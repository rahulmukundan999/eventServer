var fw = require('framework');

var conf = {
    socketPort : 8081,
    component  : 'media',
    modules : ['image'],
    directory : '/home/rahulmukundan/project'

}

fw = new fw(conf);