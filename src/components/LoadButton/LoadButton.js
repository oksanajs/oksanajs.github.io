import { h, Component } from 'preact'

class LoadButton extends Component {

    render({shouldDisplayLoadMore}) {
        return (
            <button
                class={"btn " + (!shouldDisplayLoadMore && 'hidden')}
                onClick={(e) => this.props.onLoadMore()}>Load more</button>
        )
    }
}

export {LoadButton}