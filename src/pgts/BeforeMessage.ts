import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }


/**
 * RxJS実装
 */
export default abstract class BeforeMessage {
    public action(val: UIEvent, main: MainTs,msg:string): void {
        main.anime();
        $("#message").html(`2秒後に${msg}開始します。<BR>`)
        setTimeout(this.exec, 2000)
    }
    protected abstract exec():void;

}
    