package com.learn.view.data;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

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
        String basePath = "classpath:static/json/";
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
