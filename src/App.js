import './App.css';
import React from 'react';
import AllEmail from './AllEmail';
import Email from './Email';
import SendEmailForm from './SendEmailForm'
import SearchBox from './SearchBox'

const emailURL = 'http://localhost:3001';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmails: [],
      emails: [],
      curEmail: {},
      sendEmail: true,
    }
  }

  componentDidMount = async () => {
    this.fetchAllEmails();
  }

  fetchAllEmails = async () => {
    const response = await fetch(`${emailURL}/emails`)
    const emails = await response.json()
    this.setState({allEmails: emails, emails: emails})
  }

  handleEmailClick = (e) => {
    let emailID = e.target.value;
    if (emailID !== 0) {
      let curEmail = this.state.allEmails.filter(email => email.id === emailID)[0];
      this.setState({curEmail: curEmail, sendEmail: false});
    }
  }

  handleSendEmail = (e) => {
    e.preventDefault();
    let [emailTo, emailFrom, emailSubject, emailMsg] = Array.from(e.target.elements).slice(1, 5).map(item => item.value);
    let formdata = {
      sender: emailTo,
      recipient: emailFrom,
      subject: emailSubject,
      message: emailMsg,
    }
    
    fetch(`${emailURL}/send`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formdata)
    }).then(
      this.setState({sendEmail: false})
    ).then(
      this.fetchAllEmails()
    )
  }

  handleEmailSearch = (e) => {
    let searchSubject = e.target.value;
    if (searchSubject.length > 0) {
      let filterEmails = this.state.allEmails.filter(email => email.subject.toLowerCase().includes(searchSubject.toLowerCase()));
      this.setState({emails: filterEmails});
    } else {
      this.setState({emails: this.state.allEmails})
    }
  }

  render () {
    return (
        <table className="App-header">
          <tbody>
            <tr>
              <td>
                <button type="button" onClick={() => this.setState({sendEmail: true})}>Send New Email</button>
                <br/>
                <SearchBox onChange={this.handleEmailSearch}/>
                <AllEmail emails={this.state.emails} onClick={this.handleEmailClick}/>
              </td>
              <td>
                { this.state.sendEmail ? <SendEmailForm onSubmit={this.handleSendEmail}/> : <Email email={this.state.curEmail} /> } 
              </td>
            </tr>
          </tbody>
        </table>
    );
  }
}

export default App;
