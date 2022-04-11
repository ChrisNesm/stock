from email.headerregistry import Address
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship


from app.db.base_class import Base

class Article(Base):
    name = Column(String, index=True)
    description = Column(Text, unique=True, index=True, nullable=False)
    unit_price = Column(Integer)
    quantity = Column(Integer)

    warehouse_id = Column(Integer, ForeignKey('warehouse.id'))
    