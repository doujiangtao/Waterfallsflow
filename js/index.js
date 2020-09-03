; (function (doc) {
    var oItems = document.getElementsByClassName('wf_item'),
        oItemsLen = oItems.length,
        _arr = [];//存放第一行的数据
    var init = function () {
        setImgPos();
    }

    function setImgPos() { //定位每张图片的位置
        var item;
        for (var i = 0; i < oItemsLen; i++) {
            item = oItems[i];
            item.style.width = 232 + 'px';
            if (i < 5) {
                _arr.push(item.offsetHeight);
                item.style.top = 0 + "px";
                if ((i + 1) % 5 === 1) {
                    item.style.left = 0;
                }
                item.style.left = (232 + 10) * i + "px";

            } else {
                // 计算top值
                MinIndex = getMinIndex(_arr); //找到图片最短的一张的索引
                item.style.left = oItems[MinIndex].offsetLeft + "px";
                item.style.top = (_arr[MinIndex] + 10) + "px";
                
                _arr[MinIndex] += item.offsetHeight + 10;//找到最小高度的图片之后计算top值然后更新他的offsetheight
               
            }
        }

    }


    function getMinIndex(_arr) {
        return [].indexOf.call(_arr, Math.min.apply(null, _arr));
    }

    window.onload = function () {

        init();

    }
}(document))