from typing import List, Optional

from pydantic import BaseModel


# Shared properties
class ArticleBase(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    description: Optional[str] = None
    unit_price: Optional[int] = None
    quantity: Optional[int] = None
    pending_quantity: Optional[int] = 0
    warehouse_id: Optional[int] = None
    
# Properties to receive via API on creation
class ArticleCreate(ArticleBase):
    pass

class ArticleInDBBase(ArticleBase):
    class Config:
        orm_mode = True

# Properties to return API on read one
class ArticleRetrieve(ArticleInDBBase):
    pass

# Properties to return API on retrieve multiple
class ArticleRead(BaseModel):
    results: List[ArticleInDBBase]
    total: int

# Properties to receive via API on update
class ArticleUpdate(ArticleInDBBase):
    pass
