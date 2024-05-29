require('dotenv').config()
const express = require('express')
const router = express.Router()
const auth = require("../middlewares/authentication")
const { TaskModel } = require("../models/todo")

// GET: return all tasks from database
router.get("/list", auth, async (req, res) => {
    try {
        const tasks = await TaskModel.find({})
        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro ao buscar tarefas", error: error.message})
    }
})

// PUT: edit specific task based on user
router.put("/edit", auth, async (req, res) => {
    const { tasktitle, username, newTasktitle, newTaskdescription, newTaskaction } = req.body;

    if (!tasktitle || !username) {
        return res.status(400).json({ mensagem: "Os campos 'tasktitle' e 'username' são obrigatórios" });
    }

    try {
        const task = await TaskModel.findOne({ tasktitle: tasktitle, username: username });
        if (!task) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada para este usuário" });
        }

        if (newTasktitle !== undefined) {
            task.tasktitle = newTasktitle;
        }
        if (newTaskdescription !== undefined) {
            task.taskdescription = newTaskdescription;
        }
        if (newTaskaction !== undefined) {
            task.taskaction = newTaskaction;
        }

        await task.save();

        return res.status(200).json({ mensagem: "Tarefa atualizada com sucesso", task: task });
    } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
        return res.status(500).json({ error: error.message });
    }
});

// PUT: update task state
router.put("/edit-state", auth, async (req, res) => {
    const { taskaction } = req.body;

    try {
        if (taskaction === undefined) {
            return res.status(400).json({ mensagem: "O campo 'taskaction' é obrigatório" });
        }

        await TaskModel.updateMany({ taskaction: { $ne: taskaction } }, { taskaction: taskaction });

        return res.status(200).json({ mensagem: "Tarefas atualizadas com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar as tarefas:", error);
        return res.status(500).json({ error: error.message });
    }
});

// DELETE: delete a specific task based on user
router.delete("/delete", auth, async (req, res) => {
    const { username, tasktitle} = req.body

    if (!username || !tasktitle) {
        return res.status(400).json({mensagem: "Os campos 'username' e 'tasktitle' são obrigatórios"})
    }

    try {
        const task = await TaskModel.findOne({ tasktitle: tasktitle, username: username })
        if (!task) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada para este usuário" })
        }

        await TaskModel.deleteOne({ tasktitle: tasktitle, username: username })

        return res.status(200).json({ mensagem: "Tarefa excluída com sucesso "})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// POST: create a new task
router.post("/create", auth, async (req, res) => {
    const {tasktitle, taskdescription, taskaction, username} = req.body 
    const task = {
        tasktitle: tasktitle,
        taskdescription: taskdescription,
        taskaction: taskaction
    }

    if(username) {
        task.username = username
    }

    if (!tasktitle || !taskdescription) {
        return res.status(400).json({ mensagem: "Os campos 'tasktitle', 'taskdescription'são obrigatórios" });
    }

    try {
        await TaskModel.create(task)
        return res.status(201).json({
            mensagem: "Tarefa criada com sucesso"
        })
    } catch(error) {
        return res.status(500).json({
            error: error.message
        })
    }
})

// GET: return all tasks that doesn't have owner
router.get("/tasks-without-owner", async (req, res) => {
    try {
        const tasks = await TaskModel.find({ username: { $exists: false } });

        return res.status(200).json({ tasks: tasks });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
// PUT: add a owner to task that don't have owner
router.put("/add-owner", auth, async (req, res) => {
    const { tasktitle, username } = req.body;

    try {
        const task = await TaskModel.findOne({ tasktitle: tasktitle, username: { $exists: false } });
        if (!task) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada ou já possui um proprietário" });
        }

        task.username = username;
        await task.save(); 

        return res.status(200).json({ mensagem: "Proprietário adicionado à tarefa com sucesso", task: task });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router