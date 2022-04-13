from typing import List, Optional

from pydantic import BaseModel
from .warehouse import WarehouseRetrieve
from .user import UserRetrieve

# Shared properties
class StoreBase(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    address: Optional[str] = None
    owner: Optional[int] = None
    is_active: Optional[bool] = True
    
# Properties to receive via API on creation
class StoreCreate(StoreBase):
    pass

class StoreInDBBase(StoreBase):
    class Config:
        orm_mode = True

# Properties to return API on read one
class StoresRetrieve(StoreInDBBase):
    warehouses: List[WarehouseRetrieve] 
    business_provider: List[UserRetrieve]
    pass
# Properties to return API on retrieve multiple
class StoresRead(BaseModel):
    results: List[StoresRetrieve]
    total: int

# Properties to receive via API on update
class StoreUpdate(StoreBase):
    pass
