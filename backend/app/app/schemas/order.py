import enum
from typing import List, Optional

from pydantic import BaseModel

class OrderStatus(enum.Enum):

    PENDING = "PENDING"
    CANCELLED = "CANCELLED"
    DONE = "DONE"
    REJECTED = "REJECTED"

# Shared properties
class OrderBase(BaseModel):
    id: Optional[int] = None
    orderer_id: Optional[int] = None
    article_id: Optional[int] = None
    unit_price: Optional[int] = None
    order_quantity: Optional[int] = None
    status: Optional[OrderStatus] = OrderStatus.PENDING
    
# Properties to receive via API on creation
class OrderCreate(BaseModel):
    article_id: int 
    order_quantity: int


# Properties to receive via API on creation
class OrderSystemCreate(BaseModel):
    orderer_id: int
    article_id: int
    unit_price: int
    order_quantity: int
    status: Optional[OrderStatus] = OrderStatus.PENDING

class OrderInDBBase(OrderBase):
    class Config:
        orm_mode = True

# Properties to return API on read one
class OrderRetrieve(OrderInDBBase):
    pass

# Properties to return API on retrieve multiple
class OrderRead(BaseModel):
    results: List[OrderInDBBase]
    total: int

# Properties to receive via API on update
class OrderUpdate(OrderInDBBase):
    status: OrderStatus 
