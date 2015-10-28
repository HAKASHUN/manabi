---
date: "2015-10-27"
title: "WebFont"
tags: ["webfont"]
excerpt: "WebFontをブログに適用した話"
feature_img: "/img/posts/2015/font/feature.jpg"
draft: true
---

{{<img src="/img/posts/2015/font/feature.jpg" width="100%" >}}


# WebFont

パフォーマンスなどを考慮して、WebFontを用いる際にどんなことをしたのかメモしました。

## 使うフォントを選ぶ

Noto Sans CJK JPを使うことは決まっているので、さらにどの太さを使うのか絞り込みます。

|NotoSansの太さ|使うかどうか|
|-----|-----|
|Thin 250|◯|
|Light 300|×|
|DemiLight 350|×|
|Regular 400|×|
|Medium 500|×|
|Bold 700|◯|
|Black 900|×|

このブログでは、一番細い「Thin」と２番目に太い「Bold」を使うことにしました。

## フォントのダウンロード

早速フォントをダウンロードします。

- [Noto Sans CJK JP](http://www.google.com/get/noto/)(115.5MBくらい)

### Noto Sans CJK JPの中身

ダウンロードしたファイルを展開すると、太さごとに`.otf`ファイルが入っていました。

{{<img src="/img/posts/2015/font/NotoSansCJKjp.png" title="ダウンロードしたNotoSansCJKjpの中身" width="365" >}}

ここから、`Thin`と`Bold`を取り出して、軽量化していきます。

## 軽量化の方針

できるだけタスクを自動化したいので、以下のような方針をあらかじめ立てました。

- ダウンロードしたフォントの中から、任意の文字群のみ抜き出す。(サブセット化)
- `otf`ファイルから、`ttf`ファイルを作成する
- 上記のタスクを `gulp`タスク化する

## .otfから.ttfへ

ここが一番つまづいたポイントでした。


### FontForgeのダウンロード

Macの環境なので、brew経由で取得します。

```bash
brew install fontforge --with-giflib --with-libspiro --with-x11
```

Xcodeのコマンドラインツールがないと、うまくインストールできなかったので、私の場合は、下記を事前に実行しました。

```bash
xcode-select --install
```

### gulpタスク化

特に難しいことはしません。

```javascript
var gulp = require('gulp');
var otf2ttf = require('otf2ttf');

gulp.src('YOUR_PATH/*.otf')
    .pipe(otf2ttf())
    .src('YOUR_DEST_PATH/')
```

あくまでも、git管理するのは`.otf`フォントファイルのみで、そのあとはビルド時に変換など任せることを目指します。

## サブセット化

ここからが、WebFontをよりよく使うための肝となります。<br>
サブセット化を行うことで、フォントファイル自体のサイズを小さくします。

### fontmin

{{<img src="https://raw.githubusercontent.com/ecomfe/fontmin/master/fontmin.png" title="fontmin" width="128" >}}

サブセット化nodeで行うために、[fontmin](https://github.com/ecomfe/fontmin)を使います。対象のフォントファイルから、指定したテキストのみのファイルを生成してくれるものです。
ここでは、gulpタスク化するために、[gulp-fontmin](https://github.com/ecomfe/gulp-fontmin)を用います。


### 漢字は第１水準漢字のみに

既存のフォントには、たくさんの漢字が入っているのですが、第１水準漢字のみに絞り込むことにします。 <br>
第１水準漢字は、2,965文字になるので、足りるのか？心配ですが、基本的な文章はこれで十分みたいなので信じることにします。
さらに、英数字や記号も加えたリストを作成して、サブセット化する文字を決定しました。

### gulpタスク化

```javascript
var gulp = require('gulp');
var fontmin = require('gulp-fontmin');
var otf2ttf = require('otf2ttf');
var config = require('../config');

gulp.task('font', function() {
  var fontConfig = config.font;
  gulp.src(fontConfig.src)
    .pipe(otf2ttf())
    .pipe(fontmin({
      text: fontConfig.text
    }))
    .pipe(gulp.dest(fontConfig.dst));
});

```

## 最終結果

|font-family|サブセット前(.otf)|.ttf|.woff|.eot|.svg|
|-----|-----|-----|-----|-----|-----|
|NotoSansCJKjo-Thin|17,000KB|6KB|6KB|6KB|16KB|
|NotoSansCJKjo-Bold|15,200KB|6KB|6KB|6KB|16KB|


## 参考文献

- [日本語WebフォントにNoto Sans CJK JPを指定する時に気を付けたこと](http://b.0218.jp/20150620044014.html)
- [フォントファイルから使いたい文字を抜き出してコマンドラインでWebフォント化するfontminが便利だった
](http://qiita.com/dayoshix/items/040095a92a60f1c75471)
- [【Noto Sans Japanese】ブログの記事を綺麗なフォントで表示したいので最軽量化してみた](http://11neko.com/font-3/)
