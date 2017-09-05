import { h, Component } from 'preact'
import {Filters} from '../Filters/Filters'
import {Sorting} from '../SortBar/SortBar'
import {RepositoriesList} from "../RepositoriesList/RepositoriesList"
import {LoadButton} from "../LoadButton/LoadButton";

const reposPerPage = 10;

export default class Card extends Component {

    constructor(props) {
        super(props);

        this.state = {
            repos: null,
            loading: true,
            filters: {
                hasOpenIssues : false,
                hasTopics : false,
                starredTimes : 0,
                updatedAfter : null,
                repoType : null,
                language : null
            },
            languages: [],
            sorting: {
                by: 'name',
                order: 'asc'
            },
            currentPage: 1
        }
    }

    componentDidMount(){
        fetch(`https://api.github.com/users/${this.props.user}/repos?page=${this.state.currentPage}&per_page=${reposPerPage}`, {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
        })
        .then((response) => {
            const shouldDisplayLoadMore = response.headers.get('Link') && response.headers.get('Link').includes('rel="next"');
            this.setState({shouldDisplayLoadMore});
            return response.json();
        })
        .then((repos) => this.setState({
            repos,
            loading: false,
            languages: (repos.map(r => r.language).filter(l => l).filter((v, i, a) => a.indexOf(v) === i))
        }));
    }

    updateState(filters) {
        this.setState(filters);
    }

    changeSortType(type) {
        this.setState({
            sorting: { ...this.state.sorting, by: type }
        });
    }

    changeSortOrder(order) {
        this.setState({
            sorting: {...this.state.sorting, order: order}
        });
    }

    getSortedRepositories(repos, sorting) {
        let {by, order} = sorting;
        const sorted = [...repos];

        switch (by) {
            case 'name':
                sorted.sort((a, b) => a[by].localeCompare(b[by]));
                break;
            case 'pushed_at':
                sorted.sort((a, b) => new Date(a[by]) - new Date(b[by]));
                break;
            default:
                sorted.sort((a, b) => a[by] - b[by]);
                break;
        }

        order === 'desc' && sorted.reverse();

        return sorted;
    }

    getFilteredRepositories({ hasOpenIssues, hasTopics, starredTimes, updatedAfter, repoType, language }, repos) {
        return repos.filter(repo => {
            return (hasOpenIssues ? !!repo.open_issues_count : true)
                && (hasTopics ? !!repo.topics.length : true)
                && repo.stargazers_count >= starredTimes
                && (updatedAfter
                    ? new Date(repo.pushed_at) > new Date(updatedAfter)
                    : true)
                && (repoType && repoType !== 'All'
                    ? (repoType === 'Fork' ? repo.fork : !repo.fork)
                    : true)
                && (language && language !== 'All'
                    ? repo.language === language
                    : true)
        });
    }

    loadMore() {
        fetch(`https://api.github.com/users/${this.props.user}/repos?page=${this.state.currentPage+1}&per_page=${reposPerPage}`, {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
        })
        .then((response) => {
            const shouldDisplayLoadMore = response.headers.get('Link') && response.headers.get('Link').includes('rel="next"');
            this.setState({shouldDisplayLoadMore});
            return response.json();
        })
        .then((newRepos) => this.setState({
            repos: [...this.state.repos, ...newRepos],
            currentPage: this.state.currentPage + 1,
            languages: [
                ...this.state.languages,
                ...(this.state.repos.map(r => r.language).filter(l => l).filter((v, i, a) => a.indexOf(v) === i))
            ]
        }));
    }

    render({},  {loading, repos, filters, languages, sorting, shouldDisplayLoadMore}) {
        const filteredRepos = repos && this.getFilteredRepositories(filters, repos);
        const sortedRepos = repos && this.getSortedRepositories(filteredRepos, sorting);

        return (
            <div className="repositories">

                {loading
                    ? <div>Please, wait</div> :
                    <div>
                        <Filters
                            languages={languages}
                            filters={filters}
                            update={this.updateState.bind(this)} />

                        <Sorting
                            sortingParams={sorting}
                            onSortType={this.changeSortType.bind(this)}
                            onSortOrder={this.changeSortOrder.bind(this)} />

                        <RepositoriesList repositories={sortedRepos} />
                        <LoadButton
                            shouldDisplayLoadMore={shouldDisplayLoadMore}
                            onLoadMore={this.loadMore.bind(this)} />

                    </div>
                }
            </div>
        )
    }
}