$(function () {
    // 最上方四栏渲染
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/data/info',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.spannel:eq(0)>em').text(backData.totalArticle);
            $('.spannel:eq(1)>em').text(backData.dayArticle);
            $('.spannel:eq(2)>em').text(backData.totalComment);
            $('.spannel:eq(3)>em').text(backData.dayComment);
        }
    });


    // 折线图，日新增文章数量统计
    $.ajax({
        url:'http://localhost:8080/api/v1/admin/data/article',
        type:'get',
        dataType:'json',
        success: function(backData){
            // console.log(backData);
            loadEchars1(backData);
        }
    });

    // 环形图,各类型文章数量统计
    $.ajax({
        url:'http://localhost:8080/api/v1/admin/data/category',
        type:'get',
        dataType:'json',
        success: function(backData){
            // console.log(backData);
            loadEchars2(backData);
        }
    });

    // 柱状图,日文章访问量
    // $.ajax({
    //     url:'http://localhost:8080/api/v1/admin/data/visit',
    //     type:'get',
    //     dataType:'json',
    //     success: function(backData){
    //         console.log(backData);
    //         // loadEchars3(backData);
    //     }
    // });
    loadEchars3();



    // 折线图，日新增文章数量统计-----------封装
    function loadEchars1(obj) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('curve_show'));

        var data = [];
        var date = [];
        for (var i = 0; i < obj.date.length; i++) {
            data.push(obj.date[i].count);
            date.push(obj.date[i].date);
        };

        option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '月新增文章数',
            },

            xAxis: {
                name: '日',
                type: 'category',
                boundaryGap: false,
                data: date
            },
            legend: {
                data: ['新增文章'],
                top: '40'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                },
                right: 50
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            series: [
                {
                    name: '新增文章',
                    type: 'line',
                    smooth: true,
                    // symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#f80'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,136,0,0.39)'
                        }, {
                            offset: .34,
                            color: 'rgba(255,180,0,0.25)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255,222,0,0.00)'
                        }])
                    },
                    data: data
                }
            ],
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    };



    // 环形图,各类型文章数量统计------------封装
    function loadEchars2(obj) {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('pie_show'));

        var data = [];
        var dataAll = [];
        for (var i = 0; i < obj.date.length; i++) {
            data.push(obj.date[i].name);
            dataAll.push({value:obj.date[i].articles,name:obj.date[i].name});
        };

        option1 = {
            title: {
                left: 'center',
                text: '分类文章数量比',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                x: 'center',
                data: data,
                top: 25
            },
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565', '#20ff19', '#13cfd5', '#00ce68','#5885e8'],
            series: [
                {
                    name: '分类名称',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    data: dataAll
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
    };



    // 柱状图,日文章访问量----------------封装
    function loadEchars3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart2 = echarts.init(document.getElementById('column_show'));

        // var data = [];
        // var dataAll = [];
        // for (var i = 0; i < obj.date.length; i++) {
        //     data.push(obj.date[i].name);
        //     dataAll.push({value:obj.date[i].articles,name:obj.date[i].name});
        // };
        

        option2 = {
            title: {
                left: 'center',
                text: '分类访问量',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {// 坐标轴指示器，坐标轴触发有效
                    type: 'line'// 默认为直线，可选为：'line' | 'shadow'
                },

            },
            legend: {
                data: ['爱生活', '趣美味', '爱旅行', '爱电影', '爱保健'],
                top: 30
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565', '#20ff19', '#13cfd5', '#00ce68', '#ff9565'],
            series: [
                {
                    name: '爱生活',
                    type: 'bar',
                    data: [123, 223, 333, 442]
                },
                {
                    name: '趣美味',
                    type: 'bar',
                    data: [223, 333, 444, 555]
                },
                {
                    name: '爱旅行',
                    type: 'bar',
                    data: [333, 433, 555, 666]
                },
                {
                    name: '爱电影',
                    type: 'bar',
                    data: [433, 511, 666, 777]
                },
                {
                    name: '爱保健',
                    type: 'bar',
                    data: [511, 555, 777, 888],
                },

            ]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
    };

});