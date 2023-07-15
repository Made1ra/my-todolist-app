import { useState, ChangeEvent } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  editTask,
  toggleTask,
  removeTask,
  selectTasks
} from './store';
import Container from './components/Container';
import Header from './components/Header';
import Heading from './components/Heading';
import TextInput from './components/TextInput';
import Button from './components/Button';
import List from './components/List';
import ListItem from './components/ListItem';
import Filters from './components/Filters';
import Message from './components/Message';
import CheckboxInput from './components/CheckboxInput';
import Text from './components/Text';

type Filter = 'All' | 'Active' | 'Completed';

function App() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [editedValue, setEditedValue] = useState('');
  const [editedTaskId, setEditedTaskId] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const editCheckbox = (id: string, isCompleted: boolean) => {
    dispatch(toggleTask({ id, isCompleted }));
  };

  const add = () => {
    if (value.trim() !== '') {
      const task = {
        id: nanoid(),
        value: value,
        isCompleted: false
      };
      dispatch(addTask(task));
      setValue('');
    }
  };

  const editValue = (id: string) => {
    if (editedValue.trim() !== '') {
      dispatch(editTask({ id, value: editedValue }));
    }

    setEditedTaskId('');
    setEditedValue('');
  };

  const remove = (id: string) => {
    dispatch(removeTask(id));
  };

  const changeFilter = (selectedFilter: Filter) => {
    setFilter(selectedFilter);
  };

  const filterTasks = (filter: Filter) => {
    if (filter === 'Active') {
      return tasks.filter((task) => task.isCompleted === false);
    } else if (filter === 'Completed') {
      return tasks.filter((task) => task.isCompleted === true);
    } else {
      return tasks;
    }
  };

  const updatedTasks = filterTasks(filter);

  return (
    <Container>
      <div>
        <Header>To-Do List</Header>
        <Heading>What do you want to add?</Heading>
        <TextInput
          type="text"
          placeholder="Task"
          onChange={(e) => handleChange(e)}
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
        {updatedTasks.length === 0 ? (
          <Message>There is no task yet</Message>
        ) : (
          <List>
            {updatedTasks.map((task) => (
              <ListItem key={task.id}>
                <CheckboxInput
                  type="checkbox"
                  checked={task.isCompleted}
                  onClick={() => editCheckbox(task.id, task.isCompleted)}
                />
                {editedTaskId !== task.id ? (
                  <Text className={task.isCompleted ? 'completed' : ''}>
                    {task.value}
                  </Text>
                ) : (
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
                    <Button onClick={() => setEditedTaskId(task.id)}>
                      Edit
                    </Button>
                    <Button onClick={() => remove(task.id)}>
                      Remove
                    </Button>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </Container>
  );
}

export default App;
