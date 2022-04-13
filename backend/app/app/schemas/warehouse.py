from typing import List, Optional

from pydantic import BaseModel
from app import schemas

# Shared properties
class WarehouseBase(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    address: Optional[str] = None
    store_id: Optional[int] = None
    is_active: Optional[bool] = True
   
    
    
# Properties to receive via API on creation
class WarehouseCreate(WarehouseBase):
    store_id: int

class WarehouseInDBBase(WarehouseBase):
    class Config:
        orm_mode = True

# Properties to return API on read one
class WarehouseRetrieve(WarehouseInDBBase):
    managers: List[schemas.user.User]

# Properties to return API on retrieve multiple
class WarehouseRead(BaseModel):
    results: List[WarehouseInDBBase]
    total: int

# Properties to receive via API on update
class WarehouseUpdate(WarehouseBase):
    pass
