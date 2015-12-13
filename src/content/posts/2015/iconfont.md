---
date: "2015-12-13"
title: "オリジナルのアイコンフォントを作成する"
tags: ["font", "sketch", "gulp"]
excerpt: "自分で書いたアイコンをフォントにする話"
feature_img: "/manabi/img/posts/2015/iconfont/preview.png"
---

# オリジナルのアイコンフォントを作成する

## やりたいこと

1. 自分で作ったアイコンを一つのフォント化する。
2. 以降、アイコンを追加したい際は、ファイルを追加してビルドすればOK

## 使ったもの

1. gulp
2. gulp-iconfont

本当はgulpにも依存したくないけど...

## 自分のSVG作成時のルール

[gulp-iconfontのレポジトリ](https://github.com/nfroidure/gulp-iconfont#preparing-svgs)に詳しく乗っているので、よく読む。

### ツール

- Sketch3を使う
- [Sketch3で作成する際のテンプレート](https://github.com/nfroidure/gulp-iconfont#sketch)があるので活用する
  - `symbol-font-14px.sketch`をベースにしました。

### サイズ

- `500px`以上の高さで作ること
- 基本的に幅と高さ`560px`のSVGファイルを作成する
  - テンプレートのサイズ感をそのまま継承
- アイコン本体は`480px`の正方形に収まるようにする

### カラー

- 黒色(`#000000`)のベタ塗り

{{<img src="/manabi/img/posts/2015/iconfont/sample.png" width="1000" caption="試しにSketch3で作ってみた感じ" >}}


## 作成したsvgからフォントファイルを作成

```
root
├── src
│   └── icons
│       └── wider.svg // 作成したsvgファイル
└── fonts //作成したフォントを入れたいディレクトリ
```

上記のようなディレクトリ構成にしたので、`src/icons/*.svg`ファイルが、`src/fonts`ディレクトリにフォントとして出力されるようにします。


### gulpタスク

設定したgulpタスクは、こんな感じになりました。

```
var gulp = require("gulp");
var iconfont = require('gulp-iconfont');

gulp.task('iconfont', function(){
  return gulp.src(['src/icons/*.svg'])
    .pipe(iconfont({
      fontName: 'myfont',
      appendUnicode: true,
      formats: ['ttf', 'eot', 'woff']
    }))
    .pipe(gulp.dest('fonts/'));
});
```

これを実行すると...

```
$ gulp iconfont

[14:56:08] Starting 'iconfont'...
[14:56:08] gulp-svgicons2svgfont: Font created
[14:56:08] Finished 'iconfont' after 114 ms
```

以下のように、3種類の拡張子でフォントファイルが作成されました。


```
root/fonts
├── myfont.eot
├── myfont.ttf
└── myfont.woff
```

## ガイドファイルも作成する

### 割り当てられたUnicodeがわからない

フォントも無事に生成されて、無事に使おうと思ったところで問題が発生しました。
作ったアイコンフォントを出すためのUnicodeがわからなかったのです。。。

そこで、フォントファイルの作成と同時に、フォントの中身や使い方を説明するガイドファイルを作る仕組みを入れることにしました。

### テンプレートファイルの用意

Sketch3のテンプレートを提供していた[symbols-for-sketch](https://github.com/cognitom/symbols-for-sketch)のレポジトリで、ガイドファイルを作成する仕組みがあるので、それを参考にしました。

- [htmlのテンプレート](https://github.com/cognitom/symbols-for-sketch/blob/master/templates/fontawesome-style.html)
- [cssのテンプレート](https://github.com/cognitom/symbols-for-sketch/blob/master/templates/fontawesome-style.css)

※テンプレートエンジンは[consolidate](https://github.com/tj/consolidate.js)

仕組みとしては、gulpでフォントファイルを生成する過程で、必要なパラメータをテンプレートに流し込む感じです。
`gulp-iconfont`が必要な情報を`glyphs`というイベント名でemitしてくれるので、gulpfileは以下の様になります。

```
.on('glyphs', function(glyphs) {
  // テンプレートに渡すパラメータを調整
  var options = {
    glyphs: glyphs.map(function(glyph) {
      return { 
        name: glyph.name, 
        codepoint: 
        glyph.unicode[0].charCodeAt(0) 
      }
    }),
    fontName: fontName,
    fontPath: '../../fonts/',
    className: 's'
  };
  
  // ガイドCSSの作成
  gulp.src('src/templates/fontawesome-style.css')
    .pipe(consolidate('lodash', options))
    .pipe(rename({ basename:fontName }))
    .pipe(gulp.dest('dist/css/'));

  // ガイドHTMLの作成
  gulp.src('src/templates/fontawesome-style.html')
    .pipe(consolidate('lodash', options))
    .pipe(rename({ basename:'sample' }))
    .pipe(gulp.dest('dist/'));
})
```

これで、アイコンフォント作成時に、以下のようなガイドファイルが作成されます。
CSSの中身をみれば、作成したアイコンフォントをどのように定義すればよいかわかります。

{{<img src="/manabi/img/posts/2015/iconfont/preview.png" width="600" caption="できたガイドファイルを開いてみた" >}}

作成されたガイドCSSをビルド時にアプリケーションのCSSに動的に組み込むこともできるので、かなりメンテナンス性のある形で自作のアイコンフォントを運用できると思います。

----


## 最終的なgulpタスク

```
var gulp = require("gulp");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require("gulp-rename");

var fontName = 'myfont';

gulp.task('iconfont', function(){
  return gulp.src(['src/icons/*.svg'])
    .pipe(iconfont({
      fontName: fontName,
      appendUnicode: true,
      formats: ['ttf', 'eot', 'woff']
    }))
    .on('glyphs', function(glyphs) {
      var options = {
        glyphs: glyphs.map(function(glyph) {
          // this line is needed because gulp-iconfont has changed the api from 2.0
          return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
        }),
        fontName: fontName,
        fontPath: '../../fonts/', // set path to font (from your CSS file if relative)
        className: 's' // set class name in your CSS
      };
      gulp.src('src/templates/fontawesome-style.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName }))
        .pipe(gulp.dest('dist/css/')); // set path to export your CSS

      // if you don't need sample.html, remove next 4 lines
      gulp.src('src/templates/fontawesome-style.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'sample' }))
        .pipe(gulp.dest('dist/')); // set path to export your sample HTML
    })
    .pipe(gulp.dest('fonts/'));
});
```

## 参考文献

- [symbols-for-sketch](https://github.com/cognitom/symbols-for-sketch)
- [gulpでWebFont作成を自動化](http://atsu666.com/entry-78.html)
- [gulpを使ってsvgからアイコンフォント (WEBフォント) を自作する最短の方法](http://thrbrd.hateblo.jp/entry/2015/02/14/012508)
- [sprite画像はもう終わり？gulpでIcon Fontをつくろう！](http://memo.goodpatch.co/2015/01/make-icon-font/)
- [gulp でアイコン フォント生成](http://akabeko.me/blog/2015/01/gulp-iconfont/)
- [無料でできる！オリジナルアイコンフォントを作ってみよう](http://liginc.co.jp/web/design/font/33237)
- [アイコンフォント（Webフォント）自作のメモ](http://10251.net/original-icon-font)
