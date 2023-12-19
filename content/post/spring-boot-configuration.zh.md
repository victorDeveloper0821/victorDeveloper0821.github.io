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
你可能會碰到以下狀況
- 本地端 or 公司 VM 的資料庫設定跟產品正式環境的不一樣
- 當你要在內部測試介接 API 時，我無法實際取用 API 網址，需要用設定檔決定要如何顯示 API 資料
- 一個 API server 給多個客戶，且客戶在同功能中的商業需求都不一樣，我應該如何活用設定檔？
- 有很多自定義的設定檔，但是想將自定義的設定集中在一個類別設定

## 於程式啟動時，設定哪一個 properties:
可以使用 spring.profiles.active 這個設定的鍵值，如此可以達到依據環境不同切換設定檔的方式

於 application.properties 設定下述，可以啟用 application-local.properties (當然如果設定是用 YAML 也適用)
properties
```
spring.profiles.active=local
```
yaml
```=yaml
spring: 
  profiles: 
    active: local
```