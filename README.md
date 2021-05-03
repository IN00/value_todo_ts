# value_todo_ts

## TS x private package の作り方指南書

[typescript導入したprivateなnpmパッケージの作り方 - 30歳SIerからWEBエンジニアで奮闘](https://karuta-kayituka.hatenablog.com/entry/2020/04/05/124531)

## テストの書き方

- プライベートメソッド以外のメソッドのテストは記述する
- コンストラクタのテストは記述しない (コンストラクターにロジックが寄っていてテストを書きたくなったら、それは違うクラスに責務を移す)
