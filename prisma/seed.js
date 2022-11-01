const { comments } = require('./DB Data/comments.js');
const { games } = require('./DB Data/games.js');
const { players } = require('./DB Data/players.js');
const { teams } = require('./DB Data/teams.js');
const { users } = require('./DB Data/users.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  for (let team of teams) {
    await prisma.teams.create({
      data: team,
    });
  }
  for (let user of users) {
    await prisma.user.create({
      data: user,
    });
  }
  for (let player of players) {
    await prisma.players.create({
      data: player,
    });
  }
  for (let game of games) {
    await prisma.games.create({
      data: game,
    });
  }
  for (let comment of comments) {
    await prisma.comments.create({
      data: comment,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
