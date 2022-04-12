from email.headerregistry import Address
from sqlalchemy import Boolean, Column, Integer, String, Table
from sqlalchemy.orm import relationship


from app.db.base_class import Base
from .warehouse import *
from .user import User

user__store__partnership = Table('user__store__partnership', Base.metadata,
    Column('user_id', ForeignKey('user.id'), primary_key=True),
    Column('store_id', ForeignKey('store.id'), primary_key=True)
)

class Store(Base):
    name = Column(String, index=True)
    address = Column(String)
    
    business_provider = relationship('User', secondary= user__store__partnership, back_populates='partner_stores')
    owner = Column(Integer, ForeignKey('user.id'))
    warehouses = relationship('Warehouse')