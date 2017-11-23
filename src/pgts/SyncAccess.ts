import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }

/**
 * 同期処理での実装
 */
export default class AsyncPromise {
    public action(val: UIEvent, main: MainTs): void {
       main.anime();
        $("#message").html("2秒後に同期処理開始します。<BR>")
        setTimeout(function () {
            try {
                // ===================================
                //URLアクセスする一覧を取得
                // ===================================
                let firstResult: JQuery.jqXHR = $.ajax({
                    type: 'GET',
                    url: "http://localhost:3000/urls/",
                    async: false
                })
                // ===================================
                //取得した結果をループし再度アクセスする
                // ===================================
                //
                JSON.parse(firstResult.responseText).forEach((firstResRec: FirstResType) => {
    
                    let result: JQuery.jqXHR = $.ajax({
                        type: 'GET',
                        url: `${firstResRec.url}?name=${firstResRec.name}&wait=${firstResRec.wait}`,
                        async: false
                    })
                    // ===================================
                    // 結果を画面に都度表示する
                    // ===================================
                    //
                    let secondResult: SecondResType = JSON.parse(result.responseText)
                    let message: string = secondResult.msg
                    $("#message").html($("#message").html() + message + "<BR>")
                }
                );
            } catch (e) {
                // ===================================
                //同期処理の為例外もキャッチ。
                // ===================================
                $("#message").html($("#message").html() + "・通信に失敗しました<BR>")
            }
        }, 2000)
    }
}