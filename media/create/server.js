module.exports = server;
function server(fw) {
    this.createPost = createPost;
    var multer = fw.getModule('multer')   
    var cloudinary = fw.getModule('cloudinary');
    cloudinary.config({ 
        cloud_name: 'dmsqzbrt8', 
        api_key: '764273155717232', 
        api_secret: '86uxU7gTLHeKBIhb9zZhK1gKpbA' 
        });

        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './file/')
            },
            filename: (req, file, cb) => {
              filename = file.originalname; 
              cb(null,file.originalname);
            }
        });
        const upload = multer({storage:storage}).any(); 
        
    function createPost(req, res) {
        upload(req,res,function(err) {
            if(err) {
                console.log(err);
                res.json({
                    status : 500,
                    msg : 'sorry'
                })
            } else {
            console.log(req.files);
            if(req.files.length > 0) {
            cloudinary.v2.uploader.upload(req.files[0].destination + req.files[0].filename, 
            function(error, result) {
                console.log(error);
                if(error) {
                    res.json({
                        status : 500,
                        msg : 'Could not create'
                    })
                } else {
                    var file = result;
                    console.log(req.body.data);
                    var tempData = JSON.parse(req.body.data);
                    console.log('temo',tempData)
                    delete tempData.image;
                    tempData.approved = false;
                    tempData.createdDate = fw.getTimeStamp();
                    tempData.imageUrl = file.url;
                    console.log(tempData);
                        fw.getApiInstance('mongo').insert({
                            dbName : 'eventTest',
                            tableName: 'posts',
                            value : tempData
                        }, result1 => {
                            console.log(result1);
                            if(result1.status == 200) {
                                res.json({
                                    status : 200,
                                    msg: 'uploaded'
                                })
                            } else {
                                res.json({
                                    status : 500,
                                    msg : 'sorry'
                                })
                            }
                        });
                    }
                });
            } else {
                var tempData = JSON.parse(req.body.data);
                console.log('temo',tempData)
                delete tempData.image;
                tempData.approved = false;
                tempData.createdDate = fw.getTimeStamp();
                    tempData.imageUrl = null;
                console.log(tempData);
                    fw.getApiInstance('mongo').insert({
                        dbName : 'eventTest',
                        tableName: 'posts',
                        value : tempData
                    }, result1 => {
                        console.log(result1);
                        if(result1.status == 200) {
                            res.json({
                                status : 200,
                                msg: 'uploaded'
                            })
                        } else {
                            res.json({
                                status : 500,
                                msg : 'sorry'
                            })
                        }
                    });
                }
            }
        });
    }
}