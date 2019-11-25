import { element } from "./html-util.js";
import { WanTodoItemView } from "./WanTodoItemView.js";

export class WanTodoListView {
  /**
   * `wantodoItems`に対応するWanTodoリストのHTML要素を作成して返す
   * @param {WanTodoItemModel[]} wantodoItems WanTodoItemModelの配列
   * @param {function({id:string, completed: boolean})} onUpdateWanTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteWanTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element} WanTodoItemModelの配列に対応したリストのHTML要素
   */
  createElement(wantodoItems, { onUpdateWanTodo, onDeleteWanTodo }) {
    const wantodoListElement = element`<ul />`;
    // 各WanTodoItemモデルに対応したHTML要素を作成し、リスト要素へ追加する
    wantodoItems.forEach(wantodoItem => {
      const wantodoItemView = new WanTodoItemView();
      const wantodoItemElement = wantodoItemView.createElement(wantodoItem, {
        onDeleteWanTodo,
        onUpdateWanTodo
      });
      wantodoListElement.appendChild(wantodoItemElement);
    });
    return wantodoListElement;
  }
}
