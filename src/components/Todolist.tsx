import { useState, ChangeEvent } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
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

const SubmitButton = styled.button`
    background-color: #00c853;
    color: #fff;
    cursor: pointer;

    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;

    &.edit-submit {
        margin-right: 1rem;
    }
`;

const CheckboxInput = styled.input`
    margin-right: 1rem;

    &:hover {
        cursor: pointer;
    }
`;

const Message = styled.div`
    margin: 2rem;
    padding-top: 4rem;
    font-size: 1.5rem;
`;

const StyledSpan = styled.span`
    margin: 1.5rem 0.5rem 1.5rem 0;

    font-size: 1.5rem;

    &.completed {
        text-decoration: line-through;
        color: grey;
    }
`;

type Filter = 'All' | 'Active' | 'Completed';

function Todolist() {
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();

    const [value, setValue] = useState<string>('');
    const [filter, setFilter] = useState<Filter>('All');
    const [editedValue, setEditedValue] = useState<string>('');
    const [editedTaskId, setEditedTaskId] = useState<string>('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
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
                <Header>Todolist</Header>
                <Heading>What do you want to add?</Heading>
                <TextInput
                    type="text"
                    placeholder="Task"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}
                    value={value}
                    onKeyDown={(event) => event.key === 'Enter' && add()}
                >
                </TextInput>
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
                                >
                                </CheckboxInput>
                                {
                                    (editedTaskId !== task.id) && (
                                        <StyledSpan
                                            className={task.isCompleted ? 'completed' : ''}
                                        >
                                            {task.value}
                                        </StyledSpan>
                                    )}
                                {editedTaskId === task.id && (
                                    <>
                                        <TextInput
                                            className={'edit-input'}
                                            type="text"
                                            defaultValue={task.value}
                                            onChange={(event) => setEditedValue(event.target.value)}
                                            onKeyDown={(event) => event.key === 'Enter' && editValue(task.id)}
                                        />
                                        <SubmitButton
                                            className={'edit-submit'}
                                            onClick={() => editValue(task.id)}
                                        >
                                            Submit
                                        </SubmitButton>
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
