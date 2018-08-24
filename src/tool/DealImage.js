/**
 * Created by apin on 2017/8/2.
 */
let DealImage = {
    /**
     * @param width {string}宽
     * @param height {string}高
     * @param type {string}图片的剪切方式 1-5
     */
    getNewImage(url,options){
        var urlArr = url.split("?")
        if (!urlArr||!urlArr[1]) {return url}

        var imgArr = urlArr[1]?urlArr[1].split("/"):[];
        if (imgArr[1]){
            imgArr[1] =options.type?options.type:imgArr[1];
        }
        if (imgArr[3]){
            imgArr[3] = options.width?options.width:imgArr[3];
        }
        if (imgArr[5]){
            imgArr[5] = options.height?options.height:imgArr[5];
        }
        if (imgArr){
            var urlStr = imgArr.join("/");
            var newUrl = urlArr[0]+"?"+urlStr;
            return newUrl;
        }
        return url;
    },
}
module.exports = DealImage;