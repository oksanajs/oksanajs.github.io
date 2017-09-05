import { h, Component } from 'preact'
import {Repository} from '../Repository/Repository'

class RepositoriesList extends Component {

    render({repositories, repos}) {
        return (
            <div className="list">
                {(repositories || repos).map((rep) =>
                    <Repository repository={rep}/>
                )}
            </div>
        )
    }
}

export {RepositoriesList}