module.exports = startup;
function startup(fw,callback) {
    console.log('startup');
    var config = {};
        config.host = '0.0.0.0';
        config.https = true;
        config.port = '8882';
        config.cors = true;
        // config.uploadsDestation = "/home/youmnu/components/mediahandler/trunk/modules/uploads/"
        // config.staticFiles = '/home/youmnu/components/adminpanel/trunk/modules/adminpanel/client/assests';
        config.urls = [{
                url: '/upload',
                method: 'post',
                type: "file",
                callback: upload
            },
            {
                url: '/fetchMedia',
                method: 'get',
                type: "file",
                callback: fetchMedia
            }
        ]

    fw.getApiInstance('express').startService(config, result=>{
        // console.log(result);
    });  

    function upload(req, res) {
        console.log(req.body);
        var data = req.body;
        var temp = require('./' + 'create' + '/server.js');
        temp = new temp(fw);
        temp.createPost(req, res);
    }

    function fetchMedia(req, res) {
        // console.log('fwefew');
        // console.log(req.body);
        res.json({
            status : 200,
            msg : "dsdsfd"
        })
        //console.log(req.file)
        // res.send()
        // fw.modules.uploader.fetchMedia(req, res);
    }
}