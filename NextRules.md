# Next.js言語ルール

React（JavaScriptライブラリ）を用いたWebアプリケーションフレームワークであるNext.jsのルールについて

## バージョン規定

* package.jsonに記載あるバージョンを用いること
* package.jsonに記載の無いライブラリを用いる際は開発リーダーに相談すること

## コーディングルール

ファイル命名、プログラム命名等以下のルールに従うこと。

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

### 全体として統一すべき事項

* 命名の際は日本語の英訳を用いる
以下はOK
```
users, Login
```
以下はNG
```
var1, var2, knrsk() 
```

* プライベートな属性はハッシュ文字（#）を先頭に用いること（そもそもプライベート属変数にアクセスする際はゲッター、セッターを用いるべき）
```
#userId
```

* フォーマットの際は、スペース:4を基本値としてフォーマットすること

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

### 実装する際の注意点

* データアクセスは/app/api/以下にディレクトリ+route.tsを作成し、それを呼び出すことでアクセスすること（それぞれの画面のコンポーネントなどから直接アクセスしてはいけない）

* 新規に画面を追加する際は/app/以下にディレクトリ+page.tsxを作成することでページを追加する（AppRouterの基本に従う）

* globals.cssは編集してはいけない。どうしても編集したい場合、開発リーダーに相談すること

* 共通コンポーネント（/components）は編集しないこと。また、ボタンなど複数の画面で見た目を統一するべき部分は共通コンポーネントを利用すること

* 共通コンポーネントを新たに作成する、やむを得ない事情で修正したい場合は開発リーダーに相談すること

* ユーザー一覧画面から個々のユーザーの画面に遷移するなど、動的にページに表示する情報が変わる個別画面は「[id]」のように、親ページ内にディレクトリを作成し、その下にpage.tsxを作成すること（AppRouterの基本に従う）