module.exports = server;

function server(fw) {
    const bcrypt = fw.getModule('bcrypt');
    this.hello = hello;
    this.login = login;
    this.register = register;
    this.fetchPost = fetchPost;

    function hello(data) {
        console.log(data);
    }

    function login(data, callback) {
        console.log(data);
        fw.getApiInstance('mongo').getData({
            query: {
                'emailId': data.emailId,
            },
            dbName: 'eventtest',
            tableName: 'users'
        }, result => {
            if (result.status == 200 && result.data.length > 0) {
                console.log(result);
                if (bcrypt.compareSync(data.password, result.data[0].password)) {
                    callback(result);
                } else {
                    callback({
                        status: 500,
                        msg: 'Wrong password'
                    })
                }
            } else {
                callback({
                    status: 500,
                    msg: 'Invalid credentials'
                })
            }
        })
    }

    function register(data, callback) {
        console.log(data);
        fw.getApiInstance('mongo').getData({
            query: {
                'emailId': data.emailId,
            },
            dbName: 'eventtest',
            tableName: 'users'
        }, result => {
            if (result.status == 200 && result.data.length == 0) {
                data.password = bcrypt.hashSync(data.password, 10);
                fw.getApiInstance('mongo').insert({
                    value: data,
                    dbName: 'eventtest',
                    tableName: 'users'
                }, result => {
                    console.log(result);
                    if (result.status == 200) {
                        callback({
                            status: 200,
                            msg: 'inserted'
                        })
                    } else {
                        callback(result);
                    }
                })
            } else if (result.status == 200 && result.data.length > 0) {
                callback({
                    status: 500,
                    msg: 'Email Already Taken'
                })
            }
        });
    }

    function fetchPost(data, callback) {
        fw.getApiInstance('mongo').getData({
            // query : {
            //     approved: false
            // } ,
            sort: {
                createdDate: -1
            },
            skip: data.skip,
            limit: 12,
            dbName: 'eventtest',
            tableName: 'posts',
            // skip : data.skip,
            // limit : 100
        }, result => {
            if (result.status == 200) {
                callback(result)
            } else {
                callback({
                    status: 500,
                    msg: 'unable to fetch'
                })
            }
        });
    }
}