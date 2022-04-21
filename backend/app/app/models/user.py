from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Table  
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import  Enum


from app.db.base_class import Base
from .store import *
from .warehouse import *

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
    partner_warehouses = relationship('Warehouse', secondary= user__warehouse__partnership, back_populates='business_providers')
    orders = relationship('Order')
    managed_warehouses =relationship('Warehouse', secondary= 'user__warehouse', back_populates='managers')