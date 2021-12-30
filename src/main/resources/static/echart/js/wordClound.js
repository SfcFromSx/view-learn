// 柱状图1模块
(function() {
    // var colors = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    var colors = [
        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#1e90ff', '#ffffff', '#bfc755', 'rgba(169,24,123,0.98)', '#ffd700',
    ];
    var max = colors.length - 1;
    var min = 0;
    // 实例化对象
    var myChart1 = echarts.init(document.querySelector(".map .chart1"));
    var myChart2 = echarts.init(document.querySelector(".map .chart2"));
    // 指定配置和数据
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
    var series2 = [
            {
                type: 'wordCloud',
                rotationRange: [0,0],
                gridSize: 30,
                shape: 'diamond',
                sizeRange: [30, 50],
                width: 800,
                height: 500,
                textStyle: {
                    normal: {
                        fontFamily: '微软雅黑',
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
                data: [
                    {
                        name: '交易员A',
                        value: 121,
                    },
                    {
                        name: '交易员B',
                        value: 123,
                    },
                    {
                        name: '交易员C',
                        value: 334,
                    },
                    {
                        name: '交易员D',
                        value: 222,
                    },
                    {
                        name: '交易员E',
                        value: 23,
                    },
                    {
                        name: '交易员F',
                        value: 234,
                    }
                ],
            },
    ]

    var option1 = {
        tooltip: {
            show: true,
        },
        series: series1,
    };
    var option2 = {
        tooltip: {
            show: true,
        },
        series: series2,
    };
    // 把配置给实例对象
    // myChart1.setOption(option1);
    myChart2.setOption(option2);
    window.addEventListener("resize", function() {
        myChart1.resize();
    });
    window.addEventListener("resize", function() {
        myChart2.resize();
    });


    var data1 = [
        {
            name: '投资经理A',
            value: 121,
        },
        {
            name: '投资经理B',
            value: 123,
        },
        {
            name: '投资经理C',
            value: 222,
        },
        {
            name: '投资经理D',
            value: 42,
        },
        {
            name: '投资经理E',
            value: 0,
        }
    ];

    setInterval(function () {
        console.log('test1234234');
        $.ajax({
            url: "http://localhost:8080/learn/view/extract",
            data: {},
            type: "GET",
            dataType: "JSON",
            success: function(newData) {
                console.log(newData);
                option1.series[0].data = newData;
                myChart1.setOption(option1);
            }
        });
    },2000);
})();
