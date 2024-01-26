// ==UserScript==
// @name        Bilibili大航海列表点击跳转
// @namespace   https://space.bilibili.com/35192025
// @version     0.1.0
// @supportURL  https://space.bilibili.com/35192025
// @grant       none
// @author      铂屑
// @license     MIT
// @include     /https?:\/\/live\.bilibili\.com\/(blanc\/)?\d+\??.*/
// @icon        https://www.google.com/s2/favicons?domain=bilibili.com
// @description 为Bilibili直播间的大航海列表添加点击跳转功能
// @require     https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
// ==/UserScript==

(async function () {
    'use strict';

    while ($('#rank-list-ctnr-box .rank-list-cntr .rank-list-box .list div[role="listitem"]').length == 0) {
        console.warn(`找不到大航海元素，等待3秒。`)
        await new Promise((res,) => setTimeout(res, 3000)) // wait 3 seconds
    }

    let userList = $('#rank-list-ctnr-box .rank-list-cntr .rank-list-box .list div[role="listitem"]')
    console.log(userList)
    userList.map(function (num) {
        let userInfo = $(this).children('webcomponent-userinfo').first()
        let userInfoJson = JSON.parse(userInfo?.attr('userinfo'))
        let uid = userInfoJson.uinfo.uid   // 获取uid
        console.log(uid)
        let unameDom = document.querySelectorAll('#rank-list-ctnr-box .rank-list-cntr .rank-list-box .list div[role="listitem"] webcomponent-userinfo')[num].shadowRoot?.querySelector('span.uname')
        console.log(unameDom)

        // 操作内部元素
        unameDom?.addEventListener('click', function () {
            window.open('https://space.bilibili.com/' + uid);
        });
        return this
    })
})().catch(console.warn);