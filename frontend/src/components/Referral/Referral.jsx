// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Referral extends Component {

    render() {
        return (
            <div className="ReferralWrap">
                <div className="ReferralCss">
                    <div>
                        <button className="CloseButtonReferral" onClick={this.props.onCloseReferral}> X </button>
                    </div>
                    <div className="HeaderReferral">
                        Invite friend for Rewards!
                </div>
                    {console.log('tam_ Referral props rec', this.props)}

                    <div className="WrapLinkRefferal">
                        <input className="InputRefferal" value={`https://1play.io/#ref=` + this.props.NameScat} />
                        <button className="CopyButton"> COPY </button>
                    </div>

                    <div className="DetailReferral">
                        Refer a friend and earn 10% of house edge on all their wagers!<br />
                        Referral bonus is not paid if a wagers is refunded.
                </div>

                    <div className="SloganReferral">
                        Earn more money with OnePlay!
                </div>

                    <div className="WrapTotalReferral">
                        <p className="TextTotal">Total: <p className="ValueTotal"> 1000 refferal</p> </p>
                        <p className="TextTotalEarn">Total earn: <p className="ValueTotalEarn"> 1000 EOS</p> </p>
                    </div>

                    <div className="WrapTableReferral">
                        <table className="TableReferral">
                            <thead>
                                <tr>
                                    <td>Account</td>
                                    <td>Earn</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.ReferralEarn?this.props.ReferralEarn.map(data => {
                                    console.log('tam_ data in map', data)
                                    return (
                                        <tr>
                                            <td>{data.bettor}</td>
                                            <td>{data.bet_total}</td>
                                        </tr>
                                    );
                                }): null}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(Referral);