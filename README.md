# SCX UI Code Assessment

Welcome to the code assessment for Securonix's UI Team.

This README details what we expect from you on this assessment. If you have any questions, feel free to reach out anytime.

Please, use this repository to fork the project into your account and submit the link to us (by email) with the final solution when done.

We appreciate that you are spending your valuable personal time on this. This task should take two to three hours, however you can spend as long as you wish on it.

Please don't feel you need to have a perfect solution - one that works is enough! We look forward to receiving this back from you within 5 days - if you need more time, please let us know.

When you're finished with the assessment, please send us an email with a link to your solution.

## Application

The purpose of this exercise is to build an application based on the provided mockups and requirements below.
You may choose to use Angular, Vue, React, Svelte or Stencil.
Brownie points if you choose Svelte or Stencil. :)

### Should I include tests?

It's up to you depending on what you consider "done" and the amount of time you have at your disposal.

### Quiz App

The application is a Quiz interface - a UI that shows a set of questions and lets the user select an answer for each one.

The Quiz features three different types of questions. Use the included mockups as references for styling.

**Multiple**  
A multiple-choice question (predefined answer options)

![](./mockups/multiple.png)

**Boolean**  
A "true or false" only answer question

![](./mockups/boolean.png)

**Text**  
An open-ended text question

![](./mockups/text.png)

### Requirements

1. The UI should fetch the questions data from an API (provided in this repository). More details in [API instructions](#api-instructions)

2. The application should display one question per time, randomly selected from the set of questions. It should display at least 5 questions.

3. When the user finishes the Quiz, the UI should display a summary page with the results, including:

- Number of correct answers
- Number of incorrect answers
- Total number of questions answered
- The final score (%)
- A button to restart the Quiz with a different questions

A reference mockup for the summary page is depicted below:

![](./mockups/summary.png)

### API instructions

This repository provides a basic API (running under port 4000) that returns the required data for the application.

#### GET Questions List

`http://localhost:4000/api/questions`

adding changes for test commit 
