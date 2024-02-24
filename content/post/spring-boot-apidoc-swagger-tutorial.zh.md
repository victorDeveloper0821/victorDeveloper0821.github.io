---
title: "Spring Boot 3 使用 Swagger 設定 API 文檔"
date: 2024-01-10T17:03:37+08:00
Description: "以 spring boot 3 為範例，教學如何使用 Swagger 設定 API 文檔"
Tags: ['spring boot','API Doc', 'Swagger']
Categories: ['spring boot', 'backend']
DisableComments: false
draft: false
---

## 為什麼要用到 API 文檔？

--- 
通常在業界工作，不會像是一般軟體工程理論如此完美；常常需要當考古學家的角色挖掘前人的智慧

以網頁開發的領域來說，從以前工程師需要包辦前、後端工作；到現在前端與後端的工作變得非常分明，因此需要有更有統一的工具讓前後端都可以熟悉 API 的規格

## 為何不用 hackmd 或是 word 更新就好？

---
經過 3 年工作的觀察，原因為 hackmd 與 word 都需要在程式更新後，再去 hackmd 或是 word手動更新 api 規格

以工程師的懶惰至上絕對無法接受，在社會上面對 deadline 你需要更好的工具藉由每次程式改動後即時更新 api 文檔 - Swagger 就是多種後端框架的主流解法，當中有多種程式語言實作，例如: C#, Golang, Python, PHP。

## 如何在 spring boot 使用 swagger? 

---
在 Spring Boot 框架中有兩個主流的 library 實作 Swagger 的功能:
- io.springfox: Swagger 2
- org.Springdoc: Swagger 3

於 spring boot 2 我們可以使用 maven 或是 gradle 去引入 swagger 2 的 library
```
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

但是 spring boot 3 的時候因為 library 架構跟 package 命名改變，並且 springfox 的 swagger 已經沒有再維護；因此，目前進入 spring boot 的新手推薦使用 springdoc 實作的 swagger。

```
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.0</version>
</dependency>
```
P.S. Spring 社群也提供 openapi 2 換 openapi 3 的方法 
[Migrate to Springdoc](https://springdoc.org/migrating-from-springfox.html)

## 在 spring boot 使用 swagger 的踩地雷紀錄: 

---
### 地雷1: 使用 spring boot 加上 spring security 設定時，openapi 文件檢視空白
可以使用以下步驟檢查：
1. 檢查 Spring Security是否有依照 swagger 的 url 進行開放通行 (permitAll() 權限) 
2. 如果 Spring Security 有設定 OncePerRequestFilter 的話，則需要覆寫 `shouldNotFilter(HttpServletRequest request)` 的函數
3. 使用空白spring boot專案進行交叉測試 springdoc openapi 是否正常使用 

### 地雷2: spring boot 部署於 nginx 做反向代理時 server url 錯誤
可以使用以下步驟檢查：
1. 檢查 nginx 設定是否包含 `proxy_set_heaser` 的 Host, Proto 是否有設定
2. **application.properties** 設定 `server.forward-headers-strategy` 改為 native or framework。 

### 資料來源：
- [springfox to springdoc](https://blog.idontwannarock.me/2022/12/springfox_to_springdoc/)
- [Springdoc 官方網站](https://springdoc.org/migrating-from-springfox.html)