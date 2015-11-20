---
date: "2015-11-20"
title: "My Trello extension"
tags: ["trello", "chrome extension"]
excerpt: "trelloを快適に使うために、chrome extensionを作った話"
feature_img: "/manabi/img/posts/2015/my-trello-extension/showLabelAndId.png"
---

# My Trello extension

Trelloをより快適に使うために、様々なChrome Extensionがあります。
調べてみると種々様々なものが色々あり、いっぱい入れたいたいなと思ったのですが、
パフォーマンスの点や管理の点、チームメンバーで統一したりする際に不便だったので[自分専用のもの](https://github.com/HAKASHUN/my-trello-extension)を作って機能をまとめてみました。

## 機能

- ラベル名・カード番号の表示
- リストのスリム化ボタンの追加

## ラベル名・カード番号の表示

ラベル名とカード番号は、実はDOMとしてはすでに存在しているので、CSSを調整して表示してあげれば良いだけでした。

{{<img src="/manabi/img/posts/2015/my-trello-extension/showLabelAndId.png" width="290" caption="表示した際のキャプチャイメージ" >}}

ラベル名とカード番号を見せることで、ボードを眺めて議論する際に大変楽になりました。


## リストのスリム化ボタンの追加

カードのリストが増えると、画面内にすべてのリストを表示することができず、一覧性が落ちてしまうため、カードの横幅をスリム化するためのボタンを追加しました。

{{<img src="/manabi/img/posts/2015/my-trello-extension/showSlimButton.png" width="406" caption="カードをスリム化するボタンを追加" >}}

Slim Listsボタンを押すと、下記のように画面のサイズ内にすべてのリストが入るように調整されます。
<span>※カードは小さくなりすぎない(140pxまで)ようにしてあります。</span>

{{<img src="/manabi/img/posts/2015/my-trello-extension/slimmedLists.png" width="916" >}}


---


Chrome Storeには出していませんが、試してみたい方は以下よりダウンロードして使ってみてください^^

https://github.com/HAKASHUN/my-trello-extension
