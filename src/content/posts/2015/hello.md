---
date: "2015-10-24"
title: "ブログ新しくしました"
tags: ["javascript", "GO"]
excerpt: "ドメインとサーバー更新をおろそかにして、ブログを新しく作り直した話"
draft: true
---

# ブログ新しくしました


```javascript
var hoge = hoge;
function noop() {
  return 0;
}
```


```css
.hoge {
  display: block;
}
```

## hoge


### test


気づいたらサーバーとドメインを更新し忘れてしまったので、ブログを新しくしました。
仕事では、デザインやマークアップをデザイナーやマークアップの方にしていただいているので、最新のツールやデザインに触れる良い機会になったと思います。
振り返りながら、どんな風にブログをリニューアルしたか綴りたいと思います。

## デザインリニューアルのプロセス

読み物として、できるだけ読みやすくなるように、今回は以下のアプローチをとりました。

1. Mediumのレイアウトを分析し、ベースとして考える
2. 日本語でのバランスを見ながら、調整を行う
3. その上で、自分らしさや好みを反映させる

結果的には、CSS設計など大変勉強になる点が多数あり、満足のいく結果となりました。

### font-size

|tag(mediumサイトでのtag, class名)  |medium|result|
|-----|------|------|
|h1(h2.graf--h2)|52px|52px|
|h2(h3.graf--h3)|36px|36px|
|h3(h4.graf--h4)|28px|28px|
|p|21px|18px|
|li|18px|18px|
|blockquote|28px|28px|

mediumでは、`<p>`タグのフォントサイズが少し大きく感じられたため、本ブログでは18pxとしました。英語表記では、気になりませんが、日本語書体だとどうしても大きく感じてしまうので、大きさを調整しました。

{{<img src="/img/posts/2015/hello/medium-p.png" width="742" title="mediumにおけるpタグの文字表記">}}

font-sizeについては、日本語の有名サイトではどのような設定になっているのでしょうか？気になったので調べてみました。

|サイト名|文章のfont-size|
|-----|-----|
|[はてなブログ開発ブログ](http://staff.hatenablog.com/)|95%|
|[AmebaOwnd(starbucks)](https://starbucks.amebaownd.com/posts/229752?categoryIds=49)|1.4rem|

見てみると、`%`指定と`rem`指定がされているサービスが多々ありました。少しここら辺の知識が不足しているので、時間のあるときに調べてみたいと思います。


見出しタグについては、mediumで指定されているサイズをそのまま反映することにしました。

### line-height

行間については、[日本語を読みやすくする](http://denki.nara-edu.ac.jp/~yabu/soft/nihongo.html)というサイトで、以下のような考察を見つけました。

> 日本語を読み易く表示するには、行送りを フォントサイズの 160% ～ 200% 程度に設定すると良いようです。 行間を広く取ると 1 ページに表示可能な行数は減ってしまいますが、 行送りは最低限 150% は確保したいところです。

|tag(mediumサイトでのtag)  |medium|result|
|-----|------|------|
|h1(h2)|1.04|1.04|
|h2(h3)|1.15|1.15|
|h3(h4)|1.22|1.22|
|p|1.58|1.7|

確かに、mediumの行間設定では、若干詰まっている感じがしたため、`<p>`タグを`line-height: 1.7;`と変更しました。

文字サイズと行間については、kindleアプリでは、読み手が自由に設定できたりするので、そういった仕組みを提供するのが一番良いのかなと思いました。

### font-family

一番悩ましいのが、`font-family`の設定です。いくつか検討したフォントは以下になります。

|font-family|備考|
|-----|-----|
|Google Noto Fonts(Noto Sans CJK JP)| GoogleとAdobeが共同開発した |
|mplus-outline-fonts|自由にご利用、複製、再配布できる日本製のフォント|
|游ゴシック|macとwindowsである程度カバーできる(Windows8.1以降、MacOS10.9以降)|
|ヒラギノ角ゴ ProN|Appleユーザーおなじみ(Mac OS 10.5以降、iOS)|

Web Fontsというリスクは結構あるのですが、[Google Noto Fonts](http://www.google.com/get/noto/#sans-jpan)を選ぶことにしました。
wikipediaには、Google Noto Fontsについて、下記のように書かれています。

> NotoはGoogleによって開発されたオープンソースのフォントファミリー。
  世界中の言語をサポートすることを目標に、Apache License 2.0で配布されている。コンピューターで表示できない文字がある場合、文字の代わりに小さい四角い箱(□)が表示される。Googleではそれを”豆腐”と呼んでおり、Webから取り除くためにNoto(No Tofu)フォントを作った。

先日プレゼン資料を作成した際に、とても良いなと思ったのがこのフォントを知るきっかけでした。<br>
今後何かと自分が情報を発信する際に多用すると思うので、自分の言葉としては統一感を出していけるフォントだと思います。

### Web Fontsのデメリット

Web Fontsを使うことのデメリットとしては、以下が考えられます。

- ロード時間
- 適用されるまで真っ白表示になってしまう問題

一番わかりやすいスライドは以下です。

{{<speakerdeck id="a6cbfa450d0c4750afa4a3f30e31e730" ratio="1.77777777777778">}}



### margin-top

### aタグのデザイン

mediumの`<a>`タグのデザインは非常に興味深いものでした。

 [このように](#anchor)リンク文字の下に下線が引かれるデザインですが、一般的な文字に対する下線のスタイリングは下記のようではないかと思います。
 
```css
a {
  text-decoration: underline;
}
 
a {
  border-bottom: 1px solid #393939;
}
```
上記のようなCSSだと、文字に対する下線位置を調整を行うことが難しく、以前からもどかしく感じることがありました。

mediumでは、できるだけデザイン調整な下線を表現するために以下のような実装をしています。

```css
a {
  text-decoration: none;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 50%);
  background-repeat: repeat-x;
  background-size: 2px 2px;
  // この値を調整することで、文字に対する下線の位置の細かな調整が可能
  background-position: 0 23px;
}
```

この発想はこれまでなかったので、この実装は大変勉強になりました。ぜひみなさまも試してみてください。


### hrタグのデザイン

---

上記が、このブログにおける`<hr />`タグのデザインです。

mediumでは区切り線として3つの点を用いていました。

### codeブロック


### 関連技術

- Hugo
- Sketch3
- cssnext

