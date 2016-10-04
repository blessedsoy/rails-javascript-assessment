class UserSerializer < ActiveModel::Serializer
  attributes :id
  has_one :vote
end
