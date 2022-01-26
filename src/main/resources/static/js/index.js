window.onload = function(){
    let currentModel = "option";
    let index = 0;
    $("li").click(function () {
        index = $(this).index();
        switchPanel();
    });

    function switchPanel() {
        currentModel = $("li").eq(index)[0].textContent;
        $("li").removeClass("active");
        $("li").eq(index).addClass("active");
        $(".diy-panel-no-border").addClass("hide").eq(index).removeClass("hide");
        $(".input-group").addClass("hide").eq(index).removeClass("hide");
        $(".panel-select").addClass("hide").eq(index).removeClass("hide");
        $(".viewPanel").addClass("hide").eq(index).removeClass("hide");
    }

    $("#query").click(function () {
        alert("待补充query");
    });

    $("#preview").click(function () {
        doPreview();
    });

    $("#saveConfig").click(function () {
        alert("待补充save");
    });

    $(".panel-select").change(function () {
        doPreview();
    });

    function doPreview() {
        let value = JSON.stringify(codeEditor[index].get());
        let div = $(".viewPanel").eq(index)[0];
        let selectValue = $(".panel-select").eq(index).val();
        switch (currentModel){
            case "option":
                previewOptionInit(div, value, selectValue);
                break;
            case "template":
                var url = "http://localhost:8080/learn/view/preview/" + selectValue + '/' + value
                window.open(url);
                break;
            case "chart":
                previewChartInit(div, value, selectValue);
                break;
        }
    }


    //初始化编辑器模式
    var codeOptions = {
        mode: 'code',
        modes: ['code'],
        onError: function(err) {
            alert(err.toString());
        }
    };
    var jsonOptions = {
        mode: 'tree',
        modes: ['code', 'form', 'text', 'tree', 'view'],
        onError: function(err) {
            alert(err.toString());
        }
    };
    var leftDiv = new Array(3);
    var rightDiv = new Array(3);
    var jsonBtn = new Array(3);
    var codeBtn = new Array(3);
    var codeEditor = new Array(3);
    var jsonEditor = new Array(3);
    for (let i = 0; i < 3; i++) {
        leftDiv[i] = document.getElementById("codeEditor" + i);
        rightDiv[i] = document.getElementById("jsonEditor" + i);
        jsonBtn[i] = document.getElementById("jsonBtn" + i);
        codeBtn[i] = document.getElementById("codeBtn" + i);
        //初始化编辑器内容
        codeEditor[i] = new JSONEditor(leftDiv[i], codeOptions, {"a": 1});
        jsonEditor[i] = new JSONEditor(rightDiv[i], jsonOptions, {"a": 1});
        //视图化
        jsonBtn[i].onclick = function () {
            try {
                const codeContent = codeEditor[index].get();
                jsonEditor[index].set(codeContent);
            } catch (e) {
                alert("JSON数据有误！");
            }

        }
        //代码化
        codeBtn[i].onclick = function () {
            try {
                const jsonContent = jsonEditor[index].get();
                codeEditor[index].set(jsonContent);
            } catch (e) {
                alert("JSON数据有误！");
            }
        }
    }
}