import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
import BeforeMessage from "./BeforeMessage";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }


/**
 * 
 */
export default class AsyncAsycAwait extends BeforeMessage {
    protected async exec(){
        try {
            // ===================================
            //URLアクセスする一覧を取得
            // ===================================
            let firstResult: [FirstResType] = await $.ajax("http://localhost:3000/urls/")
            // ===================================
            //取得した結果をループし再度アクセスする
            // ===================================
            //
            for (let i = 0; i < firstResult.length; i++) {
                let firstResRec: FirstResType = firstResult[i]
                let secondResult: SecondResType = await $.ajax(`${firstResRec.url}?name=${firstResRec.name}&wait=${firstResRec.wait}`)
                // ===================================
                // 結果を画面に都度表示する
                // ===================================
                //
                $("#message").html($("#message").html() + secondResult.msg + "<BR>")
            }
        } catch (e) {
            // ===================================
            //同期処理のように例外もキャッチ。
            // ===================================
            $("#message").html($("#message").html() + "・通信に失敗しました<BR>")
        }

    }
}