import { useState, ChangeEvent } from 'react';
import { nanoid } from 'nanoid';
import { addTask, editTask, toggleTask, removeTask, selectTasks } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import Container from './Container';
import Header from './Header';
import Heading from './Heading';
import TextInput from './TextInput';
import Button from './Button';
import List from './List';
import ListItem from './ListItem';
import Filters from './Filters';
import Message from './Message';
import CheckboxInput from './CheckboxInput';
import Text from './Text';

type Filter = 'All' | 'Active' | 'Completed';

function Todolist() {
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();

    const [value, setValue] = useState<string>('');
    const [filter, setFilter] = useState<Filter>('All');
    const [editedValue, setEditedValue] = useState<string>('');
    const [editedTaskId, setEditedTaskId] = useState<string>('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function editCheckbox(id: string, isCompleted: boolean) {
        dispatch(toggleTask({ id, isCompleted }));
    }

    function add() {
        if (value.trim() !== '') {
            const task = {
                id: nanoid(),
                value: value,
                isCompleted: false
            };
            dispatch(addTask(task));
            setValue('');
        }
    }

    function editValue(id: string) {
        if (editedValue.trim() !== '') {
            dispatch(editTask({ id, value: editedValue }));
        }

        setEditedTaskId('');
        setEditedValue('');
    }

    function remove(id: string) {
        dispatch(removeTask(id));
    }

    function changeFilter(filter: Filter) {
        setFilter(filter);
    }

    let updatedTasks = tasks;

    if (filter === 'Active') {
        updatedTasks = tasks.filter((task) => task.isCompleted === false);
    } else if (filter === 'Completed') {
        updatedTasks = tasks.filter((task) => task.isCompleted === true);
    }

    return (
        <Container>
            <div>
                <Header>To-Do List</Header>
                <Heading>What do you want to add?</Heading>
                <TextInput
                    type="text"
                    placeholder="Task"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    value={value}
                    onKeyDown={(e) => e.key === 'Enter' && add()}
                />
                <Button onClick={() => add()}>Add</Button>
                <Filters>
                    <Button
                        className={filter === 'All' ? 'active-filter' : 'inactive-filter'}
                        onClick={() => changeFilter('All')}
                    >
                        All
                    </Button>
                    <Button
                        className={filter === 'Active' ? 'active-filter' : 'inactive-filter'}
                        onClick={() => changeFilter('Active')}
                    >
                        Active
                    </Button>
                    <Button
                        className={filter === 'Completed' ? 'active-filter' : 'inactive-filter'}
                        onClick={() => changeFilter('Completed')}
                    >
                        Completed
                    </Button>
                </Filters>
                {updatedTasks.length === 0 ? <Message>There is no task yet</Message> :
                    <List>
                        {updatedTasks.map((task) => (
                            <ListItem key={task.id}>
                                <CheckboxInput
                                    type="checkbox"
                                    defaultChecked={task.isCompleted}
                                    onClick={() => editCheckbox(task.id, task.isCompleted)}
                                />
                                {
                                    (editedTaskId !== task.id) && (
                                        <Text
                                            className={task.isCompleted ? 'completed' : ''}
                                        >
                                            {task.value}
                                        </Text>
                                    )}
                                {editedTaskId === task.id && (
                                    <>
                                        <TextInput
                                            className={'edit-input'}
                                            type="text"
                                            defaultValue={task.value}
                                            onChange={(e) => setEditedValue(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && editValue(task.id)}
                                        />
                                        <Button
                                            className={'active-filter'}
                                            onClick={() => editValue(task.id)}
                                        >
                                            Submit
                                        </Button>
                                    </>
                                )}
                                {editedTaskId !== task.id && (
                                    <>
                                        <Button
                                            onClick={() => {
                                                setEditedTaskId(task.id);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => remove(task.id)}
                                        >
                                            Remove
                                        </Button>
                                    </>
                                )}
                            </ListItem>
                        ))}
                    </List>
                }
            </div>
        </Container >
    );
}

export default Todolist;
