function viewInit(initPara) {
    console.log(initPara);
    const paraObject = JSON.parse(initPara)[0];
    console.log(paraObject);
    const chartParas = paraObject['chartParas'];
    for (let i = 0; i < chartParas.length; i++) {
        const chartPara = chartParas[i];
        const div = document.querySelector("#" + chartPara['location']);
        const type = chartPara['chartType'];
        div.parentNode.firstElementChild.innerText = chartPara['chartTitle'];
        chartInit(div, type, chartPara);
    }
}

function chartInit(div, type, para) {
    switch (type) {
        case "funnel":
            funnelInit(div, para);
            break;
        case "wordCloud":
            wordCloudInit(div, para);
            break;
        case "stack":
            stackInit(div, para);
            break;
        case "pie":
            pieInit(div, para);
            break;
        case "stackArea":
            stackAreaInit(div, para);
            break;
        case "liquidFill":
            liquidFillInit(div, para);
            break;
        case "tree":
            treeInit(div, para);
    }
}

function funnelInit(funnelDiv, para) {
    var myChart = echarts.init(funnelDiv);
    option = {
        // title: {
        //     text: '漏斗分析图',
        //     subtext: '网站用户行为统计－纯属虚构',
        //     x:'center',
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        // backgroundColor: '#522257',
        color: ['#efbb1a', '#d77169', '#c14f60', '#953f61', '#72355f'],
        series : [
            {
                name:'漏斗图',
                type:'funnel',
                x: '10%',
                y: 60,
                //x2: 80,
                y2: 60,
                width: '80%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                minSize: '20%',
                maxSize: '100%',
                sort : 'descending', // 'ascending', 'descending'
                gap :0,
                roseType: true,
                label: {
                    normal: {
                        formatter: function (params) {
                            return params.name + ' ' + params.value + '%';
                        },
                        position: 'center'
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        shadowBlur: 30,
                        shadowOffsetX: 0,
                        shadowOffsetY: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }

            }
        ]
    };
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
                option.series[0].data = newData.sort(function (a, b) { return a.value - b.value});
                myChart.setOption(option);
            }
        });
    }
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

function wordCloudInit(wordCloudDiv, para) {
    // var colors = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    var colors = [
        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#1e90ff', '#ffffff', '#bfc755', 'rgba(154,97,215,0.98)', '#ffd700',
    ];
    var max = colors.length - 1;
    var min = 0;

    var myChart1 = echarts.init(wordCloudDiv);
    var series1 = [
        {
            type: 'wordCloud',
            rotationRange: [0,0],
            gridSize: 30,
            shape: 'diamond',
            sizeRange: [30, 60],
            width: 600,
            height: 300,
            textStyle: {
                normal: {
                    fontFamily: '微软雅黑',//未生效？
                    fontWeight: 'bold',
                    color: function () {
                        return (
                            colors[Math.floor(Math.random() * (max - min + 1)) + min]
                        );
                    },
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333',
                },
            },
        },
    ]

    var option1 = {
        tooltip: {
            show: true,
        },
        series: series1,
    };

    function update() {
        $.ajax({
            url: para['dataUrl'],
            data: {},
            type: "GET",
            dataType: "JSON",
            success: function(newData) {
                console.log(newData);
                option1.series[0].data = newData;
                myChart1.setOption(option1);
            }
        });
    }
    update();
    setInterval(update, para['frequency']);

    window.addEventListener("resize", function() {
        myChart1.resize();
    });
}

function stackInit(div, para) {
    var myChart = echarts.init(div);
    var option;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            textStyle: {
                color: "#7c96b4"
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            // 刻度隐藏
            axisTick: {
                show: false
            },
            // 修饰刻度标签的颜色
            axisLabel: {
                color: "rgba(255,255,255,.7)"
            },
            // 轴线隐藏
            axisLine: {
                show: false
            },
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            // 刻度隐藏
            axisTick: {
                show: false
            },
            // 修饰刻度标签的颜色
            axisLabel: {
                color: "rgba(255,255,255,.7)"
            },
            // 轴线隐藏
            axisLine: {
                show: false
            },
        },
        series: [
            {
                name: 'Direct',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [301, 334, 390, 330, 320]
            },
            {
                name: 'Mail Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [101, 134, 90, 230, 210]
            },
            {
                name: 'Affiliate Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [201, 154, 190, 330, 410]
            }
        ]
    };
    option && myChart.setOption(option);
}

function pieInit(div, para) {
    var myChart = echarts.init(div);
    var option;

    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center',
            textStyle: {
                color: "#7c96b4"
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]
    };

    option && myChart.setOption(option);
}

