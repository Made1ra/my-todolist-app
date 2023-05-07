import { useState, ChangeEvent } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;

    background-color: white;

    width: 30vw;
    height: 80vh;

    border: 0.5px solid black;

    margin: 20px auto;
    
    font-family: 'Lato';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
`;

const StyledHeader = styled.h1`
    margin-bottom: 2rem;
    text-align: center;
`;

const StyledSmallHeader = styled.h3`
    text-align: center;
`;

const TextInput = styled.input`
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #eee;
    margin-right: 1rem;

    &.edit-input {
        margin-right: 1rem;
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
`;

const CheckboxInput = styled.input`
    margin-right: 1rem;

    &:hover {
        cursor: pointer;
    }
`;

const Message = styled.div`
    margin: 2rem;
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
    position: absolute;
    left: 50%;
    bottom: 20%;
    transform: translateX(-50%);
    text-align: center;
`;

type Task = {
    id: string;
    value: string;
    isCompleted: boolean;
};

type Filter = 'All' | 'Active' | 'Completed';

function Todolist() {
    const [value, setValue] = useState<string>('');
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [filter, setFilter] = useState<Filter>('All');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedValue, setEditedValue] = useState<string>('');
    const [editedTaskId, setEditedTaskId] = useState<string>('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function editCheckbox(id: string, isCompleted: boolean) {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    isCompleted: !isCompleted
                };
            } else {
                return task;
            }
        }));
    }

    function addTask() {
        if (value.trim() !== '') {
            const newTask = {
                id: nanoid(),
                value: value.trim(),
                isCompleted: false
            };
            setTasks(tasks.concat(newTask));
            setValue('');
        }
    }

    function editValue(id: string) {
        if (editedValue.trim() !== '') {
            setTasks(tasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        value: editedValue
                    };
                } else {
                    return task;
                }
            }));
        }

        setIsEditing(false);
        setEditedTaskId('');
        setEditedValue('');
    }

    function removeTask(id: string) {
        setTasks(tasks.filter((task) => task.id !== id));
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
                <StyledHeader>Todolist</StyledHeader>
                <StyledSmallHeader>What do you want to add?</StyledSmallHeader>
                <TextInput
                    type="text"
                    placeholder="Task"
                    onChange={(event) => handleChange(event)}
                    value={value}
                    onKeyDown={(event) => event.key === 'Enter' && addTask()}
                >
                </TextInput>
                <StyledButton onClick={() => addTask()}>Add</StyledButton>
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
                                            hidden={!isEditing}
                                            defaultValue={task.value}
                                            onChange={(event) => setEditedValue(event.target.value)}
                                            onKeyDown={(event) => event.key === 'Enter' && editValue(task.id)}
                                        />
                                        <SubmitButton
                                            className={'edit-submit'}
                                            hidden={!isEditing}
                                            onClick={() => editValue(task.id)}
                                        >
                                            Submit
                                        </SubmitButton>
                                    </>
                                )}
                                <StyledButton
                                    hidden={isEditing}
                                    onClick={() => {
                                        setIsEditing(true);
                                        setEditedTaskId(task.id);
                                    }}
                                >
                                    Edit
                                </StyledButton>
                                <StyledButton
                                    hidden={isEditing}
                                    onClick={() => removeTask(task.id)}
                                >
                                    Remove
                                </StyledButton>
                            </ListItem>
                        ))}
                    </List>
                }
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
            </div>
        </Container >
    );
}

export default Todolist;
