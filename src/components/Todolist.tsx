import { useState, ChangeEvent } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { addTask, editTask, toggleTask, removeTask, selectTasks } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import Container from './Container';
import Header from './Header';
import Heading from './Heading';

const TextInput = styled.input`
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #eee;
    margin-right: 1rem;

    &.edit-input {
        width: 50%;
    }

    @media (max-width: 576px) {
        padding: 0.5rem 0.5rem;
        margin-left: 1%;
    }
`;

const StyledButton = styled.button`
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #eee;
    margin-right: 1rem;

    &.active-filter {
        background-color: #00c853;
        color: #fff;
        cursor: pointer;
    }

    &.inactive-filter {
        background-color: #eee;
        color: #333;
        cursor: pointer;
        margin-right: 1rem;
    }

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }

    @media (max-width: 576px) {
        margin-left: 1%;
    }
`;

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

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const ListItem = styled.li`
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
    &:nth-child(1) {
        padding-top: 5rem;
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

const Filters = styled.div`
    display: flex;
    flex-wrap: nowrap;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin-top: 1.5%;
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
                    onChange={(event) => handleChange(event)}
                    value={value}
                    onKeyDown={(event) => event.key === 'Enter' && add()}
                >
                </TextInput>
                <StyledButton onClick={() => add()}>Add</StyledButton>
                <Filters>
                    <StyledButton
                        className={filter === 'All' ? 'active-filter' : 'inactive-filter'}
                        onClick={() => changeFilter('All')}
                    >
                        All
                    </StyledButton>
                    <StyledButton
                        className={filter === 'Active' ? 'active-filter' : 'inactive-filter'}
                        onClick={() => changeFilter('Active')}
                    >
                        Active
                    </StyledButton>
                    <StyledButton
                        className={filter === 'Completed' ? 'active-filter' : 'inactive-filter'}
                        onClick={() => changeFilter('Completed')}
                    >
                        Completed
                    </StyledButton>
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
                                        <StyledButton
                                            onClick={() => {
                                                setEditedTaskId(task.id);
                                            }}
                                        >
                                            Edit
                                        </StyledButton>
                                        <StyledButton
                                            onClick={() => remove(task.id)}
                                        >
                                            Remove
                                        </StyledButton>
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
