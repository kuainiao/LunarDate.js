(function (e) {
    function LunarDate(){
        var _this;
        var $thead_tr_td_select_Y; //年
        var $thead_tr_td_select_M; //月
        var $thead_tr_td_gz; //生肖
        var callback; //选择日期回调
        var ps; //其他参数
//用自定义变量保存当前系统中的年月日
        var Today = new Date();
        var tY = Today.getFullYear();
        var tM = Today.getMonth();
        var tD = Today.getDate();
        var lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);
        var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
        var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
        var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
        var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
        var nStr2 = new Array('初', '十', '廿', '卅');
//公历节日
        var sFtv = new Array("0101 元旦", "0214 情人节", "0308 妇女节", "0312 植树节", "0315 消费者权益日", "0401 愚人节", "0501 劳动节", "0504 青年节", "0512 护士节", "0601 儿童节", "0701 建党节", "0801 建军节", "0910 教师节", "0928 孔子诞辰", "1001 国庆节", "1006 老人节", "1024 联合国日", "1224 平安夜", "1225 圣诞节");
//农历节日
        var lFtv = new Array("0101 春节", "0115 元宵节", "0505 端午节", "0707 七夕情人节", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1224 小年");

        var fat= 9, mat = 9,eve = 0,Ssfw;

        /*初始化界面*/
        function InitUi() {

            _this.css({
                width: "100%",
                "border-left": "1px solid #ccc",
                "border-top": "1px solid #ccc",
                'text-align': 'center'
            })
                .attr('cellpadding', 0)
                .attr('cellspacing', 0);

            var $thead = $("<thead>");
            $thead.css({
                'background-color': '#000'
            });
            var $thead_tr = $("<tr>").appendTo($thead);
            var $thead_tr_td = $("<td colSpan=7>").appendTo($thead_tr);
            $thead_tr_td.css({
                'border-bottom': '1px solid #ccc',
                'border-right': '1px solid #ccc',
                'text-align': 'center',
                'padding': '5px 3px',
                'font': 'normal 12px/normal "microsoft yahei"',
                'color': '#fff',
                'text-align': 'center'

            });
            $("<span>").text("公历").appendTo($thead_tr_td).css({
                'padding': "3px"
            });
            $thead_tr_td_select_Y = $("<select>").appendTo($thead_tr_td);
            var start=2015;
            var end=2020;
            if(ps != undefined ){
                if( ("start" in ps)){
                    start=ps["start"];
                }
                if( ("end" in ps)){
                    end=ps["end"];
                }
            }

            for (var i = start; i < end; i++) {
                $("<option>").text(i).val(i).appendTo($thead_tr_td_select_Y);
            }
            $("<span>").text("年").appendTo($thead_tr_td).css({
                'padding': "3px"
            });
            $thead_tr_td_select_M = $("<select>").appendTo($thead_tr_td);
            for (var i = 1; i < 13; i++) {
                $("<option>").text(i).val(i).appendTo($thead_tr_td_select_M);
            }
            $thead_tr_td_gz = $("<span>").appendTo($thead_tr_td);
            $thead.appendTo(_this);

            var $tbody = $("<tbody>");
            var $tbody_tr = $("<tr>").appendTo($tbody);
            $tbody_tr.css({
                'background-color': '#eee'

            });
            var weekarr = new Array("日", "一", "二", "三", "四", "五", "六");
            for (var week in weekarr) {
                $("<td>").text(weekarr[week]).width(54).appendTo($tbody_tr).css({
                    'border-bottom': '1px solid #ccc',
                    'border-right': '1px solid #ccc',
                    'text-align': 'center',
                    'padding': '3px 3px',
                    'font-size': '12px'
                });
            }
            for (var i = 0; i < 6; i++) {
                var $tbody_tr_data = $("<tr>").appendTo($tbody);
                for (var j = 0; j < 7; j++) {
                    var $tbody_tr_data_td = $("<td class='gsd_item'>").appendTo($tbody_tr_data).css({
                        'border-bottom': '1px solid #ccc',
                        'border-right': '1px solid #ccc',
                        'text-align': 'center',
                        'padding': '3px 2px',
                        'font-size': '12px'
                    });
                    $("<span>").css({'font-weight': 'bold', 'font-size': '14px'}).appendTo($tbody_tr_data_td);
                    $("<br>").appendTo($tbody_tr_data_td);
                    $("<span>").appendTo($tbody_tr_data_td);
                }
            }
            $tbody.appendTo(_this);
        }

//打开页时,在下拉列表中显示当前年月,并调用自定义函数drawCld(),显示公历和农历的相关信息
        function initial() {
            var current_y=tY;
            var current_m=tM+1;
            if(ps != undefined ){
                if( ("current" in ps)){
                    var arr=ps['current'].split("-");
                    current_y=parseInt(arr[0]);
                    current_m=parseInt(arr[1]);
                }
            }
            /*设置默认年份*/
            $thead_tr_td_select_Y.val(current_y);
            /*设置默认月份*/
            $thead_tr_td_select_M.val(current_m);



            /*选择年份*/
            $thead_tr_td_select_Y.change(function () {
                changeCld();
            });

            /*选择月份*/
            $thead_tr_td_select_M.change(function () {
                changeCld();
            });
            drawCld(current_y, current_m-1);
        }

//在下拉列表中选择年月时,调用自定义函数drawCld(),显示公历和农历的相关信息
        function changeCld() {
            var y, m;
            y = $thead_tr_td_select_Y.val();
            m = $thead_tr_td_select_M.val() - 1;
            drawCld(y, m);
        }

//在表格中显示公历和农历的日期,以及相关节日
        function drawCld(SY, SM) {
            var i,sD,s;
            var cld = new calendar(SY, SM);
            $thead_tr_td_gz.text('【' + Animals[(SY - 4) % 12] + '】');	//生肖
            for (i = 0; i < 42; i++) {
                var sObj = $(_this).find(".gsd_item").eq(i).find("span").eq(0)[0];
                var lObj = $(_this).find(".gsd_item").eq(i).find("span").eq(1)[0];
                sObj.className = '';
                sD = i - cld.firstWeek;
                $(_this).find(".gsd_item").eq(i).css({
                    'background-color':""
                });
                if (sD > -1 && sD < cld.length) { //日期内
                    sObj.innerHTML = sD + 1;
                    if (cld[sD].lDay == 1) { //显示农历月
                        lObj.innerHTML = '<b>' + (cld[sD].isLeap ? '闰' : '') + cld[sD].lMonth + '月' + (monthDays(cld[sD].lYear, cld[sD].lMonth) == 29 ? '小' : '大') + '</b>';
                    }
                    else {
                        lObj.innerHTML = cDay(cld[sD].lDay);
                        lObj.style.color = "";
                    }	//显示农历日
                    var Slfw = Ssfw = null;
                    s = cld[sD].solarFestival;
                    for (var ipp = 0; ipp < lFtv.length; ipp++) {	//农历节日
                        if (parseInt(lFtv[ipp].substr(0, 2)) == (cld[sD].lMonth)) {
                            if (parseInt(lFtv[ipp].substr(2, 4)) == (cld[sD].lDay)) {
                                lObj.innerHTML = lFtv[ipp].substr(5);
                                lObj.style.color = "red";
                                Slfw = lFtv[ipp].substr(5);
                            }
                        }
                        if (12 == (cld[sD].lMonth)) {	//判断是否为除夕
                            if (eve == (cld[sD].lDay)) {
                                lObj.innerHTML = "除夕";
                                Slfw = "除夕";
                            }
                        }
                    }
                    for (var ipp = 0; ipp < sFtv.length; ipp++) {	//公历节日
                        if (parseInt(sFtv[ipp].substr(0, 2)) == (SM + 1)) {
                            if (parseInt(sFtv[ipp].substr(2, 4)) == (sD + 1)) {
                                lObj.innerHTML = sFtv[ipp].substr(5);
                                lObj.style.color = "violet";
                                Ssfw = sFtv[ipp].substr(5);
                            }
                        }
                    }
                    if ((SM + 1) == 5) {	//母亲节
                        if (fat == 0) {
                            if ((sD + 1) == 7) {
                                Ssfw = "母亲节";
                                lObj.innerHTML = "母亲节";
                                lObj.style.color = "violet";
                            }
                        }
                        else if (fat < 9) {
                            if ((sD + 1) == ((7 - fat) + 8)) {
                                Ssfw = "母亲节";
                                lObj.innerHTML = "母亲节";
                                lObj.style.color = "violet";
                            }
                        }
                    }
                    if ((SM + 1) == 6) {	//父亲节
                        if (mat == 0) {
                            if ((sD + 1) == 14) {
                                Ssfw = "父亲节";
                                lObj.innerHTML = "父亲节";
                                lObj.style.color = "violet";
                            }
                        }
                        else if (mat < 9) {
                            if ((sD + 1) == ((7 - mat) + 15)) {
                                Ssfw = "父亲节";
                                lObj.innerHTML = "父亲节";
                                lObj.style.color = "violet";
                            }
                        }
                    }
                    if (s.length <= 0) {	//设置节气的颜色
                        s = cld[sD].solarTerms;
                        if (s.length > 0) s = s.fontcolor('limegreen');
                    }
                    if (s.length > 0) {
                        lObj.innerHTML = s;
                        Slfw = s;
                    }	//节气
                    if ((Slfw != null) && (Ssfw != null)) {
                        lObj.innerHTML = Slfw + "/" + Ssfw;
                    }
                    if (cld[sD].isToday) {
                        sObj.style.color = 'red';//今日颜色
                        $(sObj).css('font-size','18px').css('border','1px solid red').css('border-radius','100px').css('padding','3px').css('font-weight','');
                        lObj.style.display = 'none';
                        sObj.innerHTML="今";
                        $(_this).find(".gsd_item").eq(i).css({
                           /* 'background-color':"#f50"*/
                        }).attr('today',true);
                    } else {
                        sObj.style.color = '';
                        $(sObj).css('font-size','14px').css('border','none').css('border-radius','0px').css('padding','0px').css('font-weight','bold');
                        lObj.style.display = 'block';
                        $(_this).find(".gsd_item").eq(i).css({
                            'background-color':""
                        }).attr('today',false);
                    }
                }
                else { //非日期
                    sObj.innerHTML = '';
                    lObj.innerHTML = '';
                }
      /*          if (i % 7 == 0) {
                    *//*周天*//*
                    if(sObj.style.color != 'rgb(255, 255, 255)')
                    sObj.style.color = "red";
                }*/
/*                if (i % 7 == 6) {
                    *//*周天*//*
                    if(sObj.style.color != 'rgb(255, 255, 255)')
                    sObj.style.color = "#000080";
                }*/
            }
        }

//返回农历y年的总天数
        function lYearDays(y) {
            var i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1)sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
            return (sum + leapDays(y));
        }

//返回农历y年闰月的天数
        function leapDays(y) {
            if (leapMonth(y))  return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
            else return (0);
        }

//判断y年的农历中那个月是闰月,不是闰月返回0
        function leapMonth(y) {
            return (lunarInfo[y - 1900] & 0xf);
        }

//返回农历y年m月的总天数
        function monthDays(y, m) {
            return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
        }

//算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
        function Dianaday(objDate) {
            var i, temp = 0;
            var baseDate = new Date(1900, 0, 31);
            var offset = (objDate - baseDate) / 86400000;
            this.monCyl = 14;
            for (i = 1900; i < 2050 && offset > 0; i++) {
                temp = lYearDays(i)
                offset -= temp;
                this.monCyl += 12;
            }
            if (offset < 0) {
                offset += temp;
                i--;
                this.monCyl -= 12;
            }
            this.year = i;
            var leap = leapMonth(i); //闰哪个月
            this.isLeap = false;
            for (i = 1; i < 13 && offset > 0; i++) {
                if (leap > 0 && i == (leap + 1) && this.isLeap == false) {	//闰月
                    --i;
                    this.isLeap = true;
                    temp = leapDays(this.year);
                }
                else {
                    temp = monthDays(this.year, i);
                }
                if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;	//解除闰月
                offset -= temp;
                if (this.isLeap == false) this.monCyl++;
            }
            if (offset == 0 && leap > 0 && i == leap + 1)
                if (this.isLeap) {
                    this.isLeap = false;
                }
                else {
                    this.isLeap = true;
                    --i;
                    --this.monCyl;
                }
            if (offset < 0) {
                offset += temp;
                --i;
                --this.monCyl;
            }
            this.month = i;
            this.day = offset + 1;
        }

//返回公历y年m+1月的天数
        function solarDays(y, m) {
            if (m == 1)
                return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
            else
                return (solarMonth[m]);
        }

//记录公历和农历某天的日期
        function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap) {
            this.isToday = false;
            //农历
            this.lYear = lYear;
            this.lMonth = lMonth;
            this.lDay = lDay;
            this.isLeap = isLeap;
            //节日记录
            this.solarFestival = ''; //公历节日
            this.solarTerms = ''; //节气
        }

//返回某年的第n个节气为几日(从0小寒起算)
        function sTerm(y, n) {
            var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
            return (offDate.getUTCDate())
        }

//保存y年m+1月的相关信息

        function calendar(y, m) {

            fat = mat = 0;
            var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2;
            var lDPOS = new Array(3);
            var n = 0;
            var firstLM = 0;
            sDObj = new Date(y, m, 1);	//当月第一天的日期
            this.length = solarDays(y, m);    //公历当月天数
            this.firstWeek = sDObj.getDay();    //公历当月1日星期几
            if ((m + 1) == 5) {
                fat = sDObj.getDay()
            }
            if ((m + 1) == 6) {
                mat = sDObj.getDay()
            }
            for (var i = 0; i < this.length; i++) {
                if (lD > lX) {
                    sDObj = new Date(y, m, i + 1);    //当月第一天的日期
                    lDObj = new Dianaday(sDObj);     //农历
                    lY = lDObj.year;           //农历年
                    lM = lDObj.month;          //农历月
                    lD = lDObj.day;            //农历日
                    lL = lDObj.isLeap;         //农历是否闰月
                    lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最後一天
                    if (lM == 12) {
                        eve = lX
                    }
                    if (n == 0) firstLM = lM;
                    lDPOS[n++] = i - lD + 1;
                }
                this[i] = new calElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7], lY, lM, lD++, lL);
            }
            //节气
            tmp1 = sTerm(y, m * 2) - 1;
            tmp2 = sTerm(y, m * 2 + 1) - 1;
            this[tmp1].solarTerms = solarTerm[m * 2];
            this[tmp2].solarTerms = solarTerm[m * 2 + 1];
            if ((this.firstWeek + 12) % 7 == 5)	//黑色星期五
                this[12].solarFestival += '黑色星期五';
            if (y == tY && m == tM) this[tD - 1].isToday = true;	//今日
        }

