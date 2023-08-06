import { MagnifyingGlass } from "react-loader-spinner"
import "./Search.css";

function Search(props) {
    return (
        <div className="loading_search" style={props}>
            <MagnifyingGlass
                visible={true}
                height="100"
                width="100"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{margin: "auto"}}
                wrapperclassName="MagnifyingGlass-wrapper"
                glassColor='#9b9b9b79'
                color='#62d2a2' />
        </div>
    )
}

export default Search