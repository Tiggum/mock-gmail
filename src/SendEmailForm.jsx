import React from 'react';

const SendEmailForm = ({onSubmit}) => {
    return (
      <form onSubmit={onSubmit} id='emailForm'>
        <input type="submit" value="Send Email"/>
        <br/>
        <label htmlFor="newEmailToLine">To: </label>
        <input type="email" name="newEmailToLine"/>
        <br/>
        <label htmlFor='newFromLine'>From: </label>
        <input type="email" name="newFromLine"/>
        <br/>
        <label htmlFor='newSubjectLine'>Subject: </label>
        <input type="text" name="newSubjectLine"/>
        <br/>
        <textarea placeholder="Message Body" spellCheck={true} form='emailForm' cols={50} rows={40}/>
      </form>
    );
}

export default SendEmailForm;