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
            cb(null, file.originalname);
        }
    });
    const upload = multer({
        storage: storage
    }).any();

    function createPost(req, res) {
        // upload(req, res, function (err) {
        //     console.log('error file upload', err);
        //     if (err) {
        //         console.log(err);
        //         res.json({
        //             status: 500,
        //             msg: 'sorry'
        //         })
        //     } else {
        //         console.log(req.files);
        //         if (req.files.length > 0) {
        var tempData = req.body;
        // console.log(tempData, req);
        cloudinary.v2.uploader.upload(tempData.baseData,
            function (error, result) {
                console.log(error);
                if (error) {
                    res.json({
                        status: 500,
                        msg: 'Could not create'
                    })
                } else {
                    var file = result;
                    console.log(req.body.data);

                    console.log('temo', tempData)
                    delete tempData.image;
                    delete tempData.baseData;
                    tempData.approved = false;
                    tempData.createdDate = fw.getTimeStamp();
                    tempData.imageUrl = file.url;
                    console.log(tempData);
                    fw.getApiInstance('mongo').insert({
                        dbName: 'eventtest',
                        tableName: 'posts',
                        value: tempData
                    }, result1 => {
                        console.log(result1);
                        if (result1.status == 200) {
                            res.json({
                                status: 200,
                                msg: 'uploaded'
                            })
                        } else {
                            res.json({
                                status: 500,
                                msg: 'sorry'
                            })
                        }
                    });
                }
            });
        // } else {
        //     var tempData = JSON.parse(req.body.data);
        //     console.log('temo', tempData)
        //     delete tempData.image;
        //     tempData.approved = false;
        //     tempData.createdDate = fw.getTimeStamp();
        //     tempData.imageUrl = null;
        //     console.log(tempData);
        //     fw.getApiInstance('mongo').insert({
        //         dbName: 'eventtest',
        //         tableName: 'posts',
        //         value: tempData
        //     }, result1 => {
        //         console.log(result1);
        //         if (result1.status == 200) {
        //             res.json({
        //                 status: 200,
        //                 msg: 'uploaded'
        //             })
        //         } else {
        //             res.json({
        //                 status: 500,
        //                 msg: 'sorry'
        //             })
        //         }
        //     });
        // }
        // }
        // });
    }
}