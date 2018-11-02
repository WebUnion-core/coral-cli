const schedule = require('node-schedule');
const http = require('http');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const source = require('./../../config/config.json').articleSource;

// 获取爬取数据
function getCrawlArticleData(callback) {
    let html;
    const data = [];

    http.get(source, (res) => {
        res.on('data', (chunk) => {
            html += chunk;
        });

        res.on('end', () => {
            const $ = cheerio.load(html);
            const articleItems = $('.figure');

            for (let i = 0; i < articleItems.length; i++) {
                const item = articleItems.eq(i);
                const figureEl = item.find('.figcaption a')[0];
                const imgEl = item.find('.figure .img')[0];
                const info = item.find('.subtitle').find('span');
                const comment = parseInt(info.eq(2).text(), 10);
                let img;

                if (imgEl) {
                    const bgSrc = imgEl.attribs['style'].match(/\(.+\)/g)[0];
                    img = bgSrc.substr(1, bgSrc.length - 2);
                } else {
                    continue;
                }

                data.push({
                    title: figureEl.attribs['title'],
                    link: figureEl.attribs['href'],
                    author: info.eq(0).text(),
                    time: Date.now(),
                    comment: isNaN(comment) ? 0 : comment,
                    img: img
                });
            }

            if (callback) {
                callback(data);
            }
        });
    });
}

// 将文章数据保存到数据库
function saveArticleToDatabase(resData) {
    const Article = mongoose.model('Article');
    const data = [];

    for (let i = 0; i < resData.length; i++) {
        const item = resData[i];
        data.push({
            'title': item.title,
            'guide_image_url': item.img,
            'content': '--',
            'publish_date': item.time,
            'author': item.author,
            'comment': item.comment
        });
    }
    Article.insertMany(data);
}

/**
 * 每小时爬取文章数据定时任务
 */
module.exports = function () {
    schedule.scheduleJob('* * */1 * *', function(){
        getCrawlArticleData(saveArticleToDatabase);
    });
};
