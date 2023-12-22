---
title: "Spring Boot 程式設定教學"
date: 2023-12-19T10:41:16+08:00
Description: "教你快速設定 Spring boot程式"
Tags: ['spring', 'backend']
Categories: ['technical']
DisableComments: false
draft: true
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
```properties
spring.profiles.active=local
```

**使用 YAML 格式:**
```yaml
spring:
  profiles:
    active: local
```

或者，也可以透過 JVM 啟動參數指定：

```bash
java -jar your-application.jar -DAPI_ENV=xxxxx
```

然後在程式中引用：
```properties
spring.profiles.active=${API_ENV}
```

或者在 YAML 中：
```yaml
spring:
  profiles:
    active: ${API_ENV}
```

也可以使用 `@Value("${spring.profiles.active}")` 進行單一設定值的注入。

## 根據設定值決定啟動哪一個 Bean - @Conditional

`@ConditionalOnProperty` 是 Spring 中用來決定應用啟動時是否啟動某個 Bean 的條件注解。

以一個介面 A 為例，有兩個實作類別 B 和 C，我們可以透過 `@Conditional` 的設定，根據 `mock.enable` 屬性的值來決定實際使用哪個實作：

```java
interface A {

}

@ConditionalOnProperty(name="mock.enable", havingValue = "true", matchIfMissing = false)
@Service
class B implements A {

}

@ConditionalOnProperty(name="mock.enable", havingValue = "false")
@Service
class C implements A {

}
```

這樣，當 `mock.enable` 為 `true` 時，Bean B 會被建立；當 `mock.enable` 為 `false` 時，或者未設定 `mock.enable` 時，Bean C 會被建立。

## 整理自定義的設定檔 - @ConfigurationProperties

當有多個自定義的 properties 需要管理時，可以使用 `@ConfigurationProperties` 進行整理，將相關設定集中在一個類別中：

```java
@ConfigurationProperties(prefix = "myapp")
public class MyAppProperties {

    private String a;
    private String b;

    // Getter and Setter methods
}
```

然後在 `application.properties` 中進行配置：

```properties
myapp.a=valueA
myapp.b=valueB
```

然後在 Spring Boot 應用程式中注入 `MyAppProperties`：

```java
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