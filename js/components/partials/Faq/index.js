import React from 'react';
import './faq.css';

class Faq extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-3">
                            <div className="card">
                                <div className="card-body">
                                    <section className="accordion-section clearfix mt-3"
                                             aria-label="Question Accordions">
                                        <div className="panel-group" id="accordion" role="tablist"
                                             aria-multiselectable="true">
                                            <div className="panel panel-default">
                                                <div className="panel-heading p-3 mb-3" role="tab" id="heading0">
                                                    <h3 className="panel-title">
                                                        <a className="collapsed" role="button" title=""
                                                           data-toggle="collapse" data-parent="#accordion"
                                                           href="#collapse0" aria-expanded="true"
                                                           aria-controls="collapse0">
                                                            利用の流れを教えてください
                                                        </a>
                                                    </h3>
                                                </div>
                                                <div id="collapse0" className="panel-collapse collapse" role="tabpanel"
                                                     aria-labelledby="heading0">
                                                    <div className="panel-body px-3 mb-4">
                                                        <p>
                                                            顧問検索→気になった顧問に問い合わせ→方向性や関わり方の事前すり合わせ→正式に顧問依頼→ミーティング等、業務実施
                                                            という流れになっております。<br/>
                                                            顧問検索で理想の顧問を見つけられなかった場合には、私たちが顧問の選定をサポートすることもあります。
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="panel panel-default">
                                                <div className="panel-heading p-3 mb-3" role="tab" id="heading1">
                                                    <h3 className="panel-title">
                                                        <a className="collapsed" role="button" title=""
                                                           data-toggle="collapse" data-parent="#accordion"
                                                           href="#collapse1" aria-expanded="true"
                                                           aria-controls="collapse1">
                                                            活用事例を教えてください
                                                        </a>
                                                    </h3>
                                                </div>
                                                <div id="collapse1" className="panel-collapse collapse" role="tabpanel"
                                                     aria-labelledby="heading1">
                                                    <div className="panel-body px-3 mb-4">
                                                        <p>過去には、</p>
                                                        <ul style={ {listStyleType: 'circle'}}>
                                                            <li>大手生活用品メーカーが美容機器を販売するにあたり、化粧品メーカーの元本部長に美容品業界でのブランディングについてのアドバイスをもらう。</li>
                                                            <li>
                                                                大手Itサービスの会社が、伸び悩む市場において、ポテンシャル顧客である会社に関する情報を得るために、元取締役や元執行役員にインタビューを行う
                                                                などの活用事例があります。頭脳網に揃っている人材の資源は、あらゆる場面で活用して頂けます。
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="panel panel-default">
                                                <div className="panel-heading p-3 mb-3" role="tab" id="heading2">
                                                    <h3 className="panel-title">
                                                        <a className="collapsed" role="button" title=""
                                                           data-toggle="collapse" data-parent="#accordion"
                                                           href="#collapse2" aria-expanded="true"
                                                           aria-controls="collapse2">
                                                            具体的にどのように顧問にサポートしてもらえるのですか？
                                                        </a>
                                                    </h3>
                                                </div>
                                                <div id="collapse2" className="panel-collapse collapse" role="tabpanel"
                                                     aria-labelledby="heading2">
                                                    <div className="panel-body px-3 mb-4">
                                                        <p>
                                                            顧問の案件への関わり方は様々です。１時間の電話１回のみで終わる場合もありますが、数ヶ月間チームに１メンバーとして加わる場合もあります。<br/>
                                                            正式な依頼の前に、どのような関わり方を期待しているのか、顧問と確認するようにしてください。
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div className="callout callout-orangered">
                                <div className="row">
                                    <div className="col-md-6 pr-md-5 pb-5 pb-md-0">
                                        <h5>頭脳網とは</h5>
                                        <div>
                                            業界・業種を超えた財界VIP17,000名の経験・叡智をフル活用するためのプラットフォームです。気になる顧問には、「問い合わせる」から連絡し、短期・中期的に様々な方法で貴社の業務をサポートしてもらうことができます。
                                        </div>
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
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Faq;
