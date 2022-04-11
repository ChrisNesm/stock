from email.headerregistry import Address
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship


from app.db.base_class import Base

class Order(Base):
    orderer_id = Column(Integer, ForeignKey('user.id'))
    article_id = Column(Integer, ForeignKey('article.id'))
    unit_price = Column(Integer)
    order_quantity = Column(Integer)
    
    