import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }


/**
 * 
 */
export default class AsyncAsycAwait {
    public  action(val: UIEvent, main: MainTs): void {
        main.anime();
        $("#message").html("2秒後にAsyncAwait開始します。<BR>")
        setTimeout(async function () {
            try {
                // ===================================
                //URLアクセスする一覧を取得
                // ===================================
                let firstResult: [FirstResType] = await $.ajax({
                    type: 'GET',
                    url: "http://localhost:3000/urls/",
                    async: true
                })
                // ===================================
                //取得した結果をループし再度アクセスする
                // ===================================
                //
                for (let i = 0; i < firstResult.length; i++) {
                    let firstResRec: FirstResType = firstResult[i]
                    let secondResult: SecondResType = await $.ajax({
                        type: 'GET',
                        url: `${firstResRec.url}?name=${firstResRec.name}&wait=${firstResRec.wait}`,
                        async: true
                    })
                    // ===================================
                    // 結果を画面に都度表示する
                    // ===================================
                    //
                    let message: string = secondResult.msg
                    $("#message").html($("#message").html() + message + "<BR>")
                }
            } catch (e) {
                // ===================================
                //同期処理のように例外もキャッチ。
                // ===================================
                $("#message").html($("#message").html() + "・通信に失敗しました<BR>")
            }

        }, 2000)

    }
}