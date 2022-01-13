package com.learn.view.data;

import org.springframework.stereotype.Component;

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
}