//用中文显示农历的日期
        function cDay(d) {
            var s;
            switch (d) {
                case 10:
                    s = '初十';
                    break;
                case 20:
                    s = '二十';
                    break;
                    break;
                case 30:
                    s = '三十';
                    break;
                    break;
                default :
                    s = nStr2[Math.floor(d / 10)];
                    s += nStr1[d % 10];
            }
            return (s);
        }


        function Bind() {
            $(_this).on('mouseover  mouseout', '.gsd_item', function (event) {

                if (event.type == "mouseover") {
                    var d=$(this).find("span").eq(0).text();

                    if(d.length>0){
                        $(this).css({
                            'background-color': '#ddd',
                            'cursor': 'pointer'
                        });
                    }else{
                        $(this).css({
                            'cursor': ''
                        });
                    }

                } else if (event.type == "mouseout") {
                    $(this).css({'background-color': '#fff'});
                }
            });

            $(_this).on('click','.gsd_item',function(){
                var y=$(_this).find("select").eq(0).val();
                var m=$(_this).find("select").eq(1).val();
                var d=$(this).find("span").eq(0).text();
                if(d.length<1){
                    return;
                }
                if(d=="今"){
                    d=tD;
                }

                d=d.toString().trim();
                m=m.toString().trim();

                if(m.length==1){
                    m="0"+m;
                }
                if(d.length==1){
                    d="0"+d;
                }
                callback(y+"-"+m+"-"+d);
            });
        }

        function Init(e,f,p){
            _this = e;
            callback = f;
            ps=p;
            /*初始化Ui*/
            InitUi();
            /*初始化数据*/
            initial();
            /*绑定事件*/
            Bind();
        }
        return Init;
    }

    /*初始化函数*/
    e.fn.LunarInitDate = function (f,p) {
        LunarDate()(this,f,p);
    }
})($);

