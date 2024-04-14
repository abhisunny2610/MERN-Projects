import { gql, useQuery } from '@apollo/client';


const GET_ALL_TODOS = gql`
query GetAllTodos {
  getTodos {
    title
    completed
    id
    user{
      name
    }
  }
}
`


function App() {

  const { data, loading } = useQuery(GET_ALL_TODOS)

  if (loading) return <h1>Loading...</h1>

  return (
    <div className="App">
      <table>
        <tbody>
          {
            data.getTodos.map((todo)=> {
              return (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.user.name}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
