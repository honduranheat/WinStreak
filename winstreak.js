const inquirer = require("inquirer");
const mysql = require("mysql");
const goalsArr = [];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "winstreakdb"
});

// const transition = setTimeout(() => {
//   divert();
// }, 2000);

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  home();
});

function home() {
  inquirer
    .prompt([
      {
        name: "stepone",
        message: "Please choose from the following options.",
        type: "list",
        choices: [
          "Check Progress",
          "Create new goal",
          "Update Goal",
          "Delete Goal"
        ]
      }
    ])
    .then(answers => {
      if (answers.stepone === "Create new goal") {
        createGoal();
      } else if (answers.stepone === "Update Goal") {
        getGoalsArr();
      } else if (answers.stepone === "Delete Goal") {
        console.log("Delete");
        deleteGoal();
      } else if (answers.stepone === "Check Progress") {
        checkProgress();
      } else if (answers.stepone === "Exit") {
        exitWinStreak();
      }
    });
}

function checkProgress() {
  connection.query("SELECT * FROM tasklist", function(err, res) {
    if (err) throw err;
    console.log("\n");
    for (let i = 0; i < res.length; i++) {
      console.log(
        `${res[i].id}: ${res[i].Goal}\n   Days Completed: ${
          res[i].DaysCompleted
        }\n`
      );
    }
    console.log("\n");
  });
  setTimeout(() => {
    divert();
  }, 2000);
}

function createGoal() {
  inquirer
    .prompt([
      {
        name: "goal",
        message: "What is your goal?"
      },
      {
        name: "streak",
        message: "How many days have you already completed?"
      }
    ])
    .then(answers => {
      connection.query(
        `INSERT INTO tasklist SET ?`,
        {
          Goal: `${answers.goal}`,
          DaysCompleted: `${answers.streak}`
        },
        function(err, res) {
          if (err) throw err;
          setTimeout(() => {
            checkProgress();
          }, 2000);
        }
      );
    });
}

function getGoalsArr() {
  connection.query("SELECT Goal, DaysCompleted FROM tasklist", function(err, res) {
    if (err) throw err;
    console.log("\n");
    for (let i = 0; i < res.length; i++) {
      // console.log(`${res[i].Goal}`);
      goalsArr.push(res[i]);
      //console.log(res);
    }
    console.log(goalsArr);
    //console.log(res);
    console.log("\n");
    //console.log(goalsArr);
   // updateGoal();
  });
}

function updateGoal() {
  inquirer
    .prompt([
      {
        name: "goal",
        message: "Which goal are you updating?",
        type: "list",
        choices: [goalsArr[]]
      },
      {
        name: "update",
        message: "Enter new streak"
      }
    ])
    .then(answers => {
      //console.log(answers.choose);

      // connection.query(
      //   `UPDATE tasklist SET ? WHERE ?`,
      //   [
      //     {
      //       DaysCompleted: answers.update
      //     },
      //     {
      //       Goal: answers.goal
      //     }
      //   ],
      //   (err, res) => {
      //     if (err) throw err;
      //     setTimeout(() => {
      //       divert();
      //     }, 2000);
      //   }
      // );
    });
}

function divert() {
  inquirer
    .prompt([
      {
        name: "question",
        message: "Return to the home screen?",
        type: "confirm"
      }
    ])
    .then(answers => {
      if (answers) {
        home();
      } else {
        exitWinStreak();
      }
    });
}

function exitWinStreak() {
  console.log("See you later");
  connection.end();
}
