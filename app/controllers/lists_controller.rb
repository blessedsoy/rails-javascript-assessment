class ListsController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  # def user_lists
  #   render json: {id: current_user.id, lists: current_user.lists} if current_user
  # end

  def create
    if !current_user
      redirect_to new_user_session_path
    else
      if params[:sample_sales_ids] || current_user.lists
        if params[:sample_sales_ids]
          @lists = List.create_from_sample_sales(current_user.id, params[:sample_sales_ids]) 
        else
          @lists = current_user.lists 
        end
        redirect_to lists_path
      else
        redirect_to sample_sales_path 
      end
    end
  end

  def index
    @lists = current_user.lists if current_user.lists
    # @memo ? @memo : Memo.new
    
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @lists }
    end
  end

  def show
    @list = List.find(params[:id])
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @list }
    end
  end

  def update
    @list = List.find_by(id: params[:id])
    memo_before_update = @list.memo
    @list.update(list_params)

    render json: { id: @list.id, memo_before: memo_before_update, memo_after: @list.memo }
    # redirect_to lists_path
  end

  def destroy
    List.delete(params[:id])
    redirect_to lists_path
  end

  def sort_by_dates
    @lists = current_user.lists.sort do |a, b|
      a.sample_sale.dates <=> b.sample_sale.dates
    end
    render '/lists/index'
  end

  def delete_memo
    @list = List.find_by(id: params[:id])
    memo_before_update = @list.memo
    @list.memo = ''
    @list.save
     render json: { id: @list.id, memo_before: memo_before_update, memo_after: @list.memo }
    # redirect_to lists_path
  end
  
  private

    def list_params
      params.require(:list).permit(:user_id, :memo, sample_sales_ids:[])
    end

end
