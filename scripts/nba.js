const teamsUrl = "https://www.balldontlie.io/api/v1/teams";
let teamId = [];
var teams = fetch(teamsUrl).then(function(response) {
  return response.json();
}).then(function(teams) {
  console.log(teams);
  for (let i = 0; i < 30; i++) {
    teamId.push({
      id: teams.data[i].id,
      name: teams.data[i].name
    });
  }
});
console.log(teamId);
document.getElementById("nbaSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("nbaInput").value;
  if (value === "")
    return;
  console.log(value);
  let id = 0;
  for (let i = 0; i < 30; i++) {
    if (value === teamId[i].name) {
      id = teamId[i].id;
    }
  }
  console.log(id);
  let url = "https://www.balldontlie.io/api/v1/games?seasons[]=2017&team_ids[]=" + id;
  console.log(url);
  var games = fetch(url).then(function(response) {
    return response.json();
  }).then(function(games) {
    console.log(games);
    let result = "";
    for (let i = 0; i < 25; i++) {
      let home_fav = false;
      let home_won = false;
      if (games.data[i].home_team_score > games.data[i].visitor_team_score) {
        home_won = true;
      }
      let home = games.data[i].home_team.name;
      if (home === value) {
        home_fav = true;
      }
      result += "<div class=\"row\"><div class=\"column"
      if (home_won) {
        result += " c-won ";
      }
      result += "\"><p>";
      if (home_fav) {
        result += "<strong>";
      }
      result += games.data[i].home_team.name + ": " + games.data[i].home_team_score;
      if (home_fav) {
        result += "</strong>";
      }
      result += "</p></div><div class=\"column";
      if (!home_won) {
        result += " c-won ";
      }
      result += "\"><p>";
      if (!home_fav) {
        result += "<strong>";
      }
      result += games.data[i].visitor_team.name + ": " + games.data[i].visitor_team_score;
      if (!home_fav) {
        result += "</strong>";
      }
      result += "</p></div></div>\n";
    }
    console.log(result);
    document.getElementById("games").innerHTML = result;
  });
});
