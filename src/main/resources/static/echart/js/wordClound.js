// 柱状图1模块
(function() {
    // var colors = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    var colors = [
        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#1e90ff', '#ffffff', '#bfc755', 'rgba(154,97,215,0.98)', '#ffd700',
    ];
    var max = colors.length - 1;
    var min = 0;

    var myChart1 = echarts.init(document.querySelector(".map .chart1"));
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

    var myChart2 = echarts.init(document.querySelector(".map .chart2"));
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
        }
    ]

    myChart1.on('click', function (event) {
        console.log(event);
        console.log(event.target);
        var name = event.data['name'];
        var value = event.data['value'];
        window.open("http://localhost:8080/learn/view/wordCloud/detail/" +
            name + "/" + value);
    })


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


    window.addEventListener("resize", function() {
        myChart1.resize();
    });
    window.addEventListener("resize", function() {
        myChart2.resize();
    });

    var socket = null;
    if ('WebSocket' in window) {
        socket = new WebSocket('ws://localhost:8080/webSocket');
        console.log(socket);
    } else {
        alert("该浏览器不支持websocket，数据同步功能异常");
    }
    socket.onopen = function (event) {
        console.log("建立连接");
    }
    socket.onclose = function (event) {
        console.log("连接关闭");
    }
    socket.onmessage = function (event) {
        var newData = JSON.parse(event.data);
        option2.series[0].data = newData;
        myChart2.setOption(option2);
    }
    socket.onerror = function () {
        alert("socket error.")
    }
    socket.onbeforeunload = function () {
        socket.close();
    }

    setInterval(function () {
        $.ajax({
            url: "http://localhost:8080/learn/view/extract/wordCloud",
            data: {},
            type: "GET",
            dataType: "JSON",
            success: function(newData) {
                option1.series[0].data = newData;
                myChart1.setOption(option1);
            }
        });
    },2000);
})();
