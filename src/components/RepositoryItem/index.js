// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = itemData

  return (
    <div className="repository-card">
      <img src={avatarUrl} alt="name" className="avatar" />
      <h1>{name}</h1>
      <div className="numbers-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p className="title">{starsCount}</p>
        <p>stars</p>
      </div>
      <div className="numbers-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p className="title">{forksCount}</p>
        <p>forks</p>
      </div>
      <div className="numbers-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p className="title">{issuesCount}</p>
        <p>open issues</p>
      </div>
    </div>
  )
}

export default RepositoryItem
