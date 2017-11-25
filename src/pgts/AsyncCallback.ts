import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
import BeforeMessage from "./BeforeMessage";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }

/**
 * コールバックでの実装
 */
export default class AsyncCallback extends BeforeMessage {
    protected  exec() :void{
        try {
            // ===================================
            //URLアクセスする一覧を取得
            // ===================================
            let urls: JQuery.jqXHR = $.ajax({
                url: "http://localhost:3000/urls/",
                success: function (res) {``
                    let requestList: [FirstResType] = JSON.parse(urls.responseText);
                    // ======================================================================
                    //サクセスコールバックより再帰的に呼び出されるAjaxアクセスFunction
                    // ======================================================================
                    let ajaxRecursion = function (index: number) {
                        let url = requestList[index].url;
                        let name = requestList[index].name;
                        let wait = requestList[index].wait;
                        $.ajax({
                            url: `${url}?name=${name}&wait=${wait}`,
                            success: function (result2: SecondResType) {
                                // ===================================
                                // 結果を画面に都度表示する
                                // ===================================
                                let message: string = result2.msg
                                $("#message").html($("#message").html() + message + "<BR>")
                                let nextIdx = index + 1;
                                // ===================================
                                // N回アクセスが終了するまで再帰Ajaxアクセス呼び出し
                                // ===================================
                                if (nextIdx < requestList.length) {
                                    ajaxRecursion(nextIdx)　　  // *********** ここで再帰呼出し ****************
                                }
                            },
                            error: (res) => {
                                // ===================================
                                // 失敗時も成功時と同じように画面描画後再帰
                                // ===================================
                                let msg = "・通信に失敗しました。{4/4_アクセス}<BR>";
                                $("#message").html($("#message").html() + msg)
                                let nextIdx = index + 1;
                                if (nextIdx < requestList.length) {
                                    ajaxRecursion(nextIdx)    // *********** ここで再帰呼出し ****************
                                }
                            }
                        })
                    }
                    // ===================================
                    // 最初の呼び出し
                    // ===================================
                    ajaxRecursion(0)
                }
            })
        } catch (e) {
            alert("非同期処理なので通信失敗ではこのキャッチは先に終わってしまっているので意味ない")
        }
    }
}