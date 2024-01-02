---
title: "Spring Boot 程式設定檔教學 - 在不同運行環境配置的技巧"
date: 2023-12-19T10:41:16+08:00
Description: "教你在不同運行環境下快速使用 application.properties，設定 @Bean 初始化的方法，並使用@ConfigurationProperties 的方式，設定 Spring boot 程式"
Tags: ['spring boot', '設定檔', '環境設定']
Categories: ['technical', 'spring boot', '後端']
DisableComments: false
draft: false
---

## 什麼時候需要用到設定檔?
在使用 Spring Boot 框架時，設定檔的需求常常出現在以下情境：

1. 本地端或公司 VM 的資料庫設定與正式環境的不同。
2. 在內部測試介接 API 時，需要動態調整 API 網址的顯示。
3. 一個 API server 服務多個客戶，而每個客戶在相同功能中的商業需求各不相同，需要透過設定檔來區分。
4. 管理多個自定義的設定檔，希望將其集中在一個類別中。

## 程式啟動時設定 Properties

透過 `spring.profiles.active` 屬性，可以根據環境不同切換設定檔。可以在 `application.properties` 中進行配置：

**使用 properties 格式:**
```
spring.profiles.active=local
```

**使用 YAML 格式:**
```
spring:
  profiles:
    active: local
```

或者，也可以透過 JVM 啟動參數指定：

```
java -jar your-application.jar -DAPI_ENV=xxxxx
```

然後在程式中引用：
```
spring.profiles.active=${API_ENV}
```

或者在 YAML 中：
```
spring:
  profiles:
    active: ${API_ENV}
```

也可以使用 `@Value("${spring.profiles.active}")` 進行單一設定值的注入。

## 根據設定值決定啟動哪一個 Bean - @ConditionalOnProperty

`@ConditionalOnProperty` 是 Spring 中用來決定應用啟動時是否啟動某個 Bean 的條件注解。

以一個介面 CustomerAPIService 為例，此介面需用於介接外部 API 或是其他微服務，並且有兩個實作類別 MockCustomerAPIServiceImpl (模擬API資料) 和 CustomerAPIServiceImpl (介接真實 API) ，我們可以透過 `@ConditionalOnProperty` 的設定，根據 `mock.enable` 屬性的值來決定實際使用哪個實作：

```
interface CustomerAPIService {

}

@ConditionalOnProperty(name="mock.enable", havingValue = "true", matchIfMissing = false)
@Service
class MockCustomerAPIServiceImpl implements CustomerAPIService {

}

@ConditionalOnProperty(name="mock.enable", havingValue = "false")
@Service
class CustomerAPIServiceImpl implements CustomerAPIService {

}
```

這樣，當 `mock.enable` 為 `true` 時，MockCustomerAPIServiceImpl 的 Bean 會被建立；當 `mock.enable` 為 `false` 時，或者未設定 `mock.enable` 時，Bean CustomerAPIServiceImpl 的 Bean 會被建立。

## 整理自定義的設定檔 - @ConfigurationProperties

當有多個自定義的 properties 需要管理時，可以使用 `@ConfigurationProperties` 進行整理，將相關設定集中在一個類別中：

```
@ConfigurationProperties(prefix = "myapp")
public class MyAppProperties {

    private String a;
    private String b;

    // Getter and Setter methods
}
```

然後在 `application.properties` 中進行配置：

```
myapp.a=valueA
myapp.b=valueB
```

然後在 Spring Boot 應用程式中注入 `MyAppProperties`：

```
@Service
public class MyService {

    private final MyAppProperties myAppProperties;

    @Autowired
    public MyService(MyAppProperties myAppProperties) {
        this.myAppProperties = myAppProperties;
    }

    // 使用 myAppProperties 中的設定值
}
```

這樣可以更清晰地管理和使用多個自定義的設定檔。

### 參考連結
- [@ConditionalOnProperty 介紹](https://medium.com/@erayaraz10/conditional-configuration-in-spring-boot-with-conditionalonproperty-207a5104c8bd)
- [@ConfigurationProperties 介紹](https://www.baeldung.com/configuration-properties-in-spring-boot)
- [@ConfigurationProperties 設定方式](https://spring.hhui.top/spring-blog/2021/01/17/210117-SpringBoot%E7%B3%BB%E5%88%97ConfigurationProperties%E9%85%8D%E7%BD%AE%E7%BB%91%E5%AE%9A%E4%B8%AD%E9%82%A3%E4%BA%9B%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%E4%BA%8B%E6%83%85/)