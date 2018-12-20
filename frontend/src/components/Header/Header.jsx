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
		}
		this.handleLoginClick = this.handleLoginClick.bind(this);
		// this.handleReferral = this.handleReferral.bind(this);
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
				});
			}
		});
	}
	//after render
	componentDidMount() {
	}


	handleLoginClick(e) {
		const { Login } = this.props;
		Login();
		if (this.state.LoginStatus) {
			ScatterJS.scatter.connect(ScatterJS.Blockchains.EOS).then(connected => {
				if (connected) {
					window.ScatterJS = null;
				}
				ScatterJS.scatter.forgetIdentity();
				this.setState({
					LoginStatus: false,
				});
			});

		} else {
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
							});

						}
					});
				}
			})

			const win = window
			win.ScatterJS = win.ScatterEOS = win.scatter = undefined

		}

	}
	// handleReferral(e) {
	// this.props.handleReferralAction(e);
	// }
	render() {
		return (
			<div className="navbar">
				<ul className="nav">
					<li><a href="https://www.google.com/"><img src={logo} alt=" " className="logo" /></a></li>

					<li className="Login_wrap">
						<div>
							<a className={`${this.state.LoginStatus?'':'NameOfUserLogin'}`}>{'haong ngoc tam'}</a>
							{/* <ul>
								<li>
									<button className="ButtonCss" onClick={this.handleLoginClick}>{this.state.LoginStatus ? 'LogOut' : 'LogIn'}</button>
								</li>
							</ul> */}
						</div>
					</li>


					<li className="Menu"><div href="#" onClick={this.props.handleReferral}>Referral</div></li>
					<li className="Menu"><a href="#" >Rule</a></li>
					<li className="Menu"><a href="#" onClick={this.props.handleHowToPlay}>How To Play</a></li>

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
