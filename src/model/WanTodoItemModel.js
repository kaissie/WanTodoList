// ユニークなIDを管理する変数
let wantodoIdx = 0;

export class WanTodoItemModel {
  /**
   * @param {string} title Todoアイテムのタイトル
   * @param {list} tags Todoアイテムのタグ
   * @param {boolean} completed Todoアイテムが完了済みならばtrue、そうでない場合はfalse
   */
  constructor({ title, tags, completed }) {
    // idは自動的に連番となりそれぞれのインスタンス毎に異なるものとする
    this.id = wantodoIdx++;
    this.title = title;
    this.tags = tags;
    this.completed = completed;
  }
}
