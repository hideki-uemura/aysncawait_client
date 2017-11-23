import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }

/**
 * コールバックでの実装
 */
export default class AsyncCallback {
    public async action(val: UIEvent, main: MainTs): Promise<void> {
        main.anime();
        $("#message").html("2秒後にコールバックでの非同期処理開始します。<BR>")
        setTimeout(function () {
            try {
                // ===================================
                //URLアクセスする一覧を取得
                // ===================================
                let urls: JQuery.jqXHR = $.ajax({
                    type: 'GET',
                    url: "http://localhost:3000/urls/",
                    async: true,
                    success: function (res) {
                        let requestList: [FirstResType] = JSON.parse(urls.responseText);
                        // ======================================================================
                        //サクセスコールバックより再帰的に呼び出されるAjaxアクセスFunction
                        // ======================================================================
                        let ajaxRecursion = function (index: number) {
                            let url = requestList[index].url;
                            let name = requestList[index].name;
                            let wait = requestList[index].wait;
                            $.ajax({
                                type: 'GET',
                                url: `${url}?name=${name}&wait=${wait}`,
                                async: true,
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
                                        ajaxRecursion(nextIdx)
                                    }
                                },
                                error: (res) => {
                                    // ===================================
                                    // 失敗時も成功時と同じように画面描画後再帰
                                    // ===================================
                                    let msg = "・通信に失敗しました<BR>";
                                    $("#message").html($("#message").html() + msg)
                                    let nextIdx = index + 1;
                                    if (nextIdx < requestList.length) {
                                        ajaxRecursion(nextIdx)
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

        },2000)
    }
}