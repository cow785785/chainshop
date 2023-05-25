<script>
export default {};
</script>
<template>
  <div class="container">
    <div class="container__inner">
      <h1 class="headingPage">ヘルプ・よくある質問</h1>
      <p class="textRead">
        「マイナビ転職」に関するよくある質問です。詳細は各カテゴリトップからご覧ください。<br />
        <span class="catDesc"
          >※誠に申し訳ございませんが、お電話でのお問い合わせ窓口はご用意しておりません</span
        >
      </p>
      <ul class="card-list">
        <li class="card__mini">
          <p class="catNm">会員登録</p>
          <p class="catDesc">
            新規会員登録の手順、ご登録内容の変更や退会に関するご案内
          </p>
          <p class="textRead pd0"><a href="/help/cat/member/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">ログイン</p>
          <p class="catDesc">
            ID・パスワードが不明の場合、SNSアカウントとの連携に関するご案内
          </p>
          <p class="textRead pd0"><a href="/help/cat/login/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">WEB履歴書</p>
          <p class="catDesc">
            WEB履歴書の登録・修正や、応募フォームへの引用に関するご案内
          </p>
          <p class="textRead pd0"><a href="/help/cat/web/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">メールサービス</p>
          <p class="catDesc">
            メールマガジン・各種通知メールのご利用・配信停止に関するご案内
          </p>
          <p class="textRead pd0"><a href="/help/cat/mail/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">スカウト</p>
          <p class="catDesc">
            企業に公開される情報や、希望条件・非公開企業設定に関するご案内
          </p>
          <p class="textRead pd0"><a href="/help/cat/scout/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">応募・質問</p>
          <p class="catDesc">
            応募・質問フォームの入力方法、応募履歴に関するご案内
          </p>
          <p class="textRead pd0"><a href="/help/cat/entry/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">企業・転職エージェントとのやりとり</p>
          <p class="catDesc">
            応募企業とのメッセージ送受信・面接日程の調整に関するご案内
          </p>
          <p class="textRead pd0"><a href="/help/cat/qa/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">求人検索</p>
          <p class="catDesc">
            求人情報の検索方法やMY検索条件・「気になる」のご利用に関するご案内
          </p>
          <p class="textRead pd0"><a href="/help/cat/search/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">転職フェア</p>
          <p class="catDesc">マイナビ転職主催の転職フェアに関するご案内</p>
          <p class="textRead pd0"><a href="/help/cat/event/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">ご利用環境・その他</p>
          <p class="catDesc">
            会員向け各種サービス、マイナビ転職のご利用全般に関するご案内
          </p>
          <p class="textRead pd0">
            <a href="/help/cat/environment/">一覧を見る</a>
          </p>
        </li>
        <li class="card__mini">
          <p class="catNm">求人情報・掲載企業について</p>
          <p class="catDesc">
            「求人情報が事実と異なる」「応募後の連絡がない」など掲載企業に関するお問い合わせ
          </p>
          <p class="textRead pd0"><a href="/help/cat/post/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">アプリについて</p>
          <p class="catDesc">マイナビ転職公式アプリの操作方法に関するご案内</p>
          <p class="textRead pd0"><a href="/help/cat/app/">一覧を見る</a></p>
        </li>
        <li class="card__mini">
          <p class="catNm">求人情報掲載のお問い合わせ</p>
          <p class="catDesc">求人情報掲載をご検討中の企業様向けのご案内</p>
          <p class="textRead pd0">
            <a href="/publish_inquire/" target="_blank">お問い合わせフォーム</a>
          </p>
        </li>
      </ul>
    </div>
    <!--- container__inner --->
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  min-width: 950px;
  width: 100%;
  padding: 30px 0 40px;
  font-size: 1.6rem;
  line-height: 1.6;
  background: #fafafb;
  overflow: hidden;
  z-index: 1;
}

.catDesc {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.headingPage {
  max-width: 950px;
  color: #333;
  font-weight: 700;
  word-break: break-all;
  white-space: normal;
  word-wrap: break-word;
  margin: 0 auto 20px;
  padding: 3px 20px;
  font-size: 2rem;
  border-left: 4px solid #00aaeb;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

li {
  text-align: -webkit-match-parent;
}

.card__mini:first-child {
  margin-left: 0;
}

.card__mini {
  width: 230px;
  height: 300px;
  margin: 20px 5px 0 5px;
  padding: 30px 28px 20px;
  color: #333;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(9, 0, 0, 0.3);
  border-top: 2px solid #00aaeb;
  float: left;
  text-align: center;
}

.card__mini p {
  margin: 0;
}

.card__mini .catNm {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card__mini .catDesc {
  font-size: 14px;
}

.textRead {
  display: flex;
  justify-content: center;
}

.textRead a {
  display: inline-block;
  padding: 8px 15px;
  border-radius: 50%;
  background-color: #00aaeb;
  color: #fff;
  font-size: 12px;
  text-decoration: none;
}
</style>
