# Next.js言語ルール

React（JavaScriptライブラリ）を用いたWebアプリケーションフレームワークであるNext.jsのルールについて

## バージョン規定

* Next.jsプロジェクト管理ファイルであるpackage.jsonを編集する際は開発リーダーへ相談すること。
* 主要ライブラリは以下のバージョンを用いること。
  * a
  * b
  * c

## コーディングルール

### ファイル、ディレクトリ

ケバブケースを用いる

```
user-profile.tsx
product-card.tsx
shopping-main/
```

### コンポーネント名、クラス名、インターフェース、型

パスカルケースを用いる

```typescript
function UserProfile()
<ProductCard />
class UserService
interface UserData
type ProductType
```

### 変数、関数

キャメルケースを用いる

```typescript
const userName
let itemCount
function getUserData()
function fetchProductList()
```

### 定数

SCREAMING_SNAKE_CASE（すべて大文字のスネークケース）を用いる

```typescript
const MAX_ITEM_COUNT = 100
const API_KEY = '...'
```

### 関数コンポーネントの記法

以下の記法を採用する。

```typescript
function UsersPage() {}
```

以下のReact.FC記法は使用しないこと

```typescript
const UsersPage: React.FC = () => {}
```

## ディレクトリ構成

```
2025_dev_sample/
├── .devcontainer/
│   ├── devcontainer.json
│   ├── Dockerfile
├── sample-application/
    ├── app/
    │   ├── api/
    |   |   ├── users/
    │   ├── users/
    |   |   ├── page.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.module.css
    │   ├── page.tsx
    ├── components/
    │   ├── button.tsx
    ├── prisma/
    │   ├── postgres/
    |   |   ├── schema.prisma
    │   ├── sqlite/
    |   |   ├── prisma/
    |   |   |   ├──dev.db
    |   |   ├── schema.prisma
    |   ├── seed.ts
    ├── public/
    │   ├── favicon.ico
    ├── .env # prisma設定ファイルパス
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── README.md
    ├── tsconfig.json
```
