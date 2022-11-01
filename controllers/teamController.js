const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET endpoint to retrieve all the Teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.teams.findMany({
      include: {
        players: true,
      },
    });
    res.status(200).json(teams);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// GET endpoint to retrieve one Team data.
const getOneTeam = async (req, res) => {
  const id = Number(req.params.teamId);
  try {
    const oneTeam = await prisma.teams.findMany({
      where: { idteams: id },
      include: { players: true, games: true },
    });
    res.status(200).json(oneTeam);
  } catch (error) {
    console.log(error), res.status(500);
  }
};

// POST endpoint to create a new team.
const createNewTeam = async (req, res) => {
  const { body } = req;
  try {
    if (!body.name.trim() || !body.description.trim() || !body.image.trim()) {
      res
        .status(400)
        .json({ errorDetails: 'All fields are mandatory for submission' });
    } else {
      const newTeam = await prisma.teams.create({
        data: {
          name: body.name,
          description: body.description,
          image: body.image,
        },
      });
      res.status(200).json(newTeam);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// PATCH endpoint to update team information
const updateTeam = async (req, res) => {
  const id = parseInt(req.params.teamId);
  const { body } = req;

  try {
    if (body.name || body.description || body.image) {
      const updateTeam = await prisma.teams.update({
        where: { idteams: id },
        data: {
          name: body.name,
          description: body.description,
          image: body.image,
        },
      });
      res.status(200).json(updateTeam);
    } else {
      res
        .status(400)
        .json({ errorDetails: 'All fields are mandatory for submission' });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// DELETE endpoint to delete a team
const deleteTeam = async (req, res) => {
  const id = parseInt(req.params.teamId);

  try {
    const deleteTeam = await prisma.teams.delete({
      where: { idteams: id },
    });
    res.status(200).json(deleteTeam);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
  getAllTeams,
  createNewTeam,
  updateTeam,
  deleteTeam,
  getOneTeam,
};
