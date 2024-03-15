---
title: "Why you should optimize your docker images"
date: 2024-02-24T10:00:16+08:00
Description: "Minimize the size of Docker images; to do this, it requires us to remove unnecessary files from the Docker image and build the source code and run the program in multiple stages."
Tags: ['Docker']
Categories: ['Devops']
DisableComments: false
toc: true
draft: true
---
## Key Concept of Docker

Before discussing the optimization of Docker image files, let's briefly introduce the purpose and origin of Docker.

The popularity of Docker stems from its ability to standardize the running versions of applications. The pain point it aims to solve is that the project environment can run smoothly on any computer, in any environment, with just a few commands, without the need for complicated preliminary work.。

## 3 things you need to know in Docker：
- Register: A space for storing Docker image files, similar to services like GitHub, for example: DockerHub, Google Container Registry.
- Image: A read-only environment that defines the settings required for running an application; this environment can be defined through a Dockerfile.
- Container: An executable process generated from the definition of an Image.

## Dockerfile : 
A Dockerfile can effectively define the environment required for developers to run an application. It is also necessary to use Docker commands to create a Docker Image from a Dockerfile; thus, the way a Dockerfile is written can also affect the size of the Docker image.

The following methods can reduce the size of a Docker image, with Java as an example:

- Use Multi-Stage Builds: Separate the process of building the source code from the process of executing the runnable files.
- Use a Smaller Base Image: You can use smaller images such as Ubuntu or Alpine as the base to create your image.
- Include Only Necessary Files and Content: For Java, for example, the runtime environment does not need development tools, so we use JRE as the application runtime environment instead.

Here is also the [official guideline](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) for Dockerfile provided for reference.

## 以下為優化前後的映像檔比較表格:

| ##  | 映像檔大小  | 基底映像檔大小 | 啟動時間 |
|---|---|---|---|
| 使用 JDK 為運行環境  | 457 MB  | 210.63 MB  | 待測 | 
| 使用 JRE 為運行環境  | 176 MB  | 120 MB  | 待測 |

From the table above, we can summarize the following information:

The image size using JDK is larger than that using JRE because JDK includes developer tools. Therefore, for production environments, JRE should be the primary base.
The startup time data is pending testing.

## 資料來源: 
- [虛擬機器與容器差異](https://ithelp.ithome.com.tw/articles/10238498)
- [實測有效！手把手帶你將 Docker Image 體積減少 90%](https://medium.com/dean-lin/%E5%AF%A6%E6%B8%AC%E6%9C%89%E6%95%88-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%B8%B6%E4%BD%A0%E6%B8%9B%E5%B0%91-90-%E7%9A%84-docker-image-%E9%AB%94%E7%A9%8D-10b8e43159ff)