(function(e){
    var Active;
    function Init(){
        var x=0;
        var y=0;
        var div;
        var table;
        return function(_this,ps){

            div=$("<div>").hide().appendTo("body");
            table=$("<table>").appendTo(div);
            if(_this.val()!=""){
                if(ps==undefined){
                    ps=new Object();
                }
                ps["current"]=_this.val();
            }
            table.LunarInitDate(function(date){
                _this.val(date);
                div.fadeOut(300);
            },ps);

            function InitUi(){
                y=$(_this).offset().top;
                x=$(_this).offset().left;
                y+=$(_this).height();
                div.css({
                    'position':'absolute',
                    'width':'305px',
                    'background':'#fff',
                    'z-index':9999,
                    'left':x+"px",
                    'top':(y+10)+"px",
                    'box-shadow':'0px 0px 8px #333333',
                    'border-radius':'3px'
                });


            }
            function Bind(){
                setInterval(function(){
                    if(!_this.is(":visible") ){
                        div.fadeOut(300);
                    }
                },100);
                $(_this).click(function(e){
                    InitUi();
                    div.fadeIn(300);
                    if(Active!=undefined &&  Active.length==1 && div.length==1){
                        if(Active[0]!=div[0]){
                            Active.hide();
                        }
                    }
                    Active=div;
                    e.stopPropagation();
                });
                $(document).click(function(e){
                    div.fadeOut(300);
                });
                $(div).click(function(e){
                    e.stopPropagation();
                });
            }
            InitUi();
            Bind();
        }

    }
    e.fn.LunarInitDateInit=function(p){
        for(var i=0;i<this.length;i++){
            Init()(this.eq(i),p);
        }

    }
} )($);