/// ref: https://qiita.com/isihigameKoudai/items/ca84a0322e13a4de794c

import * as React from "react";
import Head from "../components/templates/head";
import Navigation from "../components/templates/navigation";
import Amplify from "@aws-amplify/core";
import PubSub from "@aws-amplify/pubsub";
import API, { graphqlOperation } from "@aws-amplify/api";
import awsmobile from "../../aws-exports";
import { listTodos } from "../graphql/queries";
import { createTodo, deleteTodo } from "../graphql/mutations";
import { onCreateTodo } from "../graphql/subscriptions";

Amplify.configure(awsmobile);
API.configure(awsmobile);
PubSub.configure(awsmobile);

interface TodoType {
  id: number;
  description: string;
  isDone: boolean;
}

interface DataProp {
  data: {
    listTodos?: {
      items: Array<TodoType>;
    };
  };
}

const Todo = (props: DataProp) => {
  const { items: todoItems } = props.data.listTodos;

  const [todo, setTodo] = React.useState("");
  const [list, setList] = React.useState([]);

  const submitTodo = async (list: Array<string>, todo: string) => {
    const id = Math.floor(Math.random() * Math.floor(1000));
    const inputData = {
      input: {
        id,
        description: todo,
        isDone: false,
      },
    };

    try {
      await API.graphql(graphqlOperation(createTodo, inputData));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (id) => {
    const deleteData = {
      input: {
        id,
      },
    };

    try {
      await API.graphql(graphqlOperation(deleteTodo, deleteData));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Head title="todo" />
      <Navigation />
      <h2>Todo with amplify</h2>
      <input
        style={{
          border: "solid 1px #eee",
          padding: 10,
          borderRadius: 4,
          fontSize: 18,
          WebkitAppearance: "none",
          color: "#333",
        }}
        value={todo}
        type="text"
        placeholder="please write todo"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        style={{
          padding: 10,
          background: "#f06292",
          color: "#eee",
          borderRadius: 4,
          fontSize: 18,
          WebkitAppearance: "none",
        }}
        onClick={() => submitTodo(list, todo)}
      >
        add Todo
      </button>
      <ul className="ListContainer">
        {todoItems.map((item) => (
          <li key={item.id} className="ListItem">
            <span className="title">{item.description}</span>
            <span>{item.isDone}</span>
            <input
              type="button"
              value="delete"
              onClick={() => deleteItem(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

Todo.getInitialProps = async (props) => {
  const data = await API.graphql(graphqlOperation(listTodos));
  try {
    const client = API.graphql(graphqlOperation(onCreateTodo));

    if ("subscribe" in client) {
      client.subscribe({
        next: (e) => {
          console.log(e);
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
  return { ...data };
};

export default Todo;
