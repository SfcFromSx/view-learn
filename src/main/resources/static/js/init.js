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
            $(this.parentNode).addClass("diy-panel");
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
    let bodyColor, h2Color;
    switch (theme) {
        case "chalk":
            bodyColor = "rgba(20,26,83,1)";
            h2Color = "#ffffff";
            break;
        case "dark":
            bodyColor = "rgba(51,51,51,1)";
            h2Color = "#ffffff";
            break;
        case "customed":
            bodyColor = "rgba(0, 0, 0, 0)";
            h2Color = "rgba(51,51,51,1)";
            break;
    }
    $("body").css("backgroundColor", bodyColor);
    $("h1").css("color", h2Color);
    $("h2").css("color", h2Color);
}

function chartInit(div, para) {
    const myChart = echarts.init(div, para['theme']);
    const option = JSON.parse(para['optionJson']);
    updateByAjax(option, para, function (newData) {
        console.log(newData);
        for (let i = 0; i < newData.length && i <  option.series.length; i++) {
            option.series[i].data = newData[i];
        }
        option && myChart.setOption(option);
    });
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

function updateByAjax(option, para, callBack) {
    console.log('init');
    update();
    setInterval(update, para['frequency']);
    function update() {
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