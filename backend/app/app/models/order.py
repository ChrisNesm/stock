from email.headerregistry import Address
from sqlalchemy import Column, Integer, ForeignKey, Boolean, Enum
from sqlalchemy.orm import relationship


from app.db.base_class import Base
from app import schemas

class Order(Base):
    orderer_id = Column(Integer, ForeignKey('user.id'))
    article_id = Column(Integer, ForeignKey('article.id'))
    unit_price = Column(Integer)
    order_quantity = Column(Integer)

    status = Column(Enum(schemas.OrderStatus, validation_strings= True ) ,index=True) 
    
    