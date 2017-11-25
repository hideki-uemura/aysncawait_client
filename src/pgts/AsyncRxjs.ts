import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }


/**
 * 
 */
export default class AsyncRxjs {
    public action(val: UIEvent, main: MainTs): void {
        main.anime();
        $("#message").html("2秒後にReactiveEx開始します。<BR>")
        setTimeout(async function () {

            try {
                // ======================================================================
                //最初にアクセスします
                // ======================================================================
                Rx.Observable.ajax("http://localhost:3000/urls/")
                    // ======================================================================
                    //JSONデータのレスポンスの配列を受け取る
                    // ======================================================================
                    .flatMap(res => res.response)
                    // ======================================================================
                    //　concatMapはPromise受け取った場合直列に実行します
                    // ======================================================================
                    .concatMap((res: FirstResType) => { return Rx.Observable.ajax(`${res.url}?name=${res.name}&wait=${res.wait}`) })
                    // ======================================================================
                    //　順次直列実行されたものを表示する。
                    // ======================================================================
                    .subscribe(
                    (response) => { $("#message").html($("#message").html() + response.response.msg + "<BR>") },
                    (err) => { $("#message").html($("#message").html() + "エラーがはっせいしました" + "<BR>") },
                )
            } catch (e) {
                alert("非同期なのでさきにおわってるからこない" + e)
            }
        }, 2000)
    }
}

