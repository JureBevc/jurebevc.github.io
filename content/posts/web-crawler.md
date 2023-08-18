---
title: "Web crawler"
date: 2023-08-18T17:41:32+02:00
draft: false

tags:
  - "Python"
---

Since there are not many free tools available for quick and easy web
scraping, I created my own web crawler for basic data scraping. The
project is available on my [GitHub](https://github.com/JureBevc/GeneralPurposeScraper).
The web crawler uses the selenium framework with the
geckodriver web driver to scrape websites and the
Tkinter toolkit to create a simple GUI for quick use:

![Image alt](/scraper-gui.png)
<img src="/scraper-gui.png"/>


This crawler was used to scrape over 4000 vaccination tweets from
Twitter. The dataset is available on [Kaggle](https://www.kaggle.com/neonian/vaccination-tweets).