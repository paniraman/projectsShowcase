import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './App.css'

// This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
class App extends Component {
  state = {
    categoryList: categoriesList,
    initialItem: categoriesList[0].id,
    isLoading: false,
    errorMsg: false,
    itemsList: [],
  }

  componentDidMount() {
    this.getInitialList()
  }

  getInitialList = async () => {
    this.setState({
      isLoading: true,
    })
    const {initialItem} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${initialItem}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        isLoading: false,
        itemsList: data.projects,
        errorMsg: false,
      })
    } else {
      this.setState({errorMsg: true})
    }
  }

  selectOption = async event => {
    this.setState({
      isLoading: true,
    })
    const initialItem = event.target.value
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${initialItem}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        isLoading: false,
        itemsList: data.projects,
        errorMsg: false,
      })
    } else {
      this.setState({errorMsg: true})
    }
  }

  renderList = () => {
    const {isLoading, itemsList} = this.state

    return (
      <>
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="list-container">
            {itemsList.map(obj => (
              <li key={obj.id}>
                <div className="item-container">
                  <img
                    src={obj.image_url}
                    alt={obj.name}
                    className="item-img"
                  />
                  <p className="item-para">{obj.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  render() {
    const {categoryList, errorMsg} = this.state

    return (
      <div className="main-container">
        <div className="top-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="log-img"
          />
        </div>
        <div className="middle-container">
          <select onChange={this.selectOption} className="multi-select">
            {categoryList.map(obj => (
              <option key={obj.id} value={obj.id}>
                {obj.displayText}
              </option>
            ))}
          </select>
          {errorMsg ? (
            <div className="fail-container">
              <img
                src=" https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
                alt="failure view"
                className="fail-img"
              />
              <h1 className="fail-heading">Oops! Something Went Wrong</h1>
              <p className="fail-para">
                We cannot seem to find the page you are looking for.
              </p>
              <button
                onClick={this.getInitialList}
                className="fail-btn"
                type="button"
              >
                Retry
              </button>
            </div>
          ) : (
            this.renderList()
          )}
        </div>
      </div>
    )
  }
}

export default App
