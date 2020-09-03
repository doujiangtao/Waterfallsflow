; (function (doc) {

    var Waterfall = function (wrapper, opt) {
        this.oWrapper = doc.getElementsByClassName(wrapper)[0];
        this.cloum = opt.cloum;
        this.gap = opt.gap;
        this.text=opt.text;
        this.textHiehgt=this.text?opt.textHiehgt:0;
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
            var oItems=null,
                minIdx=-1;
            data.forEach((elem, index) => {
                var minIdx=getMinIndex(this.heightArr);
                var oItem = doc.createElement('div'),
                    oImg = new Image(),
                    oTitle=doc.createElement('div'),
                    oA=doc.createElement('a'),
                    itemLeft = (index + 1) % this.cloum === 1 ? '0' : index * (this.itemWidth + this.gap);
                    oItem.className = 'wf_item';
                    oItem.style.width = this.itemWidth + 'px';
                    oItem.style.height=elem.imgHeight*this.itemWidth/elem.imgWidth+this.textHiehgt+'px';
                    oItem.setAttribute('arr',index)
                    oImg.src=elem.imgUrl;
                    oA.href="http://www.baidu.com";
                    oA.appendChild(oImg);
                    oItem.appendChild(oA);
                    if(this.text){
                        oTitle.innerHTML="<p>测试文本</p>";
                        oTitle.className='title-box';
                    }
                    oItem.appendChild(oTitle);
                    this.oWrapper.appendChild(oItem);
                    oItems=doc.getElementsByClassName('wf_item');
                    if (index < this.cloum && pageNum==0) {
                        this.heightArr.push(oItem.offsetHeight);
                          oItem.style.top = 0 + "px";
                          oItem.style.left = itemLeft + "px";
                    }else{
                        oItem.style.left = oItems[minIdx].offsetLeft + "px";
                        oItem.style.top = (this.heightArr[minIdx]+this.gap)+ "px";
                        this.heightArr[minIdx]+=(oItem.offsetHeight+this.gap);
                    }
                    oImg.style.opacity=1;
            },this);
        }
    }


    function getMinIndex(_arr) {
        return [].indexOf.call(_arr, Math.min.apply(null, _arr));
    }


    window.Waterfall = Waterfall;


}(document))