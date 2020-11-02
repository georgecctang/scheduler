import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  // let interviewer = props.interviewer ? props.interviewer : undefined

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    props.onCancel();
    reset();
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");

    // if (!interviewer) {
    //   setError("Please select an interviewer");
    //   return;
    // }
  
    props.onSave(name, interviewer ? interviewer.id : null);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={e => setName(e.target.value)}
            /*
              This must be a controlled component
            */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer ? interviewer.id : null}
          onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}

