import React from 'react';

export default function CompleteMessageUser(props) {
    return (
        <React.Fragment>
            <h2 className="text-center"><i className="fa fa-check-circle check-success-icon"/> 送信完了</h2>
            <div className="row justify-content-center pt-3 pb-2">
                <div className="col-md-8">
                    <p>お問い合わせありがとうございます。</p>
                    <p>またこちらから折り返しご連絡致します。折り返しのご連絡には、最長５営業日頂いております。</p>
                </div>
            </div>
            <div className="w-100 text-center">
                <button type="button" className="btn btn-secondary" onClick={props.handleClickClose} >タブを閉じる</button>
            </div>
        </React.Fragment>
    );
}
