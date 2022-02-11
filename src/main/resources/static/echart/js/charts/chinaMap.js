/*
* para:{
*   title:string //图表名称
*   seriesData=[{
        name: '北京',
        value: 100
    }, {
        name: '天津',
        value: 90
    },
    ...
    ]
* }
*
* 例如：
*/
function chinaMap(chartDiv, para) {
    var myChart = echarts.init(chartDiv);

    var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

    var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];

    var seriesData = [{
        name: '北京',
        value: 100
    }, {
        name: '天津',
        value: 90
    }, {
        name: '上海',
        value: 160
    }, {
        name: '重庆',
        value: 100
    }, {
        name: '河北',
        value: 60
    }, {
        name: '河南',
        value: 60
    }, {
        name: '云南',
        value: 90
    }, {
        name: '辽宁',
        value: 90
    }, {
        name: '黑龙江',
        value: 90
    }, {
        name: '湖南',
        value: 60
    }, {
        name: '安徽',
        value: 60
    }, {
        name: '山东',
        value: 60
    }, {
        name: '新疆',
        value: 70
    }, {
        name: '江苏',
        value: 40
    }, {
        name: '浙江',
        value: 150
    }, {
        name: '江西',
        value: 60
    }, {
        name: '湖北',
        value: 60
    }, {
        name: '广西',
        value: 60
    }, {
        name: '甘肃',
        value: 40
    }, {
        name: '山西',
        value: 60
    }, {
        name: '内蒙古',
        value: 20
    }, {
        name: '陕西',
        value: 150
    }, {
        name: '吉林',
        value: 120
    }, {
        name: '福建',
        value: 170
    }, {
        name: '贵州',
        value: 150
    }, {
        name: '广东',
        value: 597
    }, {
        name: '青海',
        value: 60
    }, {
        name: '西藏',
        value: 50
    }, {
        name: '四川',
        value: 60
    }, {
        name: '宁夏',
        value: 70
    }, {
        name: '海南',
        value: 60
    }, {
        name: '台湾',
        value: 90
    }, {
        name: '香港',
        value: 190
    }, {
        name: '澳门',
        value: 170
    }];

    initEcharts(para.title,para.seriesData);
    // initEcharts("各省产品交易量",seriesData);
// 初始化echarts
    function initEcharts(title,seriesData) {
        var tmpSeriesData = seriesData ;

        var option = {
            title: {
                show: true,
                text: title,
                left: 'center',
                top: '10%',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} (自定义单位)'
            },
            series: [
                {
                    name: para.title,
                    type: 'map',
                    mapType: 'china',
                    roam: true,//是否开启鼠标缩放和平移漫游
                    data: tmpSeriesData,
                    top: "20%",//组件距离容器的距离
                    zoom: 1.1,
                    selectedMode: 'single',

                    label: {
                        normal: {
                            show: true,//显示省份标签
                            textStyle: {color: "#fbfdfe"}//省份标签字体颜色
                        },
                        emphasis: {//对应的鼠标悬浮效果
                            show: true,
                            textStyle: {color: "#323232"}
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: .5,//区域边框宽度
                            borderColor: '#0550c3',//区域边框颜色
                            areaColor: "#4ea397",//区域颜色

                        },
                        emphasis: {
                            borderWidth: .5,
                            borderColor: '#4b0082',
                            areaColor: "#ece39e",
                        }
                    },
                }
            ]

        };
        myChart.setOption(option);
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
                option.series[0].data = newData; //设置数据
                myChart.setOption(option);
            }
        });
    }
    window.addEventListener("resize", function() {
        myChart.resize();
    });

}