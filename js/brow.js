function $(id){
    return document.getElementById(id).value   
}

function r(name){
    var obj = document.getElementsByName(name)
    for(var i=0; i< obj.length; i++){
        if(obj[i].checked){
            return obj[i].value
        }
    }
    return null
}

function set(id,val){
    document.getElementById(id).value = val
}

function setr(name,val){
    var obj = document.getElementsByName(name)
    console.log(obj)
    for(var i=0; i< obj.length; i++){
        obj[i].checked = obj[i].value === val
    }
}

chrome.storage.local.get({name:'', phone: '', idcard: '',namePrefix:'',nameSuffix:'', ageMin:18, ageMax:72, sex:"0"}, function(items) {
    set('trueName',items.name)
    set('truePhone',items.phone)
    set('trueCard',items.idcard)
    // set('namePrefix',items.namePrefix)
    // set('nameSuffix',items.nameSuffix)
    // set('ageMin',items.ageMin)
    // set('ageMax',items.ageMax)
    // setr('sex',items.sex)
});

document.getElementById('save').onclick = function(){
    chrome.storage.local.set({
        name: $('trueName'), 
        phone:$('truePhone'), 
        idcard:$('trueCard'), 
        // namePrefix:$('namePrefix'), 
        // nameSuffix:$('nameSuffix'), 
        // ageMin:$('ageMin'), 
        // ageMax:$('ageMax'), 
        // sex:r('sex')
    },function(){
        chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: '../image/icon-48.png',
            title: '保存成功',
            message: '配置已经生效，请继续使用！'
        });
    })
}