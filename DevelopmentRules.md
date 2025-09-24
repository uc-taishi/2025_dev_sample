# 開発ルール

開発を行う際のルールについてまとめた。以下の手順で環境構築を行う事。

## 1. VSCodeインストール

[こちらのリンク](https://pengi-n.co.jp/column/vscode-install/)の手順でインストールおよび日本語化を行うこと

## 2. Gitインストール

[こちらのリンク](https://www.sejuku.net/blog/73444)の手順でインストールを行うこと

## 3. Node.jsインストール

[こちらのリンク](https://zenn.dev/kuuki/articles/windows-nodejs-install)の手順でインストールを行うこと

## 4. Dockerインストール

[こちらのリンク](https://qiita.com/0xv80/items/597300827b212cab4328)の手順でインストールを行うこと

## 5. DevContainerの環境構築

VSCodeにDevContainerの拡張機能（ms-vscode-remote.remote-containers）をインストールしてから以下のコマンドを実行し、対象のリポジトリをクローンする。

```bash
git clone https://github.com/uc-taishi/2025_dev_sample.git
```

その後、クローンしたワークスペースを開き、Ctrl+Shift+Pで「開発コンテナ：コンテナで再度開く」を行うことで、対象のリソースを起動する。
実装のルールはNextRules.md、GitのルールはGitRules.mdを参照すること。
