/*
para：{
	title: string,//图标标题
	xAxisName x坐标轴名称
	yAxisName y坐标轴名称
	data：[
			{
				legend，
				items:[
					{
						xAxis:"",
						type:"bar"||"line"
						value:[]
					}
            },
    ]	//数据列表
 },
*/
function lineAndBarChart(chartDiv, type, para) {
    var myChart = echarts.init(funnelDiv);
    this.type = type;
    option = {
        title:{
            show: true,
            text: para.title,
            subtext: '',//副标题文本
            // link: '' , //点击标题超链接跳转页面
            top: 'top',
            left: 'center',
            textStyle:{
                color: "rgba(255,255,255,0.6)"
            }
        },
        color: ["#2f89cf"],
        tooltip: {  //鼠标移入柱状图或折线图的提示
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: this.type=="bar" ? "shadow" : "line" // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        //图例组件展现了不同系列的标记，颜色和名字，可以通过点击图例控制哪些系列不显示
        legend:{    //图例组件
            show: true,
            type:'scroll',//可滚动翻页,当图例数量较多时可以使用
            data: para.data.map(item => item.legend), //图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的name, series.data 中的 name
            textStyle:{
                color: "rgba(255,255,255,0.6)"
            },
            top: 'top' //图例组件离容器上侧的距离。
        },
        grid: {
            left: "0%",
            top: "10px",
            right: "0%",
            bottom: "4%",
            containLabel: true //grid 区域是否包含坐标轴的刻度标签
        },
        xAxis: [    //设置x坐标轴属性
            {
                type: 'category',//坐标轴类型.'value'数值轴，适用于连续数据;'category' 类目轴，适用于离散的类目数据;'time' 时间轴，适用于连续的时序数据;
                name: para.xAxisName,//x坐标轴名称
                data: para.data[0].items.map(item => item.xAxis),
                axisLabel: {//坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "12"
                    },
                    rotate:'',//刻度标签旋转的角度, -90 度到 90 度
                },
                axisLine: {//坐标轴轴线相关设置
                    show: false,
                },
                axisTick: {//坐标轴刻度相关设置
                    alignWithLabel: true //保证刻度线和标签对齐
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: para.yAxisName,//y坐标轴名称
                scale:"true",
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: "12"
                    }
                },
                axisLine: {
                    lineStyle:{
                        color: "rgba(255,255,255,.1)"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                }
            }
        ],
        series : para.data.map(//设置数据
            item =>  {
                return  item.type === "bar" ?{
                    name: item.legend,
                    type: item.type,
                    data: item.items.map(ele => ele.value),
                    cursor : 'pointer',
                    itemStyle: {
                        barBorderRadius: 5
                    },
                }: {
                    name: item.legend,
                    type: item.type,
                    data: item.items.map(ele => ele.value),
                    cursor : 'pointer',
                    smooth :true,//平滑曲线
                }
            }
        ),
        toolbox:{//右上角工具箱 柱状折线图切换
            show: true,
            feature: {
                magicType: {
                    show: true,
                    type:["line","bar"]
                },
                saveAsImage: {
                    show: true,
                    title: '保存为图片'
                },//保存为图片
            }
        },
        iconStyle: {
            normal: {
                borderColor: "rgba(255,255,255,0.6)",
                color: "rgba(255,255,255,0.6)"
            }
        }
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
                option.series = newData.map(//设置数据
                    item => {
                        return item.type === "bar" ? {
                            name: item.legend,
                            type: item.type,
                            data: item.items.map(ele => ele.value),
                            cursor: 'pointer',
                            itemStyle: {
                                barBorderRadius: 5
                            },
                        } : {
                            name: item.legend,
                            type: item.type,
                            data: item.items.map(ele => ele.value),
                            cursor: 'pointer',
                            smooth: true,//平滑曲线
                        }
                    })
                myChart.setOption(option);
            }
        });
    }
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}