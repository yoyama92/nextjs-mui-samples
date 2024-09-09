# Next.js + MUI の実装サンプル集

## 概要

Next.js + MUI の実装サンプル集です。
使いそうな機能を思いつくままに実装しています。

## 主な技術スタック

- typescript v5
- Next.js v14
- material-ui v6
- prisma v5
- tRPC v10
- zod v3
- NextAuth.js v4
- react-markdown v9
- React Hook Form v7
- react-dropzone v14

データベースにはPostgreSQLを使っており、ローカル環境のデータベースはDockerを使って構築します。  
また、CMSとしてmicroCMSを導入しています。

## 環境構築

### OAuth 2.0 クライアント IDの作成

Google Cloudの認証情報の画面（https://console.cloud.google.com/apis/credentials） から以下の値を設定してOAuth 2.0クライアント IDを生成します。
- 承認済みの JavaScript 生成元
  - http://localhost:3000
- 承認済みのリダイレクト URI
  - http://localhost:3000/api/auth/callback/google
  - http://localhost:3000/api/auth/callback/google2


### 環境変数の設定

ルート直下に`.env`ファイルを作成し、下記の情報を入力してください。

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nextjs-mui-samples"
GOOGLE_CLIENT_ID=<OAuth 2.0のクライアントID>
GOOGLE_CLIENT_SECRET=<OAuth 2.0のクライアントシークレット>
GOOGLE2_CLIENT_ID=<OAuth 2.0のクライアントID>
GOOGLE2_CLIENT_SECRET=<OAuth 2.0のクライアントシークレット>
NEXTAUTH_SECRET=<NextAuth.jsが管理する認証情報を暗号化するためのキー>
MICROCMS_API_KEY=<microCMSのAPIキー>
MICROCMS_SERVICE_DOMAIN=<microCMSサービスドメイン>
NEXTAUTH_URL=http://localhost:3000
BASE_URL=http://localhost:3000
```

`NEXTAUTH_SECRET`  
以下のコマンドで発行します。
```bash
openssl rand -base64 32
```

`MICROCMS_API_KEY`  
microCMS 管理画面の「サービス設定 > API キー」から確認することができます。

`MICROCMS_SERVICE_DOMAIN`  
microCMS 管理画面の URL（https://xxxxxxxx.microcms.io）の xxxxxxxx の部分です。

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

次にdockerフォルダ配下に`.env`ファイルを作成し、下記の情報を入力してください。
```
POSTGRES_USER=postgres
POSTGRES_PW=postgres
POSTGRES_DB=nextjs-mui-samples
PGADMIN_MAIL=postgres@email.com
PGADMIN_PW=postgres
```


## 開発の仕方

1. Dockerの起動
   ```bash
   cd docker
   docker compose up -d
   ```

2. パッケージのインストール
   ```bash
   bun install
   ```

3. 開発環境の起動
   ```bash
   bun run dev
   ```

4. 開発環境へのアクセス  
   [http://localhost:3000](http://localhost:3000)にアクセス
