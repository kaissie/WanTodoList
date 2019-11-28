import { WanTodoListView } from "./view/WanTodoListView.js";
import { render } from "./view/html-util.js";
import { WanTodoListModel } from "./model/WanTodoListModel.js";
import { WanTodoItemModel } from "./model/WanTodoItemModel.js";
console.log("App.js: loaded");
export class App {
  constructor() {
    console.log("App initialized");
    this.wantodoListView = new WanTodoListView();
    this.wantodoListModel = new WanTodoListModel([]);
  }

  /**
   * Todoを追加時に呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title, tags = []) {
    this.wantodoListModel.addWanTodo(
      new WanTodoItemModel({ title, tags, completed: false })
    );
  }

  /**
   * Todoの状態を更新時に呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.wantodoListModel.updateWanTodo({ id, completed });
  }

  /**
   * Todoを削除時に呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.wantodoListModel.deleteWanTodo({ id });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    // add tag form
    const inputTagElement = document.querySelector("#js-form-input-tag");
    const containerElement = document.querySelector("#js-todo-list");
    const wantodoItemCountElement = document.querySelector("#js-todo-count");
    // 2. TodoListModelの状態が更新されたら表示を更新する
    this.wantodoListModel.onChange(() => {
      // TodoリストをまとめるList要素
      const wantodoItems = this.wantodoListModel.getWanTodoItems();
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const wantodoListView = new WanTodoListView();
      // todoItemsに対応するTodoListViewを作成する
      const wantodoListElement = wantodoListView.createElement(wantodoItems, {
        // Todoアイテムが更新イベントが発生したときによばれるリスナー関数
        onUpdateWanTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        // Todoアイテムが削除イベントが発生したときによばれるリスナー関数
        onDeleteWanTodo: ({ id }) => {
          this.handleDelete({ id });
        }
      });
      // containerElementの中身をtodoListElementで上書きする
      render(wantodoListElement, containerElement);
      // アイテム数の表示を更新
      wantodoItemCountElement.textContent = `WanTodo Count: ${this.wantodoListModel.getTotalCount()}`;
    });
    // 3. フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", event => {
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.handleAdd(inputElement.value, inputTagElement.value.split(/,|\s/));
      inputElement.value = "";
      inputTagElement.value = "";
    });
  }
}
