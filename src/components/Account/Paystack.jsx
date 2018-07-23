import React from 'react';
import PaystackInline from './PaystackInline/PaystackInline';

class Paystack extends React.Component {
    
    constructor(){
        super();
        this.state = {
            amount: 100000,
            selectedPlan: "PLN_zmblradumh1jl8a",
            description: "Launcher Basic N1000/Month",
        };
    }
    
    onToken = (token) => {
        console.log(token);
        /*this.fetch('/save-stripe-token', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(token => {
            alert(`We are in business, ${token.email}`);
        });*/
    }
    
    handlePlanChange = (evt) => {
        var data = evt.currentTarget.dataset;
        this.setState({
          selectedPlan: evt.currentTarget.value,
          amount: data.amount,
          description: data.description,
        })
    };
    
    processForm(evt){
        evt.preventDefault();
    }
    
    render() {
        
        var user = this.props.user;
        var paystackKey = this.props.app_setting.paystackKey;
      
      return (
        <div>
            <div className="white panel">
                <div className="row">
                    <div className="column">
                       <h3>Your Subscription Plan</h3>
                    </div>
                </div>
                { this.props.switch ?
                <div className="row">
                    <div className="lead">
                    When changing plans, the time remaining on the current billing period will be prorated. 
                    </div>
                </div>
                :
                ""
                }
                <div className="row upspace">
                    <div className="column">
                       <form className="plan" onSubmit={this.processForm} id="pay">
                           <div className="row">
                               <input type="radio" onChange={this.handlePlanChange} data-amount="100000" data-description="Launcher Basic N1000/Month" value="PLN_zmblradumh1jl8a" name="plan" checked={this.state.selectedPlan==='PLN_zmblradumh1jl8a'}/> <label>Launcher Basic N1,000/Month</label>
                           </div>
                           <div className="row">
                               <input type="radio" onChange={this.handlePlanChange} data-amount="300000" data-description="Launcher Business N3000/Month" value="PLN_kvrh4ycyawuebnk" name="plan" checked={this.state.selectedPlan==='PLN_kvrh4ycyawuebnk'}/> <label>Launcher Business N3,000/Month</label>
                           </div>
                           <div className="row">
                               <input type="radio" onChange={this.handlePlanChange} data-amount="800000" data-description="Launcher Basic N8000/Year" value="PLN_d6knnwhohhou9xf" name="plan" checked={this.state.selectedPlan==='PLN_d6knnwhohhou9xf'}/> <label>Launcher Basic (<em>N8,000 / Year - Save 4,000 Per Year!</em>)</label>
                           </div>
                           <div className="row">
                               <input type="radio" onChange={this.handlePlanChange} data-amount="2500000" data-description="Launcher Business N16000/Year" value="PLN_yifjkpj2aaiug6y" name="plan" checked={this.state.selectedPlan==='PLN_yifjkpj2aaiug6y'}/> <label>Launcher Business (<em>N25,000 / Year - Save N11,000 Per Year!</em>)</label>
                           </div>
                            <div className="row">
                                <PaystackInline pref="xxxxx" amount={this.state.amount} email={user.email} callback={this.onToken} paystackKey={paystackKey}>
                                    <button className="button">Subscribe</button>
                                </PaystackInline>
                            </div>
                       </form>
                    </div>
                </div>
            </div>
        </div>
      )
   }
}

export default Paystack;