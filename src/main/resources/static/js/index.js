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
        const optionId = $(".config-id").eq(index)[0].value;
        const url = "http://localhost:8080/learn/view/config/query/" + currentModel + '/' + optionId;
        $.ajax({
            url: url,
            data: {},
            type: "GET",
            dataType: "JSON",
            success: function(config) {
                codeEditor[index].set(config);
            }
        });
    });

    $("#preview").click(function () {
        doPreview();
    });

    $("#saveConfig").click(function () {
        const configId = $(".config-id").eq(index)[0].value;
        const configValue = JSON.stringify(codeEditor[index].get());
        $.ajax({
            url: "http://localhost:8080/learn/view/config/save/" + currentModel + '/' + configId,
            data: {
                message : configValue
            },
            type: "POST",
            success: function(rep) {
                if (rep === 'success') {
                    alert("保存成功");
                } else {
                    alert("保存失败");
                }
            },
            error : function () {
                alert("访问失败");
            }
        });
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
                const url = "http://localhost:8080/learn/view/preview/" + selectValue + '/' + value;
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
        modes: ['code', 'tree', 'form', 'text', 'view'],
        onError: function(err) {
            alert(err.toString());
        }
    };
    var leftDiv = new Array(3);
    var codeEditor = new Array(3);
    for (let i = 0; i < 3; i++) {
        leftDiv[i] = document.getElementById("codeEditor" + i);
        //初始化编辑器内容
        codeEditor[i] = new JSONEditor(leftDiv[i], codeOptions, {"a": 1});
    }
}