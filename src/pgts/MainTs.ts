import * as $ from "jquery";
import SyncAccess from "./SyncAccess";
import AsyncCallback from "./AsyncCallback";
import AsyncAsycAwait from "./AsyncAsycAwait";
import AsyncPromise from "./AsyncPromise";
import AsyncRxjs from "./AsyncRxjs";

import * as Rx from 'rxjs';

export default class MainTs {
    private animCache: Rx.Subscription

    public init(): void {
        // let subscri = this.anime();
        this.syncAccess();
        this.asyncCallback();
        this.asyncPromise();
        this.asyncAsycAwait();
        this.asyncRxjs();
        this.stopAndStart();
    }
    /**
     * 同期処理ボタン押下イベント
     */
    protected syncAccess(): void {
        Rx.Observable
            .fromEvent(<HTMLElement>$("#sync")[0], 'click')
            .subscribe((value: UIEvent) => new SyncAccess().action(value, this,"同期処理"));
    }
    /**
     * コールバックでの記述
     */
    protected asyncCallback(): void {
        Rx.Observable
            .fromEvent(<HTMLElement>$("#callback")[0], 'click')
            .subscribe((value: UIEvent) => new AsyncCallback().action(value, this,"コールバック"));
    }
    /**
     * Promiseでの記述
     */
    protected asyncPromise(): void {
        Rx.Observable
            .fromEvent(<HTMLElement>$("#promise")[0], 'click')
            .subscribe((value: UIEvent) => new AsyncPromise().action(value, this,"Promise"));
    }
    /**
     * AsyncAwaitでの記述
     */
    protected asyncAsycAwait(): void {
        Rx.Observable
            .fromEvent(<HTMLElement>$("#async")[0], 'click')
            .subscribe((value: UIEvent) => new AsyncAsycAwait().action(value, this,"async / await"));
    }
   /**
     * Rxjsでの記述
     */
    protected asyncRxjs(): void {
        Rx.Observable
            .fromEvent(<HTMLElement>$("#rxjs")[0], 'click')
            .subscribe((value: UIEvent) => new AsyncRxjs().action(value, this,"ReactiveExtension"));
    }


    public stopAndStart() {
        Rx.Observable
            .fromEvent(<HTMLElement>$("#stop")[0], 'click')
            .subscribe((value: UIEvent) => this.stopAnime());
        // Rx.Observable
        //     .fromEvent(<HTMLElement>$("#start")[0], 'click')
        //     .subscribe((value: UIEvent) => this.anime());
    }

    /**
     * 同期と非同期でのUIの違い確認用
     */
    public anime() {
        if (this.animCache) {
            this.stopAnime();
        }
        this.animCache = Rx.Observable
            .timer(100, 100)
            .subscribe(
            val => { $("#animate").css({ width: `${val * 5}px` }) }
            )
    }
    protected stopAnime() {
        this.animCache.unsubscribe();
        this.animCache.remove(this.animCache)
        $("#animate").css({ width: `0px` })
        $("#message").html("")
    }


}