class ListSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :sample_sale_id, :memo
  has_many :sample_sales
  has_one :user
end
