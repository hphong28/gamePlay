import React, { Component } from 'react';
import { connect } from 'react-redux';

// Services and redux action
import { UserAction } from 'actions';
import { ApiService } from 'services';


import { Referral, HowToPlay, GiftDaily } from 'components';

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
			GiftDailyStatus: false,

		}
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.toggleLogOutClick = this.toggleLogOutClick.bind(this);
		this.handleReferral = this.handleReferral.bind(this);
		this.handleHowToPlay = this.handleHowToPlay.bind(this);
		this.handleGiftDaily = this.handleGiftDaily.bind(this);

		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.clickOutsideLogoutButton = this.clickOutsideLogoutButton.bind(this);
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
		document.addEventListener('click', this.clickOutsideLogoutButton);

		// ApiService.GetAccountDetail("dicedice1234");
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.clickOutside);
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
		this.setState({
			LogoutingStatus: !this.state.LogoutingStatus,
		});
	}
	handleReferral() {
		console.log('tam_ handleReferral')
		this.setState({
			ReferralStatus: !this.state.ReferralStatus,
			HowToPlayStatus: false,
			GiftDailyStatus: false,
		});

	}

	handleHowToPlay() {
		console.log('tam_ handleHowToPlay')
		this.setState({
			HowToPlayStatus: !this.state.HowToPlayStatus,
			ReferralStatus: false,
			GiftDailyStatus: false,
		});
	}
	handleGiftDaily() {
		console.log('tam_ handleGiftDaily')
		this.setState({
			GiftDailyStatus: !this.state.GiftDailyStatus,
			ReferralStatus: false,
			HowToPlayStatus: false,
		});
	}
	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	clickOutsideLogoutButton(event) {
		console.log('tam_ clickOutsideLogoutButton');
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {

			if (this.state.LogoutingStatus) {
				this.toggleLogOutClick();
			}
		}
	}

	closePopUp() {
		console.log('tam_ close pop up');
		this.setState({
			HowToPlayStatus: false,
			ReferralStatus: false,
			GiftDailyStatus: false,
		});

	}


	render() {
		return (
			<div >
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

								<li className="Logout_wrap" ref={this.setWrapperRef} >
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


						<li className="icon_wrap"><div className="div_icon"><a href="https://mail.google.com/"><img src={mail_icon} alt=" " className="icon" /></a></div></li>
						<li className="icon_wrap"><div className="div_icon"><a href="https://medium.com/"><img src={medium_icon} alt=" " className="icon" /></a></div></li>
						<li className="icon_wrap"><div className="div_icon"><a href="https://telegram.org/"><img src={telegram_icon} alt=" " className="icon" /></a></div></li>
						<li className="icon_wrap"><div className="div_gift_icon"><a href="#"><img src={gift_icon} alt=" " className="gift_icon" onClick={this.handleGiftDaily} /></a></div></li>

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
				{
					this.state.GiftDailyStatus ?
						<div className='PopUp_Wrap'>
							<GiftDaily onGiftDaily={this.closePopUp.bind(this)} />
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
