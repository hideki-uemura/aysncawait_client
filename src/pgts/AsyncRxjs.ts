import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
import BeforeMessage from "./BeforeMessage";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }


/**
 * RxJS実装
 */
export default class AsyncRxjs extends BeforeMessage {
    protected exec() :void{
        try {
            Rx.Observable
                // ======================================================================
                //最初にアクセスします
                // ======================================================================
                .ajax("http://localhost:3000/urls/")
                // ======================================================================
                //JSONデータのレスポンスを受け取って配列化
                // ======================================================================
                .flatMap(res => res.response)
                // ======================================================================
                //　concatMapはPromise受け取った場合直列に変換実行します
                // ======================================================================
                .concatMap((res: FirstResType) => Rx.Observable.ajax(`${res.url}?name=${res.name}&wait=${res.wait}`))
                // ======================================================================
                //　順次直列実行されたものを表示する。
                // ======================================================================
                .subscribe(
                    (response => $("#message").html($("#message").html() + response.response.msg + "<BR>")),
                    (err => $("#message").html($("#message").html() + "・通信に失敗しました<BR>" + "<BR>")),
            )
        } catch (e) {
            alert("非同期なのでさきにおわってるからこない" + e)
        }
    }
}

