function chartInit(div, chartType) {
    switch (chartType) {
        case "funnel":
            funnelInit(div);
            break;
        case "wordCloud":
            wordCloudInit(div, ["http://localhost:8080/learn/view/extract"]);
    }
}

function funnelInit(funnelDiv) {
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
        color: ['#efbb1a', '#d77169', '#c14f60', '#953f61', '#72355f', ],

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
                minSize: '0%',
                maxSize: '100%',
                sort : 'descending', // 'ascending', 'descending'
                gap :0,

                data:[
                    {value:60, name:'访问'},
                    {value:40, name:'咨询'},
                    {value:20, name:'订单'},
                    {value:80, name:'点击'},
                    {value:100, name:'展现'}


                ].sort(function (a, b) { return a.value - b.value}),
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
    myChart.setOption(option);
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
            sizeRange: [30, 40],
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

    window.addEventListener("resize", function() {
        myChart1.resize();
    });

    setInterval(function () {
        $.ajax({
            url: para[0],
            data: {},
            type: "GET",
            dataType: "JSON",
            success: function(newData) {
                option1.series[0].data = newData;
                myChart1.setOption(option1);
            }
        });
    },2000);
}