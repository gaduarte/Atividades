import { useEffect, useReducer } from 'react'
import { ulid } from 'ulidx'
import { ActionType, TaskReducer } from '../../reducers/task_reducer'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import api from '../../services/api'

export interface Task {
    id: string
    name: string
    description?: string
    done: boolean
    created_at: Date
  }

export function TasksPage() {

    const [{ tasks }, dispatch] = useReducer(TaskReducer, { tasks: [] })
  
    useEffect(() => {
      api.get('/tasks')
        .then(response => response.data)
        .then(data => {
          dispatch({ type: ActionType.LOADED, payload: { tasks: data } })
        })
        .catch((error)=>{
          console.error('Erro ao carregar tarefas: ', error);
        })
    }, [])
  
  
    const handleAddTask = (text: string) => {
  
      const task: Task = {
        id: ulid(),
        name: text,
        description: '...',
        created_at: new Date(),
        done: false
      };
  
      api.post('/tasks', task)
      .then((response)=>{
        dispatch({type: ActionType.ADDED, payload:{task:response.data}})
      })
      .catch((error)=>{
        console.error('Erro ao adicionar task: ', error)
      })
  
    }
  
    const handleRemoveTask = (task: Task) => {
      api.delete(`/tasks/${task.id}`)
      .then(()=>{
        dispatch({ type: ActionType.REMOVED, payload: { id: task.id } })
      })
      .catch((error)=>{
        console.error('Erro ao remover task', error);
      })
    }
  
    const handleSaveTask = (task: Task) => {
      api.put(`/tasks/${task.id}`, task)
      .then(()=>{
        dispatch({ type: ActionType.UPDATED, payload: { task } })
      })
      .catch((error)=>{
        console.error('Erro ao atualizar task', error)
      })
    }
  
    console.log('Page renderizada!')
  
    return (
      <main>
        <TaskForm onAdd={handleAddTask} />
        <TaskList tasks={tasks} onSave={handleSaveTask} onRemove={handleRemoveTask} />
      </main>
    )
  }