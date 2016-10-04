class SampleSaleSerializer < ActiveModel::Serializer
  attributes :id, :brand, :about, :dates, :hours, :address
  has_many :lists
  has_many :votes
end
