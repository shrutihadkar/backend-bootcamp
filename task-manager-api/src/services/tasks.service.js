const prisma = require('../lib/prisma');

const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

const getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: { id }
  });
};

const createTask = async (data) => {
  return await prisma.task.create({
    data
  });
};

const updateTask = async (id, data) => {
  return await prisma.task.update({
    where: { id },
    data
  });
};

const deleteTask = async (id) => {
  return await prisma.task.delete({
    where: { id }
  });
};

const getTopTasks = async () => {
  return await prisma.task.findMany({
    where: { isTopTask: true },
    orderBy: { priority: 'desc' }
  });
};

const getDashboard = async () => {
  const total = await prisma.task.count();
  const todo = await prisma.task.count({ where: { status: 'todo' } });
  const inProgress = await prisma.task.count({ where: { status: 'in-progress' } });
  const done = await prisma.task.count({ where: { status: 'done' } });
  const topTasks = await prisma.task.count({ where: { isTopTask: true } });

  return {
    totalTasks: total,
    tasksByStatus: { todo, inProgress, done },
    topTasksToday: topTasks,
    completionRate: total > 0 ? `${Math.round((done / total) * 100)}%` : '0%'
  };
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTopTasks,
  getDashboard
};