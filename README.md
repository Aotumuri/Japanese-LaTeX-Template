# 日本語LaTeX論文テンプレート

日本語で二段組のLaTeX論文を書き始めるための最小テンプレートです。
`jsarticle` の `twocolumn` を使い、`uplatex` と `dvipdfmx` でPDFを生成します。

## 最速スタートアップ

```sh
npm run setup:hooks
npm run open
```

これでGit hookを有効化し，PDFをビルドして開きます．
以後は `src/main.tex` と `src/sections/` 以下を編集してください．

よく使うコマンドは次の通りです．

```sh
npm run build
npm run watch
npm run check
npm run clean
```

## 目的

- 日本語でLaTeX論文を書けるようにする
- 二段組の論文をすぐ書き始められるようにする
- `npm run build` / `npm run watch` / `npm run clean` で操作できるようにする
- スタイル調整を `src/styles/paper.sty` に集め、差し替えやすくする

## ディレクトリ構成

```text
paper-template/
├─ package.json
├─ README.md
├─ .gitignore
├─ latexmkrc
├─ .githooks/
│  └─ pre-commit
├─ .vscode/
│  ├─ extensions.json
│  └─ settings.json
├─ src/
│  ├─ main.tex
│  ├─ styles/
│  │  └─ paper.sty
│  ├─ sections/
│  │  ├─ 01_intro.tex
│  │  ├─ 02_related_work.tex
│  │  ├─ 03_method.tex
│  │  ├─ 04_experiment.tex
│  │  └─ 05_conclusion.tex
│  └─ references.bib
├─ resources/
│  ├─ figures/
│  └─ tables/
├─ scripts/
│  ├─ check-todo.js
│  ├─ clean.js
│  ├─ open-pdf.js
│  └─ normalize-punctuation.js
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
Windowsは必須対象ではありません。Windowsで使う場合は、TeX LiveとNode.jsを入れたうえで、シェル環境に合わせてnpm scriptsを調整してください。

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

## 句読点を統一する方法

論文ソース内の `、` と `。` は，`，` と `．` に自動変換できます．
対象は `src/` 以下の `.tex`，`.bib`，`.sty` です．

```sh
npm run format
```

`npm run build` と `npm run watch` は，開始時にこの変換を自動実行します．
CIなどで変換漏れだけを検出したい場合は次を使えます．

```sh
npm run check:punctuation
```

論文ソース内に残った `% TODO` や `% FIXME` を検出する場合は次を使います．
対象は `src/` 以下の `.tex`，`.bib`，`.sty` です．

```sh
npm run check:todo
```

提出前に句読点，`% TODO` / `% FIXME`，ビルドをまとめて確認する場合は次を使います．

```sh
npm run check
```

コミット時にも同じ変換を必ず実行するため，最初にGit hookを有効化してください．

```sh
npm run setup:hooks
```

hookはコミット前に `npm run format` を実行します．
変換によって `src/` 以下に差分が出た場合はコミットを止めるため，内容を確認して `git add` してからもう一度コミットしてください．

## VS CodeでTODOを目立たせる方法

このリポジトリには，LaTeXコメントの `% TODO` と `% FIXME` だけを強く目立たせるVS Code設定を入れています．
VS Codeで開いたときに推奨拡張機能の通知が出たら，次の拡張機能をインストールしてください．

- TODO Highlight
- Todo Tree

インストール後は，エディタ上の `% TODO` / `% FIXME` に強い背景色が付き，右側のルーラーとTodo Treeにも表示されます．
本文中の単なる `TODO` や `FIXME` には反応しません．

## 章を追加する方法

1. `src/sections/` に章ファイルを追加します。
   例: `src/sections/06_discussion.tex`
2. `src/main.tex` に読み込みを追加します。

```tex
\input{src/sections/06_discussion}
```

## 図を追加する方法

図ファイルを `resources/figures/` に置きます。
`src/main.tex` では次の設定を入れているため、ファイル名だけで読み込めます。

```tex
\graphicspath{{resources/figures/}}
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

たとえば `resources/figures/sample-figure.pdf` を置いた場合、`\includegraphics{sample-figure}` で読み込めます。

## 参考文献を追加する方法

参考文献は `src/references.bib` にBibTeX形式で追加します。

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
投稿先の指定がある場合は、必要に応じて `\bibliographystyle{...}` を変更してください。

## スタイルを変える方法

簡単な見た目や共通マクロは `src/styles/paper.sty` に置いています。
別のスタイルにしたい場合は、このファイルを編集するか、同じ名前で置き換えてください。
