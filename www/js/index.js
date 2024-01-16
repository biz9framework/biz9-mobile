/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    alert('b1');
    const {store, ProductType, Platform} = CdvPurchase;
    alert('b2');
     refreshUI();
}


function finishPurchase(p) {
    alert('finishPurchase');
}

function refreshUI() {

    alert('a3');
    const {store, ProductType, Platform} = CdvPurchase;
    alert('a4');
    myProduct = store.get('my_product', Platform.TEST);
    alert('a5');
    //const myTransaction = store.findInLocalReceipts(myProduct);
    alert('a6');
    const button = `<button onclick="myProduct.getOffer().order()">Purchase</button>`;
    alert(button);
    alert(myProduct.title);
    alert(myProduct.description);
    alert(myProduct.pricing.price);
    alert('a7');
}

