const schedule = require('node-schedule');

/**
 * 每小时爬取文章数据定时任务
 */
module.exports = function () {
    schedule.scheduleJob('* * */1 * *', function(){
        console.log(Date.now());
    });
};
