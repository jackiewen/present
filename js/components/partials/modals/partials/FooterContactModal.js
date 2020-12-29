import React from 'react';

export default function FooterContactModal(props) {
    return (
        <div className="row justify-content-center pt-3 pb-2">
            {!props.isSubmited && <div className="col-sm-3">&nbsp;</div>}
            
            <div className={props.isSubmited ? "col-sm-8" : "col-sm-9"}>
                <p className="lead">運営へのお問い合わせ</p>
                <p className="info-box bg-light">下記電話番号、またはメールアドレスにご連絡ください<br/>電話番号：0123-456-789<br/>メールアドレス：zunoumou@race.co.jp</p>
            </div>
        </div>
    );

}