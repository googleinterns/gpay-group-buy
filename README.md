# ![GPay Group Buy](docs/assets/brand.png)

## Background

Gpay GroupBuy is a [Spot](https://developers.google.com/pay/spot) microapp where
customers can buy products at a cheaper price if enough people are committed to buying.
It targets businesses who wish to offer group deals with the confidence that a target
number of customers would be committed to buying the products.

A Spot microapp is a webapp that will be embedded as a WebView in the GPay mobile app,
and hence is developed fully with a webdev stack.

The project consists of 2 parts:

| App                    | Description                                                              |
|------------------------|--------------------------------------------------------------------------|
| Customer Spot Microapp | Customers can explore listings, commit to listings and pay for listings. |
| Merchant Web App       | Merchants can create listings and manage listings.                        |


## Folder Structure

For more details, check out the more detailed README in the respective folders:

| Folder             | Description           |
|--------------------|-----------------------|
| [/web](/web)       | Client-side codebase. |
| [/server](/server) | Server-side codebase. |

## Source Code Headers

Every file containing source code must include copyright and license
information. This includes any JS/CSS files that you might be serving out to
browsers. (This is to help well-intentioned people avoid accidental copying that
doesn't comply with the license.)

Apache header:

    Copyright 2020 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

## Useful Links

- One-Pager Writeup: [go/gpay-group-buy](http://go/gpay-group-buy)
- UI Mock: [go/gpay-group-buy-ui](http://go/gpay-group-buy-ui)
- Design Doc: [go/gpay-group-buy-design-doc](http://go/gpay-group-buy-design-doc)
- Demo Slides: [go/gpay-group-buy-slides](http://go/gpay-group-buy-slides)
