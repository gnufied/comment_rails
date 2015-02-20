class CommentsController < ApplicationController
  respond_to :html, :json
  def index
    @comments = Comment.all
    respond_with(@comments)
  end
end
