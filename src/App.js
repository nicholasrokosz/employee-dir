import Table from 'react-bootstrap/Table';

class App extends React.Component {
  state = {
    employees: [],
  };

  async componentDidMount() {
    const data = await fetch('https://randomuser.me/api/?results=200&nat=us');
    const { results: employees } = await data.json();
    this.setState({ employees });
  }

  render() {
    const { employees } = this.state;
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan='2'>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

export default App;
