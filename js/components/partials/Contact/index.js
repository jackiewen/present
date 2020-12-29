import React from 'react';

export default function Contact() {
    return (
        <div className="callout callout-orangered">
            <div className="row">
                <div className="col-md-6 pr-md-5 pb-5 pb-md-0">
                    <h5>頭脳網とは</h5>
                    <div>業界・業種を超えた財界VIP17,000名の経験・叡智をフル活用するためのプラットフォームです。気になる顧問には、「問い合わせる」から連絡し、短期・中期的に様々な方法で貴社の業務をサポートしてもらうことができます。</div>
                </div>
                <div className="col-md-6">
                    <h5>お問い合わせ</h5>
                    <div>下記電話番号、またはメールアドレスにご連絡ください</div>
                    <ul className="contact">
                        <li className="phone">電話番号：0123-456-789</li>
                        <li className="mail">メールアドレス：zunoumou@race.co.jp</li>
                    </ul>
                </div>
            </div>
        </div>
    );

}