import * as Rx from 'rxjs';
import * as $ from "jquery";
import MainTs from "./MainTs";
import BeforeMessage from "./BeforeMessage";
declare type FirstResType = { name: string, url: string, wait: number }
declare type SecondResType = { result: string, msg: string }

/**
 * 非同期アクセスPromiseで。
 */
export default class AsyncPromise extends BeforeMessage {
    protected exec() :void{
        try {
            // ===================================
            //URLアクセスする一覧を取得
            // ===================================
            $.ajax("http://localhost:3000/urls/")
                // ===================================
                // 結果のJSON文字列をN件のFunction<Promise>配列に変換する。
                // ===================================
            .then((firstResultAry: [FirstResType]) => {
                // ===================================
                //firstResultAryの結果が【N】件なので、ループしながら
                // map/Reduceして【N】件のPromiseチェーンを作成。
                //URLの一覧をMap処理でAjaxアクセスのPromiseを含むFunctionに変換
                // ===================================
                let firstResultAryConvert: Array<Function> = firstResultAry
                    .map((element: FirstResType) => {
                        let returnValue: Function = function () {
                            let def = $.Deferred();
                            $.ajax(
                                {
                                    url: `${element.url}?name=${element.name}&wait=${element.wait}`,
                                    success: function (res) {
                                        // ===================================
                                        // 結果を画面に都度表示する
                                        // ===================================
                                        $("#message").html($("#message").html() + res.msg + "<BR>")
                                        def.resolve()
                                    },
                                    error: (res) => {
                                        let msg = "・通信に失敗しました<BR>";
                                        $("#message").html($("#message").html() + msg)
                                        def.reject()
                                    }
                                }
                            )
                            return def.promise()
                        }
                        return returnValue;
                    })
                return $.Deferred().resolve(firstResultAryConvert)//下のthneに繋がなくてここでreduceしてもOK
            })
            // ===================================
            // Function<Promise>配列をreduce処理してPromiseCHainを作って実行
            // ===================================
            .then((firstResultAryConvert: [Function]) => {
                // ===================================
                //reduceにてPromiseを含むFunction配列を
                //Promiseチェーンを作成する。
                // ===================================
                firstResultAryConvert.reduce((preProc: any, curenProc:Function, index: number) => {
                    return index === 1 ? preProc().then(curenProc) : preProc.then(curenProc)
                })
            })


        } catch (e) {
            alert("非同期処理なので通信失敗ではこのキャッチは先に終わってしまっているので意味ない")
        }
    }
}