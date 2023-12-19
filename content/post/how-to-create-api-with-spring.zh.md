---
title: "使用 Spring Boot框架創建基本 Restful API"
date: 2023-10-27T17:23:42+08:00
Description: "Tutorial on intermediate concepts on Spring boot"
Tags: ["Spring", "Backend"]
Categories: ["technical"]
DisableComments: false
---
## API 伺服器：
API 是一個提供使用者端(手機APP、網頁)與伺服器端的溝通橋樑，可以取用端點 (endpoints) 並依照其所需的參數，取得使用者的資料。

## 在設計 API 服務之前：
在建立 API 之前，以下我們首先需要去考慮的重點。
- 明確定義狀態碼或狀態消息
- 為 API 服務新增安全性保護
- 即時的 API 文件 (e.g. Swagger)
- 處理不同情境的錯誤，例如：商業邏輯、使用者登入時效逾期、系統內部錯誤、API 介接錯誤

在接下來的教程中，我將提及一些有關 API 設計的重要問題，並以 Spring Boot 為例。

## 什麼是 Spring Boot？
Spring Boot 是一個用於創建獨立、產品級基於 Spring 的應用程序的開源基於 Java 的框架。它通過在設定檔中自動配置(autoConfiguration)，提供Spring設置的默認值，簡化了構建和部署 Java 應用程序的過程。

## 我可以如何建立 spring boot 程式?
在 [Spring Initializr](https://start.spring.io/) 可以將 Spring boot 快速建立。
**目前Spring boot 中最新的版本為3.2.0 版，且最低需求為 Java 17 版**

---
### 範例程式碼:
此程式碼持續更新中  
[Spring boot 3 template](https://github.com/victorlikecode/Spring-boot-template)
