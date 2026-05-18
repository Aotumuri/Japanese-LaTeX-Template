# 日本語LaTeX論文テンプレート

日本語で二段組のLaTeX論文を書き始めるための最小テンプレートです。
`jsarticle` の `twocolumn` を使い，`uplatex` と `dvipdfmx` でPDFを生成します。

## 最速スタートアップ

```sh
npm run init:paper
npm run setup:hooks
npm run open
```

これで論文用ファイルを `paper/` に作成し，Git hookを有効化し，PDFをビルドして開きます。
以後は基本的に `paper/` 以下を編集してください。

よく使うコマンドは次の通りです。

```sh
npm run build
npm run watch
npm run check
npm run clean
```

## テンプレート更新と論文本体の分離

このリポジトリは，更新元と衝突しやすい論文本体を `paper/` に分離します。

- `template/`: 元repoから更新を取り込むテンプレート側の入口とスタイル
- `paper.example/`: `paper/` を作るための初期サンプル
- `paper/`: 利用者が実際に書く論文本体

`npm run init:paper` は `paper.example/` から `paper/` にファイルをコピーします。
既に存在するファイルは上書きしません。

`paper/` は `.gitignore` に入っています。
自分の論文リポジトリとして本文もGit管理したい場合は，`.gitignore` から `paper/` を外してください。

## 目的

- 日本語でLaTeX論文を書けるようにする
- 二段組の論文をすぐ書き始められるようにする
- `npm run build` / `npm run watch` / `npm run clean` で操作できるようにする
- テンプレート更新と論文本体の衝突を減らす

## ディレクトリ構成

```text
paper-template/
├─ package.json
├─ README.md
├─ .gitignore
├─ latexmkrc
├─ template/
│  ├─ main.tex
│  └─ styles/
│     └─ paper.sty
├─ paper.example/
│  ├─ meta.tex
│  ├─ abstract.tex
│  ├─ keywords.tex
│  ├─ body.tex
│  ├─ sections/
│  ├─ figures/
│  ├─ tables/
│  └─ references.bib
├─ paper/
│  ├─ meta.tex
│  ├─ abstract.tex
│  ├─ keywords.tex
│  ├─ body.tex
│  ├─ sections/
│  ├─ figures/
│  ├─ tables/
│  └─ references.bib
├─ scripts/
└─ build/
```

## 必要な環境

- Node.js
- npm
- upLaTeX
- dvipdfmx
- latexmk
- upbibtex

macOSではMacTeX、LinuxではTeX Liveを入れると必要なLaTeXコマンドをまとめて用意できます。
Windowsは必須対象ではありません。Windowsで使う場合は，TeX LiveとNode.jsを入れたうえで，シェル環境に合わせてnpm scriptsを調整してください。

## ビルド

PDFを生成します。

```sh
npm run build
```

生成物は `build/` 以下に出力されます。
PDFは `build/main.pdf` です。

ビルド後にPDFを開く場合は次を使います。

```sh
npm run open
```

## 変更監視

変更を監視して自動ビルドします。

```sh
npm run watch
```

終了するときはターミナルで `Ctrl+C` を押してください。

## クリーン

`build/` とLaTeXの補助ファイルを削除します。

```sh
npm run clean
```

クリーンしてからビルドする場合は次を使います。

```sh
npm run rebuild
```

## チェックと整形

論文ソース内の `、` と `。` は，`，` と `．` に自動変換できます。
対象は `paper/`，`paper.example/`，`template/` 以下の `.tex`，`.bib`，`.sty` です。

```sh
npm run format
```

`npm run build` と `npm run watch` は，開始時にこの変換を自動実行します。
CIなどで変換漏れだけを検出したい場合は次を使えます。

```sh
npm run check:punctuation
```

論文ソース内に残った `% TODO` や `% FIXME` を検出する場合は次を使います。

```sh
npm run check:todo
```

提出前に句読点，`% TODO` / `% FIXME`，ビルドをまとめて確認する場合は次を使います。

```sh
npm run check
```

コミット時にも同じ変換を必ず実行するため，最初にGit hookを有効化してください。

```sh
npm run setup:hooks
```

hookはコミット前に `npm run format` を実行します。
変換によって差分が出た場合はコミットを止めるため，内容を確認して `git add` してからもう一度コミットしてください。

## 章を追加する方法

1. `paper/sections/` に章ファイルを追加します。
   例: `paper/sections/06_discussion.tex`
2. `paper/body.tex` に読み込みを追加します。

```tex
\paperinput{sections/06_discussion}
```

## 図を追加する方法

図ファイルを `paper/figures/` に置きます。
`template/main.tex` では次の設定を入れているため，ファイル名だけで読み込めます。

```tex
\graphicspath{{paper/figures/}{paper.example/figures/}}
```

本文では次のように使います。

```tex
\begin{figure}[tb]
  \centering
  \includegraphics[width=\linewidth]{sample-figure}
  \caption{図のキャプション}
  \label{fig:sample}
\end{figure}
```

たとえば `paper/figures/sample-figure.pdf` を置いた場合，`\includegraphics{sample-figure}` で読み込めます。

## 参考文献を追加する方法

参考文献は `paper/references.bib` にBibTeX形式で追加します。

```bibtex
@misc{sample2026template,
  author = {},
  title = {日本語論文テンプレートの構成例},
  year = {2026},
  note = {架空の参考文献}
}
```

本文では次のように引用します。

```tex
\cite{sample2026template}
```

参考文献スタイルには標準的な `unsrt` を使っています。

## スタイルを変更する方法

簡単な見た目や共通マクロは `template/styles/paper.sty` に置いています。
投稿先の指定に合わせて余白，見出し，キャプションなどを調整してください。
