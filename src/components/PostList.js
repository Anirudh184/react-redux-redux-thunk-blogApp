import React from 'react';
import { connect } from 'react-redux';
import { fetchPostsAndUsers } from '../actions';
import User from './User';

class PostList extends React.Component {
    componentDidMount = () => {
        this.props.fetchPostsAndUsers();
    }

    renderList = () => {
        return this.props.posts.map(post => (
            <div className = "item" key = { post.id }>
                <i className = "large middle alligned icon user" />
                <div className = "content">
                    <div className = "description">
                        <h2>{post.title}</h2>
                        <p>{ post.body }</p>
                    </div>
                    <User userId = {post.userId}/>
                </div> 
            </div>
        ));
    }

    render() { 
        return(
            <div className = "ui relaxed divided list">
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {posts: state.posts};
}
export default connect(mapStateToProps, {
    fetchPostsAndUsers
})(PostList);