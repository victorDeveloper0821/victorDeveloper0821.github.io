---
title: "優化你的 Docker 映像檔，解放團隊的服務部署時間"
date: 2024-02-24T10:00:16+08:00
Description: "探索如何最小化Docker映像檔大小，包括選擇輕量基礎映像、移除不必要的檔案、利用多階段構建等技術。"
Tags: ['Docker']
Categories: ['Devops']
DisableComments: false
toc: true
draft: true
---
## Docker 前置概念

在提到 Docker 映像檔優化之前，先稍微介紹一下 Docker 的用途與起源。

Docker 之所以盛行，是在於其可以統一應用程式的運行版本，它想要解決的痛點就是專案環境在任何電腦、環境只需幾行指令就可以順利運行，也不需要複雜的前置作業。

以技術層面來說，Docker是以應用程式為單位的虛擬化，在一個 VM 可以部署多個 Docker 容器(即應用程式)，所需的資源會比建立 VM 來得少，因此可以減少程式部署的時間。

## Docker 有三寶：
- Registry: 存放 Docker映像檔的空間類似 github 的服務，例如: DockerHub, Google Container Registry
- Image: 是一個 read-only 的環境，當中定義使用者要執行應用程式所需的設定；可以藉由 Dockerfile 定義這個 image 的環境
- Container: 由 Image 的定義去產生的執行程序，是一個 read-only 的環境，因此如果在 container 寫入檔案時，該檔案在 container 關閉後就會不見。

## Dockerfile - 製作 Docker Image 的功臣: 
Dockerfile 可以有效的定義開發者要執行應用程式所需的環境，同時也需要藉由 Docker 指令將 Dockerfile 製作成 Docker Image；因此 Dockerfile 寫法也會影響到 Docker image 的大小

下面的方法可以減少 Docker image大小，並且將以 Java 作為範例: 

- 使用 Multiple Stages Build: 將原始碼建置過程與使用執行檔的執行過程分開
- 使用較小的映像檔作為基底: 可以使用 Ubuntu, Alpine 等映像檔為基底建立 image 
- 只放用得到的檔案、內容: 以 Java 為例，運行環境不需用到開發工具，因此我們改用 JRE 作為應用程式運行環境 

這邊也附上 Dockerfile 的[官方 guideline](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) 提供參考

## 以下為優化前後的映像檔比較表格:

| ##  | 映像檔大小  | 基底映像檔大小 |
|---|---|---|
| 使用 JDK 為運行環境  | 457 MB  | 210.63 MB  | 
| 使用 JRE 為運行環境  | 176 MB  | 120 MB  | 

從上述表格中，我們可以總結以下資訊：
- JDK 因為包含開發者工具，映像檔大小比 JRE 來得大；因此如果是正式環境運行需要以 JRE 為主要的基底

## 資料來源: 
- [虛擬機器與容器差異](https://ithelp.ithome.com.tw/articles/10238498)
- [實測有效！手把手帶你將 Docker Image 體積減少 90%](https://medium.com/dean-lin/%E5%AF%A6%E6%B8%AC%E6%9C%89%E6%95%88-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%B8%B6%E4%BD%A0%E6%B8%9B%E5%B0%91-90-%E7%9A%84-docker-image-%E9%AB%94%E7%A9%8D-10b8e43159ff)