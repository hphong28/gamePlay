import React, { Component } from 'react';
import { connect } from 'react-redux';

// Services and redux action
import { UserAction } from 'actions';
import { ApiService } from 'services';

import ScatterJS from 'scatterjs-core';

import logo from './images/logo.png'
import mail_icon from './images/MAIL.svg'
import medium_icon from './images/MEDIUM.svg'
import telegram_icon from './images/TELEGRAM.svg'

import user_icon from './images/user.png'
import exit_icon from './images/exit.svg'

const { Blockchains } = ScatterJS

export const MAIN_NETWORK = {
	blockchain: Blockchains.EOS,
	protocol: 'https',
	host: 'nodes.get-scatter.com',
	port: 443,
	chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			LoginStatus: false,
			LogoutingStatus: false,
			ScatterName: '',
		}
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.toggleLogOutClick = this.toggleLogOutClick.bind(this);
		this.handleReferral = this.handleReferral.bind(this);
		this.handleRule = this.handleRule.bind(this);
		this.handleHowToPlay = this.handleHowToPlay.bind(this);
	}
	//before render
	componentWillMount() {
		ScatterJS.scatter.connect(ScatterJS.Blockchains.EOS).then(connected => {
			if (connected) {
				window.ScatterJS = null;
			}
			if (ScatterJS.scatter.identity) {
				this.setState({
					LoginStatus: true,
					ScatterName: ScatterJS.scatter.identity.accounts[0].name,
				});
			}
		});
	}
	//after render
	componentDidMount() {
	}


	handleLoginClick() {
		ScatterJS.scatter.connect(ScatterJS.Blockchains.EOS).then(connected => {
			console.log('tam_ connected', connected);
			if (!connected) {
				console.log('tam_ SCATTER NOT Connect')
				alert("Scatter NOT find")
				return
			} else {
				console.log('tam_ SCATTER Connect');
				const win = window
				win.ScatterJS = win.ScatterEOS = win.scatter = undefined
				//connect to scatter
				ScatterJS.scatter.getIdentity({ accounts: [MAIN_NETWORK] }).then(res => {
					console.log('tam_ res', res)
					if (res) {
						this.setState({
							LoginStatus: true,
							ScatterName: ScatterJS.scatter.identity.accounts[0].name,
						});

					}
				});
			}
		})
	}
	handleLogoutClick(){
		ScatterJS.scatter.connect(ScatterJS.Blockchains.EOS).then(connected => {
			if (connected) {
				window.ScatterJS = null;
			}
			ScatterJS.scatter.forgetIdentity();
			this.setState({
				LoginStatus: false,
			});
		});

	}
	toggleLogOutClick(){
		console.log('tam_ togle')
		this.setState({
			LogoutingStatus: !this.state.LogoutingStatus,
		});
	}
	handleReferral(){
		console.log('tam_ handleReferral')

	}
	handleRule(){
		console.log('tam_ handleRule')

	}
	handleHowToPlay(){
		console.log('tam_ handleHowToPlay')

	}
	render() {
		return (
			<div className="navbar">
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
									
									{/* <a className="NameOfUserLogoin" onClick={this.toggleLogOutClick}><img src={user_icon} alt=" " className="user_icon" />{this.state.ScatterName}</a> */}
									<ul>
										<li>
											<img src={user_icon} alt=" " className="user_icon" />
											<a className="NameOfUserLogoin" onClick={this.toggleLogOutClick}>{this.state.ScatterName}</a>
											<img src={exit_icon} alt=" " className="exit_icon" />
										</li>

										<li>
											{this.state.LogoutingStatus?
												<button className="ButtonLogout" onClick={this.handleLogoutClick}>{'LogOut'}</button> : null}
										</li>
									</ul>
								</div>

							</li>
					}

					<li className="Menu"><div href="#" onClick={this.handleReferral}>Referral</div></li>
					<li className="Menu"><a href="#" onClick={this.handleRule}>Rule</a></li>
					<li className="Menu"><a href="#" onClick={this.handleHowToPlay}>How To Play</a></li>

					<li className="icon_wrap">
						<a href="https://mail.google.com/"><img src={mail_icon} alt=" " className="icon" /></a>
						<a href="https://medium.com/"><img src={medium_icon} alt=" " className="icon" /></a>
						<a href="https://telegram.org/"><img src={telegram_icon} alt=" " className="icon" /></a>
					</li>
				</ul>


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
