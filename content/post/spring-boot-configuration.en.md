---
title: "Spring Boot Configuration"
date: 2023-12-19T10:41:38+08:00
Description: ""
Tags: []
Categories: []
DisableComments: false
draft: true
---
## When Do You Need Configuration Files?

In the context of using the Spring Boot framework, the need for configuration files often arises in the following scenarios:

1. Database configurations differ between local or company VM setups and formal production environments.
2. When testing API integration internally, the actual API endpoint may be inaccessible, requiring dynamic adjustment of API URL display.
3. A single API server serves multiple clients, each with unique business requirements within the same functionality. Configuration files are essential to manage these differences.
4. Managing numerous custom configuration files can become cumbersome. Centralizing them in a dedicated class is a preferred approach.

## Setting Properties at Program Startup

By using the `spring.profiles.active` property, you can switch configuration files based on different environments. This can be configured in `application.properties` as follows:

**Using properties format:**
```properties
spring.profiles.active=local
```

**Using YAML format:**
```yaml
spring:
  profiles:
    active: local
```

Alternatively, you can specify it through JVM startup parameters:

```bash
java -jar your-application.jar -DAPI_ENV=xxxxx
```

Then, reference it in your program as follows:

```properties
spring.profiles.active=${API_ENV}
```

Or in YAML:

```yaml
spring:
  profiles:
    active: ${API_ENV}
```

You can also use `@Value("${spring.profiles.active}")` to inject a single configuration value.

## Determining Which Bean to Activate Based on Configuration Values - @ConditionalOnProperty

`@ConditionalOnProperty` is a Spring annotation used to determine whether a specific bean should be activated during application startup.

Consider an interface A with two implementing classes, B and C. By using `@Conditional`, you can dynamically select the implementation based on the value of the `mock.enable` property:

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

This way, when `mock.enable` is set to `true`, Bean B will be created. When `mock.enable` is set to `false` or not specified, Bean C will be created.

## Organizing Custom Configuration Files - @ConfigurationProperties

When dealing with multiple custom properties that need to be managed, you can use `@ConfigurationProperties` to consolidate related settings into one class:

```java
@ConfigurationProperties(prefix = "myapp")
public class MyAppProperties {

    private String a;
    private String b;

    // Getter and Setter methods
}
```

Then, configure these properties in `application.properties`:

```properties
myapp.a=valueA
myapp.b=valueB
```

Inject the `MyAppProperties` into your Spring Boot application:

```java
@Service
public class MyService {

    private final MyAppProperties myAppProperties;

    @Autowired
    public MyService(MyAppProperties myAppProperties) {
        this.myAppProperties = myAppProperties;
    }

    // Use the configuration values from myAppProperties
}
```

This approach provides a clearer way to manage and use multiple custom configuration files.