from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Table  
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import  Enum


from app.db.base_class import Base
from .warehouse import *
from .store import *

class User(Base):
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    
    is_owner = Column(Boolean(), default=False)
    is_manager = Column(Boolean(), default=False)
    is_seller = Column(Boolean(), default=False)

    owned_stores =relationship('Store')
    partner_stores = relationship('Store', secondary= 'user__store__partnership', back_populates='business_provider')
    orders = relationship('Order')
    managed_warehouses =relationship('Warehouse', secondary= 'user__warehouse', back_populates='managers')