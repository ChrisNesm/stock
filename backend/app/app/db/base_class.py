from typing import Any

from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy_searchable import make_searchable
from sqlalchemy import Boolean, Column, Integer, Date

@as_declarative()
class Base:
    id = Column(Integer, primary_key=True, index=True)
    is_active = Column(Boolean(), default=True)
    created_at = Column(Date, index=True)
    updated_at = Column(Date, index=True)
    __name__: str
    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

make_searchable(Base.metadata)