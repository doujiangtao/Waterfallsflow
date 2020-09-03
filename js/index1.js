; (function (doc) {

    var Waterfall = function (wrapper, opt) {
        this.oWrapper = doc.getElementsByClassName(wrapper)[0];
        this.cloum = opt.cloum;
        this.gap = opt.gap;
        this.itemWidth = (this.oWrapper.offsetWidth - (this.cloum - 1) * this.gap) / this.cloum;
        this.pageNum = 0;
        this.pageSize = 0;
        this.heightArr = [];
    }


    Waterfall.prototype = {
        inIt: function () {
            this.bindEvent();
            this.getImgDatas();
        },
        bindEvent: function () {
            window.addEventListener('scroll',this.scrollToBottom.bind(this),false)
        },
        getImgDatas: function (pageNum) {
            var _self = this; //ajax请求成功以后this无法正确指向
            if (this.pageNum >= 150) {
                _self.pageNum = 150;
                return '暂无数据'
            } else {
                _self.renderList(arr0,_self.pageNum)
                _self.pageNum++;
                _self.pageSize=150;
            
            }
        },
        scrollToBottom: function () {
            if(document.documentElement.scrollTop+window.innerHeight==document.documentElement.scrollHeight){
                this.pageNum++;
                if(this.pageNum<=this.pageSize-1){
                    this.getImgDatas(this.pageNum)
                }
            }
        },
        renderList: function (data,pageNum) {
            var _self = this,
                oItems=null,
                minIdx=-1,
                idx=0;
            data.forEach((elem, index) => {
                var oItem = doc.createElement('div'),
                    oImg = new Image(),
                    itemLeft = (index + 1) % _self.cloum === 1 ? '0' : index * (_self.itemWidth + _self.gap);
                    oItem.className = 'wf_item';
                    oItem.style.width = _self.itemWidth + 'px';
                    oItem.style.height=parseInt(elem.imgHeight*_self.itemWidth/elem.imgWidth)+'px';
                    oItem.setAttribute('arr',index)
                    oImg.src=elem.imgUrl;
                    oItem.appendChild(oImg);
                    _self.oWrapper.appendChild(oItem);
                    oItems=doc.getElementsByClassName('wf_item');
                    if (index < _self.cloum && pageNum==0) {
                         _self.heightArr.push(oItem.offsetHeight);
                          oItem.style.top = 0 + "px";
                          oItem.style.left = itemLeft + "px";
                    }else{
                        minIdx=getMinIndex(_self.heightArr);
                        oItem.style.left = oItems[minIdx].offsetLeft + "px";
                        oItem.style.top = (_self.heightArr[minIdx]+_self.gap)+ "px";
                        _self.heightArr[minIdx]+=(oItem.offsetHeight+_self.gap);
                    }
                    oImg.style.opacity=1;
            });
        }
    }


    function getMinIndex(_arr) {
        return [].indexOf.call(_arr, Math.min.apply(null, _arr));
    }


    window.Waterfall = Waterfall;


}(document))