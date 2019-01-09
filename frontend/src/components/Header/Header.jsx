import React, { Component } from 'react';
import { connect } from 'react-redux';

// Services and redux action
import { UserAction } from 'actions';
import { ApiService } from 'services';


import { Referral, HowToPlay } from 'components';

import logo from './images/logo.png'
import mail_icon from './images/MAIL.svg'
import medium_icon from './images/MEDIUM.svg'
import telegram_icon from './images/TELEGRAM.svg'

import user_icon from './images/user.png'
import exit_icon from './images/exit.svg'
import gift_icon from './images/gift.svg'


class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			LoginStatus: false,
			LogoutingStatus: false,
			ScatterName: '',
			ReferralStatus: false,
			ReferralData: [],
			HowToPlayStatus: false,

		}
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.toggleLogOutClick = this.toggleLogOutClick.bind(this);
		this.handleReferral = this.handleReferral.bind(this);
		this.handleHowToPlay = this.handleHowToPlay.bind(this);

		this.handleOutsideClick = this.handleOutsideClick.bind(this);
	}
	//before render
	componentWillMount() {
		ApiService.hasIdentity().then(rsp => {
			if (rsp) {
				this.setState({
					LoginStatus: true,
					ScatterName: rsp.accounts[0].name,
				});
				ApiService.GetRefferal(this.state.ScatterName, 10).then(RawData => {
					this.state.ReferralData = RawData;

				})
			}
		});

	}
	//after render
	componentDidMount() {
		console.log('tam_ start to call');

		// ApiService.GetAccountDetail("dicedice1234");
	}


	handleLoginClick() {
		ApiService.LoginScatter().then(accounts => {
			if (accounts) {
				console.log("quoc123", accounts)
				this.setState({
					LoginStatus: true,
					ScatterName: accounts[0].name,
					LogoutingStatus: false,
				});
				ApiService.GetRefferal(this.state.ScatterName, 10).then(RawData => {
					console.log('tam_ my p ', RawData)

					this.state.ReferralData = RawData;

				})
			}
		});

	}
	handleLogoutClick() {
		ApiService.LogOutScatter().then(resp => {
			if (resp) {
				this.setState({
					LoginStatus: false,
					ScatterName: '',
				});
				this.state.ReferralData = null;
			}
		});

	}
	toggleLogOutClick() {
		console.log('tam_ togle')
		if (!this.state.LogoutingStatus) {
			document.addEventListener('click', this.handleOutsideClick, false);
		} else {
			document.removeEventListener('click', this.handleOutsideClick, false);
		}

		this.setState({
			LogoutingStatus: !this.state.LogoutingStatus,
		});
	}
	handleReferral() {
		console.log('tam_ handleReferral')
		this.setState({
			ReferralStatus: !this.state.ReferralStatus,
			HowToPlayStatus: false,
		});

	}

	handleHowToPlay() {
		console.log('tam_ handleHowToPlay')
		console.log('tam_ handleReferral')
		this.setState({
			HowToPlayStatus: !this.state.HowToPlayStatus,
			ReferralStatus: false,
		});
	}

	handleOutsideClick(e) {
		console.log("'tam_ test click");
		if (this.node.contains(e.target))
			return;

		this.toggleLogOutClick();
	}

	closePopUp() {
		console.log('tam_ close pop up');
		this.setState({
			HowToPlayStatus: false,
			ReferralStatus: false,
		});

	}


	render() {
		return (
			<div ref={node => { this.node = node; }} >
				<div className="navbar" >
					<ul className="nav">
						<li><img src={logo} alt=" " className="logo" /><a href="https://www.google.com/"></a></li>

						{
							(!this.state.LoginStatus) ?

								< li className="Login_wrap">
									<div>
										<ul>
											<li>
												<button className="ButtonLogin" onClick={this.handleLoginClick}>{'LogIn'}</button>
											</li>
										</ul>
									</div>
								</li> :

								<li className="Logout_wrap">
									<div>
										<ul>
											<li>
												<img src={user_icon} alt=" " className="user_icon" />
												<a className="NameOfUserLogoin" onClick={this.toggleLogOutClick}>{this.state.ScatterName}</a>
												<img src={exit_icon} alt=" " className="exit_icon" />
											</li>

											<li>
												{this.state.LogoutingStatus ?
													<button className="ButtonLogout" onClick={this.handleLogoutClick}>{'LogOut'}</button> : null}
											</li>
										</ul>
									</div>

								</li>
						}

						<li className="Menu"><a href="#" onClick={this.handleReferral}>Referral</a></li>
						<li className="Menu"><a href="#" onClick={this.handleHowToPlay}>How To Play</a></li>

						<li className="icon_wrap">
							<a href="#"><img src={gift_icon} alt=" " className="gift_icon" /></a>
							<div><a href="https://mail.google.com/"><img src={mail_icon} alt=" " className="icon" /></a></div>
							<div><a href="https://medium.com/"><img src={medium_icon} alt=" " className="icon" /></a></div>
							<div><a href="https://telegram.org/"><img src={telegram_icon} alt=" " className="icon" /></a></div>
						</li>

					</ul>
				</div>
				{
					this.state.ReferralStatus ?
						<div className='PopUp_Wrap'>
							<Referral onCloseReferral={this.closePopUp.bind(this)} NameScat={this.state.ScatterName} ReferralEarn={this.state.ReferralData} />
						</div>

						: null
				}
				{
					this.state.HowToPlayStatus ?
						<div className='PopUp_Wrap'>
							<HowToPlay onCloseHowToPlay={this.closePopUp.bind(this)} />
						</div>

						: null

				}



			</div>
		);
	}
}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
	Login: UserAction.Login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
