const { PrismaClient } = require('@prisma/client');
const { cloudinary } = require('../utilities/cloudinary');
const prisma = new PrismaClient();

// GET endpoint to retrieve all players.
const getAllPlayers = async (req, res) => {
  try {
    const players = await prisma.players.findMany({
      include: {
        comments: true,
        teams: true,
      },
    });
    res.status(200).json(players);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// GET endpoint to retrieve one player.
const getSinglePlayer = async (req, res) => {
  try {
    const id = parseInt(req.params.playerId);

    const singlePlayer = await prisma.players.findMany({
      where: { player_id: id },
      include: {
        comments: true,
        teams: {
          include: { games: true },
        },
      },
    });
    res.status(200).json(singlePlayer);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// POST endpoint create a new player.
const createNewPlayer = async (req, res) => {
  const { body } = req;

  try {
    const imageUrl = body.image;
    const defaultImage = 'futsal/default';
    let uploadedImage = '';

    // if imageUrl true upload image
    if (imageUrl) {
      uploadedImage = await cloudinary.uploader.upload(imageUrl, {
        upload_preset: 'futsal',
      });
    }

    if (!body.name.trim() || !body.position.trim()) {
      res
        .status(400)
        .json({ errorDetails: 'All fields are mandatory for submission' });
    } else {
      const newPlayer = await prisma.players.create({
        data: {
          name: body.name,
          image: !uploadedImage?.public_id
            ? defaultImage
            : uploadedImage?.public_id,
          confirmation: body.confirmation,
          position: body.position,
          weigh: body.weigh,
          height: body.height,
          comments: {},
          teams: {
            connect: { idteams: body.teams.id },
          },
          user: {
            connect: { iduser: 1 },
          },
        },
      });

      res.status(201).json(newPlayer);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// PUT endpoint add new comment to a player.
const addComment = async (req, res) => {
  const { body } = req;
  const id = parseInt(req.params.playerId);
  try {
    if (!body.name || !body.comment) {
      res
        .status(400)
        .json({ errorDetails: 'All fields are mandatory for submission' });
    } else {
      //add just a comment to the player comments array
      const addComment = await prisma.players.update({
        where: { player_id: id },
        data: {
          comments: {
            create: {
              name: body.name,
              comment: body.comment,
            },
          },
        },
        include: {
          comments: true,
        },
      });
      res.status(200).json('comment added successfully');
    }
  } catch (error) {
    console.log(error);
    res.status;
  }
};

// PATCH endpoint to update player general information.
const updatePlayer = async (req, res) => {
  const id = parseInt(req.params.playerId);
  const { body } = req;
  const imageUrl = body.image;

  try {
    let uploadedImage = '';

    if (!imageUrl.includes('futsal')) {
      uploadedImage = await cloudinary.uploader.upload(imageUrl, {
        upload_preset: 'futsal',
      });
    }
    const updatePlayer = await prisma.players.update({
      where: { player_id: id },
      data: {
        name: body.name,
        image: !uploadedImage.public_id ? imageUrl : uploadedImage.public_id,
        position: body.position,
        weigh: body.weigh,
        height: body.height,
      },
    });
    res.status(200).json(updatePlayer);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// PATCH endpoint to update player's goals
const updatePlayerGoals = async (req, res) => {
  try {
    const id = parseInt(req.params.playerId);
    const { body } = req;
    const updatePlayerGoals = await prisma.players.update({
      where: { player_id: id },
      data: {
        goals: { increment: body.goals },
      },
    });
    res.status(200).json(updatePlayerGoals);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// PUT endpoint to increment player likes counter.
const likePlayer = async (req, res) => {
  try {
    const id = parseInt(req.params.playerId);
    const likePlayer = await prisma.players.update({
      where: { player_id: id },
      data: { likes: { increment: 1 } },
    });
    res.status(200).json(likePlayer);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// PUT endpoint to increment comment likes counter.
const addCommentLike = async (req, res) => {
  try {
    const id = parseInt(req.params.playerId);
    const commentId = parseInt(req.params.commentId);
    const addCommentLike = await prisma.players.update({
      where: { player_id: id },
      data: {
        comments: {
          update: {
            where: { idcomments: commentId },
            data: { likes: { increment: 1 } },
          },
        },
      },
    });
    res.status(200).json(addCommentLike);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// DELETE endpoint to delete a single player. This endpoint will have access just the admin user.
const deletePlayer = async (req, res) => {
  try {
    const id = parseInt(req.params.playerId);
    const deletePlayer = await prisma.players.delete({
      where: { player_id: id },
    });

    res.status(200).json('Player Deleted Successfully');
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// DELETE endpoint to delete a comment
const deletePlayerComment = async (req, res) => {
  try {
    const id = parseInt(req.params.playerId);
    const commentId = parseInt(req.params.commentId);
    const deletePlayerComment = await prisma.players.update({
      where: { player_id: id },
      data: {
        comments: {
          deleteMany: { idcomments: commentId },
        },
      },
    });
    res.status(200).json('Comment Deleted Successfully');
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
  getSinglePlayer,
  getAllPlayers,
  createNewPlayer,
  updatePlayer,
  deletePlayer,
  likePlayer,
  addComment,
  addCommentLike,
  deletePlayerComment,
  updatePlayerGoals,
};
