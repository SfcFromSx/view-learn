function templateInit(para) {
    const isTest = (para === null || para === '');
    $("div").each(function () {
        // 筛选最底层div
        if(this.firstElementChild) {
            return;
        }
        // 添加初始化类
        if(this.innerText !== '') {
            $(this).attr('id',this.innerText);
            $(this).addClass("diy-chart");
        }
        $(this).css("font-size", 20);
        // 测试状态为模板填充颜色
        if (isTest) {
            this.style.background =
                'rgb('+Math.floor(Math.random()*255)+','
                +Math.floor(Math.random()*255)+','
                +Math.floor(Math.random()*255)+')';
        }
    });
    if (!isTest) viewInit(para);
}

function viewInit(initPara) {
    // 获取参数
    console.log(initPara);
    const paras = JSON.parse(initPara);
    if (!paras || paras.length < 1) {
        return;
    }
    const  para = paras[0];
    console.log(para);
    // 初始化主题相关
    themeInit(para['theme']);
    const chartParas = para['chartParas'];
    // 初始化图表
    for (let i = 0; i < chartParas.length; i++) {
        const chartPara = chartParas[i];
        const div = document.querySelector("#" + chartPara['location']);
        const title = chartPara['chartTitle'];
        if (title === '') {
            $(div).removeClass("diy-chart");
            $(div).addClass("diy-chart-no-title");
        }
        div.parentNode.firstElementChild.innerText = chartPara['chartTitle'];
        chartPara['theme'] = paras[0]['theme'];
        chartInit(div, chartPara);
    }
}

function themeInit(theme) {
    // 初始化背景色、标题、边框
    let bodyColor, h2Color, borderColor;
    switch (theme) {
        case "blueDiy":
            bodyColor = "#210565";
            h2Color = "#c5d3e2";
            borderColor = "rgb(31,38,105)";
            break;
        case "chalk":
            bodyColor = "rgba(20,26,83,1)";
            h2Color = "#beb4b4";
            borderColor = "rgb(31,38,105)";
            break;
        case "dark":
            bodyColor = "rgba(51,51,51,1)";
            h2Color = "#beb4b4";
            borderColor = "rgb(93,93,93)";
            break;
        case "blueTech":
            h2Color = "rgb(204 211 244)";
            borderColor = "rgb(204 211 244)";
            break;
        case "customed":
        default:
            bodyColor = "rgba(0, 0, 0, 0)";
            h2Color = "rgb(255,255,255)";
            break;
    }
    $("body").css("backgroundColor", bodyColor);
    $("h1").css("color", h2Color);
    $("h2").css("color", h2Color);
    $(".diy-panel").css("color", h2Color);
}

function chartInit(div, para) {
    const chart = echarts.init(div, para['theme']);
    const option = parseOptionFromJSON(para['optionJson']);
    updateByAjax(option, para, function (newData) {
        for (let i = 0; i < newData.length && i <  option.series.length; i++) {
            option.series[i].data = newData[i];
        }
        option && chart.setOption(option);
    });
}

let previewChart;
function preChartInit(div, para) {
    if (previewChart) {
        previewChart.dispose();
    }
    previewChart = echarts.init(div, para['theme']);
    const option = parseOptionFromJSON(para['optionJson']);
    previewUpdateByAjax(option, para, function (newData) {
        for (let i = 0; i < newData.length && i <  option.series.length; i++) {
            option.series[i].data = newData[i];
        }
        option && previewChart.setOption(option);
    });
}

let previewOption;
function previewOptionInit(div, optionStr, theme) {
    if (previewOption) {
        previewOption.dispose();
    }
    let option
    try {
        option = parseOptionFromJSON(optionStr);
        previewOption = echarts.init(div, theme);
        option && previewOption.setOption(option);
    }catch (e) {
        alert("option格式错误，请检查");
    }
}

function previewChartInit(div, value, theme) {
    var para = JSON.parse(value);
    para['theme'] = theme;
    try {
        $.ajax({
            url: "http://localhost:8080/learn/view/config/query/option/" + para['chartType'],
            data: {},
            type: "GET",
            dataType: "JSON",
            success: function(config) {
                para['optionJson'] = JSON.stringify(config);
                preChartInit(div, para);
            }
        });
    } catch (e) {
        console.log(e);
        alert("图表参数错误，请检查");
    }
}

let preViewClock = null;
function previewUpdateByAjax(option, para, callBack) {
    console.log('init');
    if(preViewClock) {
        clearInterval(preViewClock);
    }
    update();
    preViewClock = setInterval(update, para['frequency']);
    function update() {
        if (para['dataUrl'] === '') {
            callBack({});
            return;
        }
        $.ajax({
            url: para['dataUrl'],
            data: {},
            type: "GET",
            dataType: "JSON",
            success: function(newData) {
                console.log(newData);
                callBack(newData);
            }
        });
    }
}

function updateByAjax(option, para, callBack) {
    update();
    setInterval(update, para['frequency']);
    function update() {
        if (para['dataUrl'] === '') {
            callBack({});
            return;
        }
        $.ajax({
            url: para['dataUrl'],
            data: {},
            type: "GET",
            dataType: "JSON",
            success: function(newData) {
                callBack(newData);
            }
        });
    }
}

// ------------------
// 自定义函数声明与替换
// ------------------
function parseOptionFromJSON(optionStr) {
    let option = JSON.parse(optionStr);
    replaceDiyFunction(option);
    return option;
}


const colors = [
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#1e90ff', '#bfc755', 'rgba(154,97,215,0.98)', '#ffd700',
];

function replaceDiyFunction(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string' && obj[key].startsWith("diy_function")) {
            setFunctionByName(obj, key);
        }
        if (typeof obj[key] === 'object') {
            replaceDiyFunction(obj[key]);
        }
    }
}

function setFunctionByName(object, key) {
    switch (object[key]) {
        case 'diy_function_randomColor()':
            object[key] = function () {
                const max = colors.length - 1;
                const min = 0;
                return (
                    colors[Math.floor(Math.random() * (max - min + 1)) + min]
                );
            };
            break;
        case 'diy_function_life_tip()':
            object[key] = function (params) {
                if (params.componentSubType === 'graph') {
                    var showText = "节点详情" + ' <br/>';
                    showText += '上一节点：' + params.data.lastUser + ' <br/>';
                    showText += '处理时间：' + params.data.lastTime + ' <br/>';
                    showText += '当前节点：' + params.data.currentUser + ' <br/>';
                    showText += '接受时间：' + params.data.currentTime + ' <br/>';
                    return showText;
                }
            }
        default:
    }
}
