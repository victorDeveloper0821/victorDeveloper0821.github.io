---
title: "發布你的 Jupyter Notebook 更方便分享數據分析的 insight"
date: 2024-04-24T11:06:01+08:00
Description: "本篇教學主要提供 jupyter notebook 如何發佈於網站上，使得數據分析專案可以讓面試官更方便了解你的能力。"
Tags: ['Data Analysis', 'Python', 'Resume']
Categories: ['Job', 'Tech']
DisableComments: false
---

## 前情提要：
一直都有到國外進修資料科學領域的想法，因此也希望在台灣可以有一些數據分析的實務經驗；讓自己在國外的學習可以快速接軌，也就開始了自己的學習、撰寫履歷的旅程。

雖然說是旅程，但是我也只有得到一次面試機會 XD ; 雖然最後沒有得到一個短期的數據分析機會，但是正是這個面試機會讓我想要有這篇文章的經驗分享，也寫給以後要在美國工作的自己。

由於先前的工作經歷主要是 Java 後端工程師為主，履歷也沒有經歷太大的修改；於是被面試官非常佛心的點出在 Python 的技能樹的說服力有點不足，也讓我思考如何針對數據分析的專案以及 python 應用讓面試官更了解。

此次將介紹如何用 jupyter notebook 建立一個數據分析的作品集，同時又展現你的 Python 能力。

## 為什麼使用 Jupyter notebook：
選擇使用 jupyter notebook 作為數據分析專案的展示有以下幾種原因：
- Jupyter Notebook 可以發布於網頁，非技術背景的 HR 或是 PM 都可以看懂
- Jupyter Notebook 除了可以撰寫 markdown 格式文件，同時又支援 Python、R語言的程式碼區塊；更直觀展現自己的 coding skills 
- GitHub Repository 只有程式碼，這樣面試官很難快速了解面試者的程度

## 如何開始建立 Jupyter Notebook 專案?

**Prequests: **
- 安裝 Anaconda 或是 mini-conda (aka. 縮小版 Anaconda)，在指令列可以用 `conda` 指令 

打開命令列輸入以下指令，安裝 Jupyter notebook 及相關套件於環境:

1. 更新 Conda 套件
```
conda update conda
```

2. 建立虛擬環境 virtualEnv: 
```
conda create -n yourenvname python=${your python ver.}
```

3. 開啟已安裝的虛擬環境：
```
conda activate yourenvname
```

4. 於虛擬環境執行以下套件: 
```
conda install -c conda-forge jupyter-book jupyter
```

## 建立 Jupyter notebook 方法：

1. 直接從以前的 Jupyter notebook 專案新增檔案
2. 利用 Jupyter book 指令建立新專案
