import { element } from "./html-util.js";

export class WanTodoItemView {
  /**
   * `wantodoItem`に対応するWanTodoアイテムのHTML要素を作成して返す
   * @param {WanTodoItemModel} wantodoItem
   * @param {function({id:string, completed: boolean})} onUpdateWanTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteWanTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(wantodoItem, { onUpdateWanTodo, onDeleteWanTodo }) {
    const wantodoTagsElement = document.createElement("ul");
    wantodoTagsElement.className = "tag";
    wantodoItem.tags.forEach(tag => {
      var li = document.createElement("li");
      li.textContent = "#" + tag;
      wantodoTagsElement.appendChild(li);
    });
    console.log(wantodoTagsElement);
    const wantodoItemElement = wantodoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
                                    <s>${wantodoItem.title}</s>
                                    <button class="delete">x</button>
                                </input></li>`
      : element`<li><input type="checkbox" class="checkbox">
                                    ${wantodoItem.title}
                                    <button class="delete">x</button>
                                </input></li>`;
    wantodoItemElement.appendChild(wantodoTagsElement);
    const inputCheckboxElement = wantodoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      // コールバック関数に変更
      onUpdateWanTodo({
        id: wantodoItem.id,
        completed: !wantodoItem.completed
      });
    });
    const deleteButtonElement = wantodoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      // コールバック関数に変更
      onDeleteWanTodo({
        id: wantodoItem.id
      });
    });
    // 作成したWanTodoアイテムのHTML要素を返す
    return wantodoItemElement;
  }
}
