import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Task } from "./domain/entities/Task";

const app = express();
const ds = AppDataSource;
const taskRep = ds.getRepository(Task);

app.use(express.json());

app.get('/', (req, res) => res.json({ ok: 'ok' }));

app.post('/add', async (req, res) => {
  const { name, description, tags } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Nome e descrição são requeridos" });
  }

  const task = new Task();
  task.name = name;
  task.description = description;
  task.tags = tags;
  await taskRep.save(task);

  return res.status(201).json({ data: [task] });
});

app.get('/list', async (req, res) => {
  const tasks = await taskRep.find();
  return res.json(tasks);
});

app.delete('/delete/:id', async (req, res) => {
  const taskId = req.params.id;

  const task = await taskRep.findOne(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task não encontrada" });
  }

  await taskRep.remove(task);

  return res.status(200).json({ data: [] });
});

app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});
