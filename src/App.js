import { Component } from 'react';
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class App extends Component {
  state = {
    everyone: [],
    employees: [],
    sorted: false,
  };
  async componentDidMount() {
    const data = await fetch('https://randomuser.me/api/?results=100&nat=us');
    const { results: employees } = await data.json();
    this.setState({ employees, everyone: employees });
  }

  handleSort = () => {
    const { employees, sorted } = this.state;
    let newArr;
    if (!sorted)
      newArr = employees.sort((a, b) => (a.name.last > b.name.last ? 1 : -1));
    else newArr = employees.reverse();
    this.setState({ employees: newArr, sorted: !sorted });
  };

  handleSearch = e => {
    const search = e.target.value;
    const { everyone } = this.state;
    const newArr = everyone.filter(({ name }) => {
      const fullName = name.last + name.first;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
    this.setState({ employees: newArr });
  };

  render() {
    const { employees } = this.state;
    return (
      <>
        <h1 className='text-center my-5'>Employee Directory</h1>
        <div className='container'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text' id='inputGroup-sizing-default'>
                Filter by name
              </span>
            </div>
            <input
              type='text'
              className='form-control'
              onChange={this.handleSearch}
              // value={searchTerm}
            ></input>
          </div>
          {/* <Table striped bordered hover> */}
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>
                  <button className='btn' onClick={this.handleSort}>
                    <FontAwesomeIcon icon={faArrowsAltV} />
                  </button>
                  Name
                </th>
                <th>Picture</th>
                <th>DOB</th>
                <th>Phone #</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(({ name, picture, dob, phone }) => (
                <tr>
                  <td>{`${name.last}, ${name.first}`}</td>
                  <td>
                    <img
                      src={picture.thumbnail}
                      alt='employee pic'
                      className='rounded text-center'
                    ></img>
                  </td>
                  <td>{dob.date.slice(0, 10)}</td>
                  <td>{phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* </Table> */}
        </div>
      </>
    );
  }
}

export default App;
