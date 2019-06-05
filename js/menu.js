chrome.contextMenus.create({
    type: 'normal',
    title: '模拟数据插入',
    id: 'menuDemo',
    contexts: ['editable']
});

chrome.contextMenus.create({
    type: 'normal',
    title: '随机姓名',
    id: 'randomName',
    parentId: 'menuDemo',
    contexts: ['editable'],
    onclick: genericOnClick
});

chrome.contextMenus.create({
    type: 'normal',
    title: '随机证件号',
    id: 'randomPerson',
    parentId: 'menuDemo',
    contexts: ['editable'],
    onclick: genericOnClick
});

chrome.contextMenus.create({
    type: 'normal',
    title: '随机手机号码',
    id: 'randomPhone',
    parentId: 'menuDemo',
    contexts: ['editable'],
    onclick: genericOnClick
});

chrome.contextMenus.create({
    type: 'normal',
    title: '指定姓名',
    id: 'trueName',
    parentId: 'menuDemo',
    contexts: ['editable'],
    onclick: genericOnClickStorge
});

chrome.contextMenus.create({
    type: 'normal',
    title: '指定手机号码',
    id: 'truePhone',
    parentId: 'menuDemo',
    contexts: ['editable'],
    onclick: genericOnClickStorge
});

chrome.contextMenus.create({
    type: 'normal',
    title: '指定证件号',
    id: 'trueIdCard',
    parentId: 'menuDemo',
    contexts: ['editable'],
    onclick: genericOnClickStorge
});

function genericOnClick(info, tab) {
    chrome.tabs.sendMessage(tab.id, {'tab':tab,  'info': info , 'isStorge': false});
}

function genericOnClickStorge(info, tab) {
    chrome.tabs.sendMessage(tab.id, {'tab':tab,  'info': info , 'isStorge': true});
}