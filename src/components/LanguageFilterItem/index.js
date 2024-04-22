// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterItem, updatedActiveRepository} = props

  const updatingRepository = event => {
    updatedActiveRepository(event.target.value)
  }

  return (
    <div className="filter-container">
      {filterItem.map(item => (
        <li key={item.id}>
          <button
            type="button"
            onClick={updatingRepository}
            key={item.id}
            value={item.id}
            className="filter-button"
          >
            {item.language}
          </button>
        </li>
      ))}
    </div>
  )
}

export default LanguageFilterItem
