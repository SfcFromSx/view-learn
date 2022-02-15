var myChart;

function addBackGroundChart(div) {
    myChart = echarts.init(div);
    setInterval(changeBackGround, 100);
}

function changeBackGround() {
    option.series[1].startAngle = option.series[1].startAngle + 1;
    option.series[2].startAngle = option.series[2].startAngle + 1;
    option.series[3].startAngle = option.series[3].startAngle + 1;
    option.series[4].startAngle = option.series[4].startAngle + 1;
    option && myChart.setOption(option);
}

var option = {
    series: [
        {
            name: '统计',
            type: 'gauge',
            splitNumber: 10, //刻度数量
            min: 0,
            max: 100,
            radius: '58%', //图表尺寸
            center: ['50%', '50%'],
            startAngle: 90,
            endAngle: -269.9999,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 0,
                    shadowBlur: 0,
                    color: [
                        [0, '#0dc2fe'],
                        [1, '#0dc2fe']
                    ]
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#0dc2fe',
                    width: 2
                },
                length: 20,
                splitNumber: 5
            },
            splitLine: {
                show: true,
                length: 20,
                lineStyle: {
                    color: '#0dc2fe',
                }
            },
            axisLabel: {
                show: false
            },
            pointer: { //仪表盘指针
                show: 0,
            },
            detail: {
                borderColor: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 2,
                offsetCenter: [0, '0%'], // x, y，单位px
                textStyle: {
                    color: 'rgba(0,244,255,0.9)',
                    fontSize: '1.3rem',
                    fontFamily: "electronicFont",
                },
                formatter: '{value}'
            },
            data: [{
                name: "",
                value: 8
            }]
        },
        {
        type: 'pie',
        zlevel: 1,
        silent: true,
        radius: ['88%', '987%'],
        hoverAnimation: false,
        color: "rgba(88,142,197,0.5)",
        // animation:false,    //charts3 no
        label: {
            normal: {
                show: false
            },
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data:[1]
    },{
        type: 'pie',
        zlevel: 2,
        silent: true,
        radius: ['80%', '81%'],
        startAngle: 50,
        hoverAnimation: false,
        // animation:false,    //charts3 no
        label: {
            normal: {
                show: false
            },
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: _pie2()
    },{
        type: 'pie',
        zlevel: 5,
        silent: true,
        radius: ['70%', '68%'],
        color:["#fc8d89","#46d3f3","rgba(203,203,203,.2)"],
        startAngle: 50,
        hoverAnimation: false,
        // animation:false,    //charts3 no
        label: {
            normal: {
                show: false
            },
        },
        data: [50,20,40]
    },
        {
            type: 'pie',
            zlevel: 20,
            silent: true,
            radius: ['60%', '59%'],
            hoverAnimation: false,
            color:'#2dc0c9',
            // animation:false,
            data: [1],
            labelLine: {
                normal: {
                    show: false
                }
            }
        }
    ]
};

function _pie2() {
    let dataArr = [];
    for (var i = 0; i < 8; i++) {
        if (i % 2 === 0) {
            dataArr.push({
                name: (i + 1).toString(),
                value: 25,
                itemStyle: {
                    normal: {
                        color: "rgba(88,142,197,0.5)",
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0)"
                    }
                }
            })
        } else {
            dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0)",
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0)"
                    }
                }
            })
        }

    }
    return dataArr
}