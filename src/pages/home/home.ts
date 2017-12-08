import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { TodoProvider } from "../../providers/todo/todo";
import { ArchivedTodosPage } from "../archived-todos/archived-todos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;

  constructor(private toastController: ToastController, private todoProvider: TodoProvider, public navCtrl: NavController, private alertCtrl: AlertController) {
    this.todos = this.todoProvider.getTodos();
  }

  archiveTodo(todoIndex) {
    this.todoProvider.archiveTodo(todoIndex);
  }

  goToArchivedPage() {
    this.navCtrl.push(ArchivedTodosPage);
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.todos, $event);
  }

  editTodo(todoIndex) {
    let editTodoAlert = this.alertCtrl.create({
      title: "Edit a Todo",
      message: "Edit your Todo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoProvider.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(() => {
              let editTodoToast = this.toastController.create({
                message: "Todo Edited",
                duration: 2000
              });
              editTodoToast.present();
            });
          }
        }
      ]
    });
    editTodoAlert.present();
  }

  openTodoAlert() {
    let addTodoAlert = this.alertCtrl.create({
      title: "Add a Todo",
      message: "Enter your Todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000
              });
              addTodoToast.present();
            });
          }
        }
      ]
    });
    addTodoAlert.present();
  }
  
}
