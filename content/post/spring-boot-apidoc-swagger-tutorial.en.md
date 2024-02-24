---
title: "Spring Boot 3 - Better API Documentation with Swagger"
date: 2024-01-10T17:03:37+08:00
Description: "quick guide on spring boot 3. How to create an api document with swagger. "
Tags: ['spring boot','API Doc', 'Swagger']
Categories: ['spring boot', 'backend']
DisableComments: false
draft: false
---
## Why Use API Documentation?

---
When software development teams develop RESTful APIs, they would like to reduce communication costs as much as they can. Speaking of API design, both frontend and backend engineers will access or test the functions of the APIs; therefore, maintaining documentation is absolutely important. In the documentation, we always include information such as URL, request body, response body, and headers. Swagger saves your day because it helps you generate documentation after source code changes.

## Why Not Just Use HackMD or Word for Updates?

---
After three years of observation in the field, the reason is that both HackMD and Word require manual updates of API specifications after program updates.

As a software engineer, my creativity comes from being a lazy person. Sometimes facing deadlines, you need a better tool to update API documentation immediately after each source codes changes. Swagger is a popular solution for various back-end frameworks, with implementations in various programming languages such as C#, Golang, Python, and PHP.

## How to Use Swagger in Spring Boot?

---
In the Spring Boot framework, there are two mainstream libraries for implementing Swagger's functionality:
- io.springfox: Swagger 2
- org.Springdoc: Swagger 3

In Spring Boot 2, we can use Maven or Gradle to import the Swagger 2 library:
```
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

However, in Spring Boot 3, due to changes in library structure and package naming, and the fact that springfox's Swagger is no longer maintained, it is recommended for newcomers to Spring Boot to use Swagger implemented by springdoc:
```
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.0</version>
</dependency>
```
P.S. The Spring community also provides a method to migrate from OpenAPI 2 to OpenAPI 3: [Migrate to Springdoc](https://springdoc.org/migrating-from-springfox.html)

## Pitfalls of Using Swagger in Spring Boot:

---
### Pitfall 1: When using spring boot with spring security settings, the openapi document view is blank.
You can check with the following steps:
1. Check if Spring Security allows free passage according to the swagger URL (permitAll() permission).
2. If Spring Security has set OncePerRequestFilter, override the `shouldNotFilter(HttpServletRequest request)` function.
3. Test if springdoc openapi works normally with a blank spring boot project.

### Pitfall 2: When deploying spring boot on nginx as a reverse proxy, the server URL error.
You can check with the following steps:
1. Check if the nginx configuration includes `proxy_set_heaser` with Host and Proto settings.
2. In **application.properties**, set `server.forward-headers-strategy` to native or framework.

### Useful Resources: 
- [Migrations from springfox to springdoc](https://blog.idontwannarock.me/2022/12/springfox_to_springdoc/)
- [Springdoc official website](https://springdoc.org/migrating-from-springfox.html)