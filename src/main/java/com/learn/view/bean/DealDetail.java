package com.learn.view.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
public class DealDetail {
    String dealCode;
    BigDecimal dealAmt;
    Date dealDate;
}
