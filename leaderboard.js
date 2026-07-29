const leaderboard = document.getElementById("leaderboard");

// Converts an overall score into a grade.
function getGrade(score) {
  if (score >= 9.5) {
    return "A+";
  }

  if (score >= 8.5) {
    return "A";
  }

  if (score >= 7.0) {
    return "B";
  }

  if (score >= 5.0) {
    return "C";
  }

  return "F";
}

// Gets the CSS class for the grade.
function getGradeClass(grade) {
  if (grade === "A+") {
    return "aplus";
  }

  return grade.toLowerCase();
}

// Calculates the average score.
function getOverallScore(stats) {
  const scores = Object.values(stats);

  const total = scores.reduce((sum, score) => {
    return sum + Number(score);
  }, 0);

  return total / scores.length;
}

// Makes sure ratings stay between 0 and 10.
function cleanRating(rating) {
  const number = Number(rating);

  if (Number.isNaN(number)) {
    return 0;
  }

  return Math.max(0, Math.min(10, number));
}

// Gets the Roblox username and display name.
async function getRobloxUser(userId) {
  const response = await fetch(
    `https://users.roblox.com/v1/users/${userId}`
  );

  if (!response.ok) {
    throw new Error("Could not load Roblox user");
  }

  return await response.json();
}

// Gets the Roblox avatar mugshot.
async function getRobloxMugshot(userId) {
  const response = await fetch(
    `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
  );

  if (!response.ok) {
    throw new Error("Could not load Roblox mugshot");
  }

  const data = await response.json();

  if (
    data.data &&
    data.data.length > 0 &&
    data.data[0].imageUrl
  ) {
    return data.data[0].imageUrl;
  }

  return "https://placehold.co/150x150/263246/ffffff?text=?";
}

// Loads all Roblox information for one player.
async function loadPlayerInformation(player) {
  try {
    const [user, mugshot] = await Promise.all([
      getRobloxUser(player.userId),
      getRobloxMugshot(player.userId)
    ]);

    return {
      ...player,
      displayName: user.displayName,
      username: user.name,
      mugshot: mugshot
    };
  } catch (error) {
    console.error(
      `Could not load player ${player.userId}`,
      error
    );

    return {
      ...player,
      displayName: "Unknown Player",
      username: "Unknown Username",
      mugshot: "https://placehold.co/150x150/263246/ffffff?text=?"
    };
  }
}

// Creates the HTML for the four stats.
function createStatsHTML(stats) {
  const statNames = [
    {
      shortName: "CC",
      fullName: "Corner Cutting"
    },
    {
      shortName: "CAM",
      fullName: "Camera Control"
    },
    {
      shortName: "BNC",
      fullName: "Bounce"
    },
    {
      shortName: "CONS",
      fullName: "Consistency"
    }
  ];

  return statNames
    .map((stat) => {
      const rating = cleanRating(stats[stat.shortName]);

      return `
        <div class="stat" title="${stat.fullName}">
          <div class="stat-label">
            ${stat.shortName}
            <span>${rating.toFixed(1)}</span>
          </div>

          <div class="bar">
            <div
              class="fill"
              style="width: ${rating * 10}%"
            ></div>
          </div>
        </div>
      `;
    })
    .join("");
}

// Creates one leaderboard player card.
function createPlayerCard(player, position) {
  const cleanedStats = {
    CC: cleanRating(player.stats.CC),
    CAM: cleanRating(player.stats.CAM),
    BNC: cleanRating(player.stats.BNC),
    CONS: cleanRating(player.stats.CONS)
  };

  const overallScore = getOverallScore(cleanedStats);
  const playerGrade = getGrade(overallScore);
  const gradeClass = getGradeClass(playerGrade);

  return `
    <article class="player-card">

      <div class="rank">
        #${position}
      </div>

      <div class="player-information">
        <img
          class="avatar"
          src="${player.mugshot}"
          alt="${player.displayName} Roblox mugshot"
          onerror="this.src='https://placehold.co/150x150/263246/ffffff?text=?'"
        />

        <div class="player-names">
          <h2>${player.displayName}</h2>

          <p>
            @${player.username}
          </p>

          <small>
            Roblox ID: ${player.userId}
          </small>
        </div>
      </div>

      <div class="stats">
        ${createStatsHTML(cleanedStats)}
      </div>

      <div class="overall">
        <div class="overall-score">
          ${overallScore.toFixed(1)}
        </div>

        <div class="overall-label">
          OVERALL
        </div>

        <div class="player-grade ${gradeClass}">
          ${playerGrade}
        </div>
      </div>

    </article>
  `;
}

// Loads and displays the leaderboard.
async function showLeaderboard() {
  if (!Array.isArray(players)) {
    leaderboard.innerHTML = `
      <p class="error">
        players.js could not be loaded.
      </p>
    `;

    return;
  }

  if (players.length === 0) {
    leaderboard.innerHTML = `
      <p class="error">
        Add players inside players.js.
      </p>
    `;

    return;
  }

  // Only the first four players are used.
  const firstFourPlayers = players.slice(0, 4);

  leaderboard.innerHTML = `
    <div class="loading">
      Loading Roblox players...
    </div>
  `;

  const loadedPlayers = await Promise.all(
    firstFourPlayers.map((player) => {
      return loadPlayerInformation(player);
    })
  );

  // Sorts highest overall score to lowest overall score.
  loadedPlayers.sort((playerA, playerB) => {
    const scoreA = getOverallScore(playerA.stats);
    const scoreB = getOverallScore(playerB.stats);

    return scoreB - scoreA;
  });

  leaderboard.innerHTML = loadedPlayers
    .map((player, index) => {
      return createPlayerCard(player, index + 1);
    })
    .join("");
}

showLeaderboard();
