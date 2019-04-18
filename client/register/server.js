module.exports = server;

function server(fw) {
    this.fetchDetails = fetchDetails;
    this.registerEvent = registerEvent;

    function fetchDetails(data, callback) {
        console.log('dedes');
        fw.getApiInstance('mongo').getData({
            query: {
                'id': data.id,
            },
            dbName: 'eventtest',
            tableName: 'posts'
        }, result => {
            if (result.status == 200) {
                console.log(result);
                callback(result)
            } else {
                callback({
                    status: 500,
                    msg: 'unable to fetch'
                })
            }
        });
    }

    function registerEvent(data, callback) {
        fw.getApiInstance('mongo').insert({
            dbName: 'eventtest',
            tableName: 'registrations',
            value: data
        }, result => {
            if (result.status == 200) {
                callback({
                    status: 200,
                    msg: 'Successfully Created'
                })
            } else {
                callback({
                    status: 500,
                    msg: 'unable to create'
                })
            }
        });
    }
}