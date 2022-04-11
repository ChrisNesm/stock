from email.headerregistry import Address
from sqlalchemy import Boolean, Column, Integer, String, Table
from sqlalchemy.orm import relationship


from app.db.base_class import Base
from .warehouse import *
from .user import User

class Store(Base):
    name = Column(String, index=True)
    address = Column(String, unique=True, index=True, nullable=False)
    
    owner = Column(Integer, ForeignKey('user.id'))
    warehouses = relationship('Warehouse')