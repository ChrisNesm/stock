from email.headerregistry import Address
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship


from app.db.base_class import Base

user__warehouse = Table('user__warehouse', Base.metadata,
    Column('user_id', ForeignKey('user.id'), primary_key=True),
    Column('warehouse_id', ForeignKey('warehouse.id'), primary_key=True)
)

user__warehouse__partnership = Table('user__store__partnership', Base.metadata,
    Column('user_id', ForeignKey('user.id'), primary_key=True),
    Column('warehouse_id', ForeignKey('warehouse.id'), primary_key=True)
)

class Warehouse(Base):
    name = Column(String, index=True)
    address = Column(String, index=True)
    
    store_id = Column(Integer, ForeignKey('store.id'))
    managers = relationship('User', secondary= user__warehouse, back_populates='managed_warehouses')
    business_providers = relationship('User', secondary= user__warehouse__partnership, back_populates='partner_warehouses')
    articles = relationship('Article')