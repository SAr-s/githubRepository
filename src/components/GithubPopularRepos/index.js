import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeRepository: languageFiltersData[0].language,
    repositoryList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getRepository()
  }

  getFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  getRepository = async () => {
    this.setState({isLoading: true})
    const {activeRepository} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeRepository}`
    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const repositoryData = await response.json()
        const updatedData = repositoryData.popular_repos.map(item => ({
          name: item.name,
          id: item.id,
          issuesCount: item.issues_count,
          forksCount: item.forks_count,
          starsCount: item.stars_count,
          avatarUrl: item.avatar_url,
        }))

        this.setState({isLoading: false, repositoryList: updatedData})
      } else {
        this.setState({isLoading: false})
        this.getFailureView()
      }
    } catch {
      this.setState({isLoading: false})
      this.getFailureView()
    }
  }

  updatedActiveRepository = activeRepository => {
    this.setState({activeRepository}, this.getRepository)
  }

  renderLoader = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRepositoryItem = () => {
    const {repositoryList} = this.state
    return (
      <>
        <ul className="repository-container">
          {repositoryList.map(item => (
            <RepositoryItem key={item.id} itemData={item} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading, activeRepository, repositoryList} = this.state
    const {getFailureView, renderLoader, renderRepositoryItem} = this

    let content
    if (isLoading) {
      content = renderLoader()
    } else if (repositoryList.length > 0) {
      content = renderRepositoryItem()
    } else {
      content = getFailureView()
    }
    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <LanguageFilterItem
          filterItem={languageFiltersData}
          activeRepository={activeRepository}
          updatedActiveRepository={this.updatedActiveRepository}
        />
        {content}
      </div>
    )
  }
}

export default GithubPopularRepos
