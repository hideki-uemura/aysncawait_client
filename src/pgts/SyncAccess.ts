import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
import BeforeMessage from "./BeforeMessage";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }

/**
 * 同期処理での実装
 */
export default class AsyncPromise extends BeforeMessage {
    protected exec() :void{
        try {
            // ===================================
            //URLアクセスする一覧を取得
            // ===================================
            let firstResult: JQuery.jqXHR = $.ajax({
                url: "http://localhost:3000/urls/",
                async: false
            })
            // ===================================
            //取得した結果をループし再度アクセスする
            // ===================================
            //
            JSON.parse(firstResult.responseText).forEach((firstResRec: FirstResType) => {
                let result: JQuery.jqXHR = $.ajax({
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
            $("#message").html($("#message").html() + "・通信に失敗しました。{4/4_アクセス}<BR>")
        }
    }

}