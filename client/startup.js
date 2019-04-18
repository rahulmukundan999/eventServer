module.exports = startup;
function startup(fw,callback) {
    console.log('startup',fw);
    callback();
}