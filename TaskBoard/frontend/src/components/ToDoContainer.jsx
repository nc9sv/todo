import React, {useEffect, useState} from 'react';
import {Input, Button, List, Checkbox} from 'antd';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTasks() {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                return;
            }

            try {
                const res = await axios.get(`http://localhost:8000/tasks/${userId}`);
                setTasks(res.data.map(task => ({id: task[0], task_name: task[1], is_completed: task[2]})));
            } catch (error) {
                console.log("Ошибка при загрузке задач", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTasks();
    }, [])

    async function toggleTaskBack(id) {
        try {
            await axios.patch(`http://localhost:8000/tasks/toggle_task/${id}`);
        } catch (error) {
            console.log("Ошибка при обновлении состояния задачи", error);
        }
    }

    async function deleteTaskBack(id) {
        try {
            await axios.delete(`http://localhost:8000/tasks/delete_task/${id}`);
        } catch (error) {
            console.log("Ошибка при удалении задачи", error);
        }
    }

    async function addTaskBack(task) {
        try {
            const res = await axios.post(
                `http://localhost:8000/tasks/create_task`,
                task);
            return res.data
        } catch (error) {
            console.log("Ошибка при добавлении задачи", error);
        }
    }

    const addTask = async () => {
        if (input.trim()) {
            const newTask = {
                user_id: localStorage.getItem("userId"),
                task_name: input,
                is_completed: false
            };
            const createdTask = await addTaskBack(newTask);
            if (createdTask) {
                setTasks([...tasks, createdTask]);
                setInput('');
            }
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? {...task, is_completed: !task.is_completed} : task
        ));
        toggleTaskBack(id)
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        deleteTaskBack(id);
    };

    return (
        <>
            <div className="flex justify-end m-px">
                <Button className="flex justify-end m-4" onClick={() => {
                    localStorage.removeItem("userId");
                    navigate("/")
                }}>Выход</Button>
            </div>

            <div className="max-w-md mx-auto p-4">
                <h1 className="text-white text-2xl font-bold mb-4">Список задач</h1>
                <div className="flex mb-4">
                    <Input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Введите задачу"
                        onPressEnter={addTask}
                    />
                    <Button type="primary" onClick={addTask} className="ml-2">
                        Добавить
                    </Button>
                </div>
                <List
                    bordered
                    dataSource={tasks}
                    loading={isLoading}
                    renderItem={item => (
                        <List.Item
                            className="flex justify-between items-center"
                            actions={[
                                <Button type="link" danger onClick={() => deleteTask(item.id)}>Удалить</Button>
                            ]}
                        >
                            <Checkbox
                                checked={item.is_completed}
                                onChange={() => toggleTask(item.id)}
                            >
              <span className={item.is_completed ? 'line-through text-gray-300' : 'text-white'}>
                {item.task_name}
              </span>
                            </Checkbox>
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}
