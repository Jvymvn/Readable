import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PostItem from '../components/PostItem';
import { MdAddBox } from 'react-icons/lib/md';
import SortBy from '../components/SortBy';

import './PostsList.css';

class PostsList extends Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: null
    };
  }

  componentDidMount() {
    this.showCategory(this.props);
  }

  showCategory(props) {
    const { params } = props.match;
    if (params && params.category) {
      this.setState({ selectedCategory: params.category });
    } else {
      this.setState({ selectedCategory: 'all' });
    }
  }

  render() {
    const { posts } = this.props;
    let postsToDisplay;
    let selectedCategory = this.state.selectedCategory;

    if (posts !== undefined) {
      if (selectedCategory !== 'all') {
        postsToDisplay = posts.filter(
          post => post.category === selectedCategory
        );
      } else {
        postsToDisplay = posts;
      }
    }

    return (
      <div className="c-posts-list">
        <SortBy />
        <h2 className="c-posts-list-title">{`${selectedCategory} articles`}</h2>
        {postsToDisplay && postsToDisplay.length > 0 ? (
          <div>
            {postsToDisplay.map(post => (
              <div className="c-posts-list-item" key={post.id}>
                <PostItem postId={post.id} />
              </div>
            ))}
          </div>
        ) : (
            <div>
              <p>Sorry, no posts in this category yet.</p>
              <Link to="/create-post" className="c-add-post--internal">
                <MdAddBox className="c-icon" />
                <span>Add new post</span>
              </Link>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

export default withRouter(connect(mapStateToProps, null)(PostsList));
