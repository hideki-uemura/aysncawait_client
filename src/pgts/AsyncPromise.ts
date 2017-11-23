import * as Rx from 'rxjs';
import * as $ from "jquery";
import * as JQuery from "jquery";
import MainTs from "./MainTs";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }

/**
 * 非同期アクセスPromiseで。
 */
export default class AsyncPromise {
    public async action(val: UIEvent, main: MainTs): Promise<void> {
        main.anime();
        $("#message").html("2秒後にPromiseでの非同期処理開始します。<BR>")
        setTimeout(function () {
            try {
                // ===================================
                //URLアクセスする一覧を取得
                // ===================================
                $.ajax({
                    type: 'GET',
                    url: "http://localhost:3000/urls/",
                    async: true
                }).then((firstResult => {
                    let firstResultAry: [FirstResType] = firstResult;
                    // ===================================
                    //firstResultAryの結果が【N】件なのでループしながら
                    // map/Reduceして【N】件のPromiseチェーンを作成
                    // ===================================
                    let initDef = $.Deferred();
                    let initProc = initDef.promise();
                    // ===================================
                    //URLの一覧をMap処理でAjaxアクセスのPromiseを含むFunctionに変換
                    // ===================================
                    firstResultAry
                        .map((element: FirstResType) => {
                            return function (str: string) {
                                let def = $.Deferred();
                                $.ajax(
                                    {
                                        type: 'GET',
                                        url: `${element.url}?name=${element.name}&wait=${element.wait}`,
                                        async: true,
                                        success: function (res) {
                                            // ===================================
                                            // 結果を画面に都度表示する
                                            // ===================================
                                            let message: string = res.msg
                                            $("#message").html($("#message").html() + message + "<BR>")
                                            def.resolve(message)
                                        },
                                        error: (res) => {
                                            let msg = "・通信に失敗しました<BR>";
                                            $("#message").html($("#message").html() + msg)
                                            def.reject(msg)
                                        }
                                    }
                                )
                                return def.promise()
                            }
                        })
                        // ===================================
                        //reduceにてPromiseを含むFunction配列を
                        //Promiseチェーンを作成する。
                        // ===================================
                        .reduce((preProc: any, curenProc, index: number, ary) => {
                            return index === 1 ? preProc().then(curenProc) : preProc.then(curenProc)
                        })
                }))
            } catch (e) {
                alert("非同期処理なので通信失敗ではこのキャッチは先に終わってしまっているので意味ない")
            }
        }, 2000)
    }
}