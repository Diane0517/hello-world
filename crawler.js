/**
 * Created by Administrator on 2016/9/12.
 */
/**
 * Created by Administrator on 2016/9/12.
 */
//先把模块引入
var http = require('http');
var cheerio=require('cheerio');
//要爬的url，具体网址。
var url = 'http://www.imooc.com/learn/348';

//章节过滤器 filterChapters
function filterChapters(html){
    var $ = cheerio.load(html);//加载整个html页面
    var chapters = $('.chapter');//获取大的章节class名
//[{
//    chapterTitle:'',
//    video:[
//        title:'',
//        id:''
//    ]
//}]

    var courseData = [];//课程的信息，是个数组
    chapters.each(function(item){//对所有的章节进行遍历
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text();//获取text内容
        var videos = chapter.find('.video').children('li');//获取li，各自的小视频
        var chapterDate = {//章节信息有章节名称和videos
            chapterTitle:chapterTitle,
            videos:[]
        }
        videos.each(function(item){//每个章节又有很多录像，再次进行遍历
            var video = $(this).find('.J-media-item');//找的对应的a链接
            var videoTitle = video.text();
            var id = video.attr('href').split('video/')[1];///video/6689，需要用的是6689这个数据，所以下标是1

            chapterDate.videos.push({
                title:videoTitle,
                id:id
            })
        })
        courseData.push(chapterDate);
    })
    return courseData;
}
function printCourseInfo(courseData){//打印课程信息
    courseData.forEach(function(item){//对课程信息进行遍历
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');//输出章节名称
        item.videos.forEach(function(video){//对小节依次进行遍历，再输出
            console.log('【'+video.id+'】'+video.title+'\n')
        })
    })

}


http.get(url,function(res){
    var html = '';
    res.on('data',function(data){
        html += data;
    })
    res.on('end',function(){
       var courseData = filterChapters(html);
        printCourseInfo(courseData)
    })
}).on('error',function(){
    console.log('获取课程数据出错。')
})