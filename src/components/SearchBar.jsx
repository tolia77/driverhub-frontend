const SearchBar = ({ searchTerm, onSearchChange, placeholder="Шукати..." }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="input-group mb-3">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={onSearchChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;