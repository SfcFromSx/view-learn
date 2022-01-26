package com.learn.view.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learn.view.bean.para.ChartPara;
import com.learn.view.bean.para.ViewPara;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.thymeleaf.util.StringUtils;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class H2DataSource {
    private static Connection connection;
    static {
        try {
            Class.forName("org.h2.Driver");
            connection = DriverManager.getConnection(
                    "jdbc:h2:file:C:\\Users\\Administrator\\test", "root", "test");
            System.out.println(connection.isValid(2));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static ViewPara getTemplateParaById(String templateId) throws Exception {
        String value = H2DataSource.queryParaByKey(templateId);
        if (StringUtils.isEmpty(value)) {
            return new ViewPara();
        }
        return getTemplateParaByValue(value);
    }

    public static ViewPara getTemplateParaByValue(String templateValue) throws Exception {
        ViewPara viewPara1 = new ObjectMapper().readValue(templateValue, ViewPara.class);
        List<ChartPara> chartParas = new ArrayList<>();
        for (Map.Entry<String, String> entryMap : viewPara1.getCharts().entrySet()) {
            ChartPara chartPara = getChartParaById(entryMap.getValue());
            chartPara.setLocation(entryMap.getKey());
            chartPara.setOptionJson(H2DataSource.getOptionJson(chartPara.getChartType()));
            chartParas.add(chartPara);
        }
        viewPara1.setChartParas(chartParas);
        viewPara1.setJsonPara("[" + new ObjectMapper().writeValueAsString(viewPara1) + "]");
        return viewPara1;
    }


    private static ChartPara getChartParaById(String chartId) throws Exception {
        String value = H2DataSource.queryParaByKey(chartId);
        return new ObjectMapper().readValue(value, ChartPara.class);
    }

    public static String queryParaByKey(String keyId) throws SQLException {
        try {
            ResultSet resultSet = connection.createStatement().executeQuery(
                    "select * from VIEW_CONFIG where key = '" + keyId + "'");
            if (resultSet.next()) {
                return resultSet.getString("value");
            }
            return null;
        }catch (Exception e) {
            return null;
        }
    }

    public static String getOptionJson(String chartType) throws IOException {
        String basePath = "classpath:json/option/";
        try {
            return FileUtils.readFileToString(
                    ResourceUtils.getFile(basePath + chartType + ".json")
                    , "utf-8"
            );
        } catch (Exception e) {
            return "";
        }
    }
}
