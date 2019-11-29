import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createNewComment, editComment } from '../store/comments/actions';

import './PostForm.css';

const renderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error }
}) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={placeholder} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

class CommentForm extends Component {
  render() {
    const {
      handleSubmit,
      createNewComment,
      editComment,
      submitting,
      reset,
      pristine,
      isEditMode,
      postId,
      hideForm,
      idToEdit
    } = this.props;

    const submitBtn = isEditMode ? 'Save' : 'Publish';
    const commentFormTitle = isEditMode
      ? 'Edit your comment'
      : 'Create a new comment';

    return (
      <div className="c-post-form__container c-post-form__container--comments ">
        <h2 className="c-post-form__title">{commentFormTitle}</h2>
        <form
          className="c-post-form__main"
          onSubmit={handleSubmit(commentData => {
            const { body, author } = commentData;
            commentData = { body, author };

            if (!isEditMode) {
              console.log('create');
              createNewComment(postId, commentData);
            } else {
              console.log('edit');
              editComment(idToEdit, commentData);
            }
            reset();
            hideForm();
          })}
        >
          <div>
            <label htmlFor="body">Content</label>
            <Field
              name="body"
              component="textarea"
              placeholder="Say what your thinking..."
              type="text"
            />
          </div>

          <Field
            name="author"
            type="text"
            component={renderField}
            label="Author's name"
            placeholder="Your name..."
          />

          {isEditMode ? (
            <div>
              <button
                className="c-btn c-btn__submit"
                type="submit"
                onClick={this.props.action}
                disabled={pristine || submitting}
              >
                {submitBtn}
              </button>
              <button
                className="c-btn c-btn__cancel"
                type="button"
                onClick={hideForm}
              >
                Cancel
              </button>
            </div>
          ) : (
              <div>
                <button
                  className="c-btn c-btn__submit"
                  type="submit"
                  disabled={pristine || submitting}
                >
                  {submitBtn}
                </button>

                <button
                  className="c-btn c-btn__cancel"
                  type="button"
                  onClick={hideForm}
                >
                  Cancel
              </button>
              </div>
            )}
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'comment'
})(withRouter(connect(null, { createNewComment, editComment })(CommentForm)));