function stackAreaInit(div, para) {
    var myChart = echarts.init(div);
    var option;

    option = {
        // title: {
        //     text: 'Stacked Area Chart'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            textStyle: {
                color: "#7c96b4"
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                // 去除刻度??
                axisTick: {
                    show: false
                },
                // 修饰刻度标签的颜色
                axisLabel: {
                    color: "rgba(255,255,255,.7)"
                },
                // 去除x坐标轴的颜色??
                axisLine: {
                    show: false
                },
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                // 去除刻度??
                axisTick: {
                    show: false
                },
                // 修饰刻度标签的颜色
                axisLabel: {
                    color: "rgba(255,255,255,.7)"
                },
                // 去除x坐标轴的颜色??
                axisLine: {
                    show: false
                },
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    option && myChart.setOption(option);
}

function liquidFillInit(div, para) {
    var myChart = echarts.init(div);
    var option;
    option = {
        series: [{
            backgroundStyle: {
                borderWidth: 0
            },
            outline: {
                borderDistance: 0
            },
            type: 'liquidFill',
            data: [0.8, 0.5, 0.4, 0.3],
            radius: '80%'
        }]
    };
    option && myChart.setOption(option);
}

function treeInit(div, para) {
    var myChart = echarts.init(div);
    var colors=[
        "#00ADD0",
        "#FFA12F",
        "#B62AFF",
        "#604BFF",
        "#6E35FF",
        "#002AFF",
        "#20C0F4",
        "#95F300",
        "#04FDB8",
        "#AF5AFF"
    ]
    var getdata=function getData() {
        let data = {
            name: "根节点1",
            value: 0,
            children: []
        };
        for (let i = 1; i <= 10; i++) {
            let obj = {
                name: "节点" + i,
                value: i,
                children: [],
            };
            for (let j = 1; j <= 5; j++) {
                let obj2 = {
                    name: `节点1-${i}-${j}`,
                    value: 1 + "-" + i + "-" + j,
                };
                if(j%2==1){
                    obj2.children=[]
                    for (let k = 1; k <= 3; k++) {
                        let obj3 = {
                            name: `节点1-${i}-${j}-${k}`,
                            value: 1 + "-" + i + "-" + j+'-'+k,
                        };
                        obj2.children.push(obj3);
                    }
                }

                obj.children.push(obj2);
            }

            data.children.push(obj);
        }
        let arr=[]
        arr.push(data)
        //
        arr = handle(arr,0)
        console.log(arr);
        return arr;
    }
    var handle = function handleData(data,index,color='#00f6ff'){
        //index标识第几层
        return data.map((item,index2)=>{
            //计算出颜色
            if(index==1){
                color = colors.find((item, eq) => eq == index2 % 10);
            }
            // 设置节点大小
            if(index===0 || index===1){
                item.label= {
                    position: "inside",
                    //   rotate: 0,
                    //   borderRadius: "50%",
                }
            }
            // 设置label大小
            switch(index){
                case 0:
                    item.symbolSize=70
                    break;
                case 1:
                    item.symbolSize=50
                    break;
                default:
                    item.symbolSize=10
                    break;
            }
            // 设置线条颜色
            item.lineStyle= { color: color }

            if (item.children) {//存在子节点
                item.itemStyle = {
                    borderColor: color,
                    color:color
                };
                item.children=handle(item.children,index+1,color)
            } else {//不存在
                item.itemStyle = {
                    color:'transparent',
                    borderColor: color
                };
            }
            return item
        })
    }

    var option = {
        type: "tree",
        // backgroundColor: "#000",
        toolbox: { //工具栏
            show: true,
            iconStyle: {
                borderColor: "#03ceda"
            },
            feature: {
                restore: {}
            }
        },
        tooltip: {//提示框
            trigger: "item",
            triggerOn: "mousemove",
            backgroundColor: "rgba(1,70,86,1)",
            borderColor: "rgba(0,246,255,1)",
            borderWidth: 0.5,
            textStyle: {
                fontSize: 10
            }
        },
        series: [
            {
                type: "tree",
                hoverAnimation: true, //hover样式
                data:getdata(),

                top: '9%',
                // left: 'center',
                // bottom: '5%',

                // top: 0,
                // bottom: 0,
                // left: 0,
                // right: 0,

                layout: "radial",
                symbol: "circle",
                symbolSize: 10,
                nodePadding: 20,
                animationDurationUpdate: 750,
                expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                initialTreeDepth: 2,
                roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
                focusNodeAdjacency: true,
                itemStyle: {
                    borderWidth: 1,
                },
                label: { //标签样式
                    color: "#fff",
                    fontSize: 10,
                    fontFamily: "SourceHanSansCN",
                    position: "inside",
                    rotate: 0,
                },
                lineStyle: {
                    width: 1,
                    curveness:0.5,
                }
            }
        ]
    };
    option && myChart.setOption(option);
}