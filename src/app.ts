import "bootstrap/dist/css/bootstrap.css";
import "./css/style.css";
import "jquery";
import MainTs from './pgts/MainTs';

export class App {
    constructor() {
        console.log("コンストラクタ")
    }
    init() {
        $(document).ready(function () {
            var main = new MainTs();
             main.init();
        })
   }
}
new App().init();