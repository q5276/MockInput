var mockContent = null
function randomName() {
    var first =
        "李王张刘陈杨赵黄周吴徐孙胡朱高林何郭马罗梁宋郑谢韩唐冯于董萧程曹袁邓许傅沈曾彭吕苏卢蒋蔡贾丁魏薛叶阎余潘杜戴夏钟汪田任姜范方石姚谭廖邹熊金陆郝孔白崔康毛邱秦江史顾侯邵孟龙万段漕钱汤尹黎易常武乔贺赖龚文";
    var last = "英梅华兰珍芳伟军丽敏荣勇静燕娟婷强云杰平超红艳磊丹萍霞斌波玲涛明峰浩飞辉俊鑫鹏林慧颖洋国刚莉倩娜龙亮琴凯帅雪琳晶阳博兵洁芝宇宁健建岩帆瑞花佳香欢欣莹坤利旭文雷彬柳晨凤璐瑜畅玉想楠东杨成";

    var randomTxt = function randomTxt(str) {
        return str.charAt(Math.random() * str.length);
    };
    return randomTxt(first) + randomTxt(last) + (Math.random() > 0.3 ? randomTxt(last) : "");
};

function randomPhone() {
    var head = [134, 135, 136, 137, 138, 139, 147, 148, 150, 151, 152, 157, 158, 159, 165, 172, 178, 182, 183, 184,
        187, 188, 198, 130, 131, 132, 145, 146, 155, 156, 166, 171, 175, 176, 185, 186, 133, 149, 153, 173, 174,
        177, 180, 181, 189, 191, 199, 170];
    var cont = "";

    for (var i = 0; i < 8; i++) {
        cont += Math.floor(Math.random() * 10);
    }

    return head[Math.floor(Math.random() * head.length)] + cont;
};

function randomPerson(sex, min, max) {
    min = min || 18
    max = max || 72
    var areas = {
        11: "北京市",
        12: "天津市",
        13: "河北省",
        14: "山西省",
        15: "内蒙古自治区",
        21: "辽宁省",
        22: "吉林省",
        23: "黑龙江省",
        31: "上海市",
        32: "江苏省",
        33: "浙江省",
        34: "安徽省",
        35: "福建省",
        36: "江西省",
        37: "山东省",
        41: "河南省",
        42: "湖北省",
        43: "湖南省",
        44: "广东省",
        45: "广西壮族自治区",
        46: "海南省",
        50: "重庆市",
        51: "四川省",
        52: "贵州省",
        53: "云南省",
        54: "西藏自治区",
        61: "陕西省",
        62: "甘肃省",
        63: "青海省",
        64: "宁夏回族自治区",
        65: "新疆维吾尔自治区",
        71: "台湾省",
        81: "香港特别行政区",
        82: "澳门特别行政区"
    };
    var areaIds = Object.keys(areas);
    var areasId = areaIds[Math.floor(Math.random() * areaIds.length)];
    var areaCode = "" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() *
        10) + Math.floor(Math.random() * 10);

    var birthday = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * min - Math.random() * 1000 * 60 * 60 *
        24 * 365 * (max - min));

    var year = birthday.getFullYear();
    var month = birthday.getMonth() > 8 ? birthday.getMonth() + 1 : "0" + (birthday.getMonth() + 1);
    var day = birthday.getDate() > 9 ? birthday.getDate() : "0" + birthday.getDate();
    var seqCode = "" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + (sex > 0 ? Math.floor(Math
        .random() * 5) + sex - 1 : Math.floor(Math.random() * 10));
    var firstCard = areasId + areaCode + year + month + day + seqCode;
    var sign = (12 - firstCard.split('').reduce(function (total, value, index) {
        return total + (index === 17 ? 0 : Math.pow(2, 17 - index) % 11 * value);
    }, 0) % 11) % 11;
    sign = sign === 10 ? 'x' : sign;
    // return {
    //     area: areas[areasId],
    //     birthday: year + "-" + month + "-" + day,
    //     sex: seqCode % 2 === 1 ? "男" : "女",
    //     idCard: firstCard + sign,
    //     age: new Date().getFullYear() - year
    // };
    return firstCard + sign
};

async function trueName(){
    let promise = new Promise((resolve, reject)=>{
        chrome.storage.local.get({name:''}, items=>{
            resolve(items.name)
        })
    })
    let name = await promise
    mockContent.value = name
    mockContent.dispatchEvent(new Event('input'))
}

async function truePhone(){
    let promise = new Promise((resolve, reject)=>{
        chrome.storage.local.get({phone:''}, items=>{
            resolve(items.phone)
        })
    })
    let phone = await promise
    mockContent.value = phone
    mockContent.dispatchEvent(new Event('input'))
}

async function trueIdCard(){
    let promise = new Promise((resolve, reject)=>{
        chrome.storage.local.get({idcard:''}, items=>{
            resolve(items.idcard)
        })
    })
    let idcard = await promise
    mockContent.value = idcard
    mockContent.dispatchEvent(new Event('input'))
}

chrome.extension.onMessage.addListener(function(request, _, response) {
    if(!request.isStorge){
        mockContent.value = eval(request.info.menuItemId + '()')
        mockContent.dispatchEvent(new Event('input'))
    }else{
        eval(request.info.menuItemId + '()')
    }    
});

(function(){
    var inputs = document.getElementsByTagName('input')
    for(var i=0; i< inputs.length; i++){
        inputs[i].addEventListener('contextmenu',function(){
            mockContent = this
        })
    }
})()